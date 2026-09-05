<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { cotonouPhotos } from './data'
import { t } from './i18n'
import { trapDialogFocus } from './dialog'
import CvIcon from './CvIcon.vue'
const selected = ref(0)
const viewer = ref<HTMLDialogElement | null>(null)
const selectedPhoto = computed(() => cotonouPhotos[selected.value])
const priorFocus = ref<HTMLElement | null>(null)
async function openPhoto(index: number) {
  selected.value = index
  priorFocus.value = document.activeElement as HTMLElement
  await nextTick()
  viewer.value?.showModal()
  document.body.classList.add('detail-open')
}
function closePhoto() { viewer.value?.close(); document.body.classList.remove('detail-open'); priorFocus.value?.focus() }
function changePhoto(offset: number) { selected.value = (selected.value + offset + cotonouPhotos.length) % cotonouPhotos.length }
function handleKey(event: KeyboardEvent) {
  trapDialogFocus(event)
  if (event.key === 'ArrowRight') { event.preventDefault(); changePhoto(1) }
  if (event.key === 'ArrowLeft') { event.preventDefault(); changePhoto(-1) }
}
onBeforeUnmount(() => { if (viewer.value?.open) document.body.classList.remove('detail-open') })
</script>
<template>
  <div class="travel-gallery">
    <div class="gallery-heading"><h4>{{ t('Photos du voyage') }}</h4><span>{{ cotonouPhotos.length }}</span></div>
    <div class="photo-grid"><button v-for="(photo, index) in cotonouPhotos" :key="photo.src" @click="openPhoto(index)" :aria-label="t('Agrandir {caption}', { caption: t(photo.caption) })"><img :src="photo.src" :srcset="photo.srcset" sizes="(max-width: 560px) calc(50vw - 30px), 220px" :width="photo.width" :height="photo.height" :alt="t(photo.caption)" loading="lazy" decoding="async" /><span>{{ t(photo.caption) }}<CvIcon name="up-right" :size="16" /></span></button></div>
    <dialog ref="viewer" class="photo-viewer" aria-labelledby="photo-caption" @cancel.prevent="closePhoto" @keydown="handleKey" @click="event => { if (event.target === viewer) closePhoto() }">
      <div v-if="selectedPhoto" class="photo-viewer-content"><header><span>{{ t('Learning Expedition · Cotonou') }}</span><button class="close-detail" :aria-label="t('Fermer la photo')" @click="closePhoto"><CvIcon name="close" /></button></header><img :src="selectedPhoto.src" :srcset="selectedPhoto.srcset" sizes="95vw" :width="selectedPhoto.width" :height="selectedPhoto.height" :alt="t(selectedPhoto.caption)" decoding="async" /><footer><button :aria-label="t('Photo précédente')" :disabled="cotonouPhotos.length < 2" @click="changePhoto(-1)"><CvIcon name="back" /></button><p id="photo-caption">{{ t(selectedPhoto.caption) }}<span>{{ selected + 1 }} / {{ cotonouPhotos.length }}</span></p><button :aria-label="t('Photo suivante')" :disabled="cotonouPhotos.length < 2" @click="changePhoto(1)"><CvIcon /></button></footer></div>
    </dialog>
  </div>
</template>
