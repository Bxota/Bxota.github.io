<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import ExperienceBlock, { type DetailBlock } from './ExperienceBlock.vue'
import CvIcon from './CvIcon.vue'
import { employerGroups, experiences, type Experience, type Project } from './data'
import { locale, t } from './i18n'
const props = defineProps<{ experience: Experience; project: Project | null }>()
const emit = defineEmits<{ project: [project: Project]; role: [role: Experience] }>()
const viewport = ref<HTMLElement | null>(null)
const measure = ref<HTMLElement | null>(null)
const pageHeading = ref<HTMLElement | null>(null)
const section = ref(0)
const page = ref(0)
const pages = ref<DetailBlock[][]>([])
const logo = computed(() => employerGroups.find(group => group.roles.some(role => role.id === props.experience.id))?.logo)
const groups = computed<{ title: string; blocks: DetailBlock[] }[]>(() => {
  if (props.project) return [
    { title: 'Contexte', blocks: [{ kind: 'summary', text: props.project.description }] },
    { title: 'Résultat', blocks: [{ kind: 'summary', text: props.project.result }] },
    { title: 'Technologies', blocks: [{ kind: 'tags', tags: props.project.technologies }] },
  ]
  const role = experiences.find(item => item.company === props.experience.company && item.id !== props.experience.id)
  const roleGroups: { title: string; blocks: DetailBlock[] }[] = [
    { title: 'Vue d’ensemble', blocks: [{ kind: 'summary', text: props.experience.summary }, { kind: 'metric', value: props.experience.metric, text: props.experience.metricLabel }, { kind: 'tags', tags: props.experience.technologies }] },
    { title: 'Missions', blocks: props.experience.missions.map(text => ({ kind: 'mission', text })) },
  ]
  const related = [...props.experience.projects.map(project => ({ kind: 'project' as const, project })), ...(role ? [{ kind: 'role' as const, role }] : [])]
  return related.length ? [...roleGroups, { title: 'Projets', blocks: related }] : roleGroups
})
const blocks = computed(() => groups.value[section.value]?.blocks ?? [])
function paginate() {
  if (!viewport.value || !measure.value) return
  const available = viewport.value.clientHeight
  const result: DetailBlock[][] = []
  let used = 0
  if (available <= 0) return
  const append = (block: DetailBlock, height: number) => {
    if (!result.length || used + height > available) { result.push([]); used = 0 }
    result.at(-1)!.push(block)
    used += height + 24
  }
  // Split only a paragraph that cannot fit by itself. Never mix semantic sections
  // or reduce the reading font to meet a short viewport.
  Array.from(measure.value.children).forEach((element, index) => {
    const block = blocks.value[index]
    const height = element.getBoundingClientRect().height
    if (height <= available || !block.text || !['summary', 'mission'].includes(block.kind)) { append(block, height); return }
    const clone = element.cloneNode(true) as HTMLElement
    measure.value!.appendChild(clone)
    const paragraph = clone.querySelector<HTMLElement>(block.kind === 'mission' ? '.mission-item > span:last-child' : 'p')!
    const words = t(block.text).split(/\s+/)
    while (words.length) {
      let low = 1, high = words.length, fit = 1
      while (low <= high) {
        const middle = Math.floor((low + high) / 2)
        paragraph.textContent = words.slice(0, middle).join(' ')
        if (clone.getBoundingClientRect().height <= available) { fit = middle; low = middle + 1 } else high = middle - 1
      }
      const text = words.splice(0, fit).join(' ')
      paragraph.textContent = text
      append({ ...block, text }, clone.getBoundingClientRect().height)
    }
    clone.remove()
  })
  pages.value = result
  page.value = Math.max(0, Math.min(page.value, result.length - 1))
}
async function selectSection(index: number) {
  section.value = index; page.value = 0
  await nextTick(); paginate()
}
async function go(delta: number) {
  page.value = Math.max(0, Math.min(pages.value.length - 1, page.value + delta))
  await nextTick(); pageHeading.value?.focus({ preventScroll: true })
}
function onTabKey(event: KeyboardEvent, index: number) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? groups.value.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + groups.value.length) % groups.value.length
  void selectSection(next)
  document.getElementById(`experience-tab-${next}`)?.focus()
}
let observer: ResizeObserver | undefined
onMounted(() => {
  observer = new ResizeObserver(paginate)
  if (viewport.value) observer.observe(viewport.value)
  if (measure.value) observer.observe(measure.value)
  paginate()
})
watch(() => [props.experience.id, props.project?.id], async () => { section.value = 0; page.value = 0; await nextTick(); paginate() })
watch([blocks, locale], async () => { await nextTick(); paginate() })
onBeforeUnmount(() => observer?.disconnect())
</script>
<template>
  <div class="experience-pages">
    <header class="experience-page-heading"><img v-if="logo" :src="logo" :alt="t(experience.company)" /><div><p class="experience-company">{{ t(experience.company) }} <span>· {{ t(experience.type) }}</span></p><h2 id="detail-title" ref="pageHeading" tabindex="-1">{{ t(project?.title ?? experience.role) }}</h2><p class="experience-period">{{ t(experience.period) }}<template v-if="experience.location"> · {{ t(experience.location) }}</template></p></div></header>
    <div class="experience-tabs" role="tablist" :aria-label="t('Rubriques de la fiche')"><button v-for="(group, index) in groups" :id="`experience-tab-${index}`" :key="group.title" role="tab" :aria-selected="section === index" :tabindex="section === index ? 0 : -1" aria-controls="experience-panel" @click="selectSection(index)" @keydown="onTabKey($event, index)">{{ t(group.title) }}</button></div>
    <div id="experience-panel" class="experience-panel" role="tabpanel" :aria-labelledby="`experience-tab-${section}`" tabindex="0">
      <h3 class="experience-section-title">{{ t(groups[section].title) }}</h3>
      <div ref="viewport" class="experience-page-viewport">
        <div class="experience-page-content" :key="`${experience.id}-${project?.id}-${section}-${page}`"><ExperienceBlock v-for="(block, index) in pages[page]" :key="index" :block="block" @project="emit('project', $event)" @role="emit('role', $event)" /></div>
        <div ref="measure" class="experience-measure" aria-hidden="true" inert><ExperienceBlock v-for="(block, index) in blocks" :key="index" :block="block" /></div>
      </div>
    </div>
    <footer class="experience-pagination"><span class="experience-section-index">{{ String(section + 1).padStart(2, '0') }} / {{ String(groups.length).padStart(2, '0') }}</span><nav v-if="pages.length > 1" :aria-label="t('Pages de la rubrique')"><button :aria-label="t('Page précédente')" :disabled="page === 0" @click="go(-1)"><CvIcon name="back" /></button><span role="status">{{ page + 1 }} / {{ pages.length }}</span><button :aria-label="t('Page suivante')" :disabled="page === pages.length - 1" @click="go(1)"><CvIcon /></button></nav><button v-else-if="section < groups.length - 1" class="next-section" @click="selectSection(section + 1)">{{ t(groups[section + 1].title) }}<CvIcon :size="18" /></button><span class="sr-only" aria-live="polite">{{ t(groups[section].title) }} · {{ t('Page {page} sur {total}', { page: page + 1, total: pages.length }) }}</span></footer>
  </div>
</template>
