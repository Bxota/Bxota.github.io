<template>
  <div>
    <a class="download-button" :class="sizeClass" :href="url" :download="title">
      {{ title }}
    </a>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'Download'
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    }
  },
  computed: {
    sizeClass() {
      return `padding-${this.size}`;
    }
  }
}
</script>