<script setup lang="ts">
import { computed } from 'vue'

type TileTone = 'soft' | 'accent' | 'muted' | 'ghost'
type TileSize = 'standard' | 'wide' | 'tall'
type TileVariant = 'content' | 'media'
type TileLink = { href: string; label: string }

const props = withDefaults(
  defineProps<{
    eyebrow?: string
    description?: string
    icon?: string
    tone?: TileTone
    size?: TileSize
    variant?: TileVariant
    fit?: boolean
    tags?: string[]
    link?: TileLink | null
  }>(),
  {
    eyebrow: '',
    description: '',
    icon: '',
    tone: 'soft',
    size: 'standard',
    variant: 'content',
    fit: false,
    tags: () => [],
    link: null,
  }
)

const showHeader = computed(() => props.variant !== 'media' && (props.eyebrow || props.description))
</script>

<template>
  <article
    class="tile"
    :class="[`tile--${tone}`, `tile--${size}`, `tile--variant-${variant}`, { 'tile--fit': fit }]"
  >
    <header v-if="showHeader" class="tile__header">
      <div class="tile__header-main">
        <p v-if="eyebrow" class="tile__eyebrow">{{ eyebrow }}</p>
        <p v-if="description" class="tile__desc">{{ description }}</p>
      </div>
      <slot name="header-action" />
    </header>

    <div class="tile__body" :class="{ 'tile__body--media': variant === 'media' }">
      <slot />
    </div>

    <ul v-if="variant !== 'media' && tags.length" class="tile__tags">
      <li v-for="tag in tags" :key="tag">
        {{ tag }}
      </li>
    </ul>

    <a
      v-if="variant !== 'media' && link"
      class="tile__link"
      :href="link.href"
      target="_blank"
      rel="noreferrer"
    >
      <span>{{ link.label }}</span>
      <span aria-hidden="true">↗</span>
    </a>
  </article>
</template>

<style scoped>
.tile {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
  padding: 1.25rem;
  border-radius: var(--radius-lg);
  background: linear-gradient(150deg, var(--surface), var(--surface-strong));
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  isolation: isolate;
  overflow: hidden;
  transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
}

.tile:hover {
  transform: translateY(-6px);
  border-color: var(--border-strong);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.45);
}

.tile::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 20%, rgba(140, 230, 255, 0.12), transparent 40%);
  opacity: 0.8;
  pointer-events: none;
  z-index: -1;
}

.tile__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}

.tile__header-main {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.tile__eyebrow {
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 0.82rem;
  color: var(--muted);
}

.tile__icon {
  width: 2.6rem;
  height: 2.6rem;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  font-size: 1.1rem;
}

.tile__desc {
  margin: 0.15rem 0 0;
  color: var(--muted);
  line-height: 1.55;
  font-size: 1rem;
}

.tile__body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--text);
  line-height: 1.5;
}

.tile__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.2rem;
}

.tile__tags li {
  padding: 0.38rem 0.7rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.95rem;
}

.tile__link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: auto;
  padding-top: 0.25rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--text);
}

.tile__link:hover {
  color: var(--accent);
}

.tile--accent {
  background: linear-gradient(155deg, rgba(140, 230, 255, 0.15), rgba(255, 255, 255, 0.02));
  border-color: rgba(140, 230, 255, 0.35);
  box-shadow: 0 26px 70px rgba(8, 19, 35, 0.6), 0 0 0 1px rgba(140, 230, 255, 0.2);
}

.tile--muted {
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.05));
}

.tile--ghost {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.04));
  border-style: dashed;
}

.tile--fit {
  width: max-content !important;
  max-width: 100%;
  display: inline-flex;
  justify-self: flex-start;
  align-self: flex-start;
}

.tile--variant-media {
  padding: 0;
  gap: 0;
  align-self: start;
}

.tile--variant-media::before {
  display: none;
}

.tile__body--media {
  width: 100%;
  height: 100%;
  padding: 0;
  gap: 0;
  display: block;
}

.tile--variant-media :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.tile--variant-media :deep(video),
.tile--variant-media :deep(canvas) {
  width: 100%;
  height: 100%;
  display: block;
}

.tile--wide {
  grid-column: span 2;
}

.tile--tall {
  grid-row: span 2;
}

@media (max-width: 900px) {
  .tile {
    padding: 1.25rem;
  }

  .tile__header {
    align-items: flex-start;
  }

  .tile--wide,
  .tile--tall {
    grid-column: span 1;
    grid-row: span 1;
  }
}
</style>
