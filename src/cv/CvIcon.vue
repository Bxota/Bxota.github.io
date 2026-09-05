<script setup lang="ts">
withDefaults(defineProps<{ name?: 'arrow' | 'up-right' | 'download' | 'close' | 'plus' | 'back' | 'monitor' | 'phone' | 'mail' | 'linkedin' | 'github' | 'menu'; size?: number }>(), { name: 'arrow', size: 20 })
const paths = {
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  'up-right': 'M6 18 18 6M6 6h12v12',
  download: 'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
  close: 'm6 6 12 12M6 18 18 6',
  plus: 'M12 5v14M5 12h14',
  back: 'M20 12H4m6-6-6 6 6 6',
  monitor: 'M3 4h18v13H3zM8 21h8m-4-4v4',
  phone: 'M7 2h10v20H7zM11 18h2',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  linkedin: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2zM6 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z',
  github: 'M9 20c-4 1-4-2-6-2m6 4v-4c-4-.5-6-2-6-6 0-1.5.5-2.5 1.5-3.5C4 7 4 5.5 4.5 4c2 0 3.5 1 4 1.5a12 12 0 0 1 7 0C16 5 17.5 4 19.5 4c.5 1.5.5 3 0 4.5C20.5 9.5 21 10.5 21 12c0 4-2 5.5-6 6v4',
  menu: 'M4 6h16M4 12h16M4 18h16',
}
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="paths[name]" /></svg>
</template>
