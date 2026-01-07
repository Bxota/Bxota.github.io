<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    icon?: string
    title?: string
    copy?: string
    href?: string
    target?: string
    rel?: string
    hoverReveal?: boolean
  }>(),
  {
    icon: '',
    title: '',
    copy: '',
    href: '',
    target: '',
    rel: '',
    hoverReveal: false,
  }
)

const tag = computed(() => (props.href ? 'a' : 'div'))
const relValue = computed(() => {
  if (props.rel) return props.rel
  if (props.target === '_blank') return 'noreferrer'
  return undefined
})
</script>

<template>
  <component
    :is="tag"
    class="masthead__badge"
    :class="{
      'masthead__badge--icon-only': !props.title && !props.copy,
      'masthead__badge--hover-reveal': props.hoverReveal,
    }"
    aria-live="polite"
    :href="props.href || undefined"
    :target="props.target || undefined"
    :rel="relValue || undefined"
  >
    <slot name="icon">
      <span v-if="props.icon" aria-hidden="true">{{ props.icon }}</span>
    </slot>
    <div v-if="props.title || props.copy" class="masthead__texts">
      <p class="masthead__badge-title">{{ props.title }}</p>
      <p class="masthead__badge-copy">{{ props.copy }}</p>
    </div>
    
  </component>
</template>
