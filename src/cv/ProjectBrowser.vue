<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import CvIcon from './CvIcon.vue'
import { independentProjects, type IndependentProject } from './data'
import { githubUpdatedAt } from './github-dates'
import { formatDate, t } from './i18n'
import { english } from './translations.en'
defineEmits<{ open: [project: IndependentProject] }>()
const query = ref('')
const page = ref(1)
const pageSize = 4
const resultsHeading = ref<HTMLElement | null>(null)
const updatedAt = (project: IndependentProject) => project.id === 'cv-web' ? undefined : githubUpdatedAt[project.url?.split('/').at(-1) ?? '']
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
const results = computed(() => {
  const terms = normalize(query.value).trim().split(/\s+/).filter(Boolean)
  return independentProjects.filter(project => {
    const fields = [project.title, project.description, project.school ?? '', ...project.technologies]
    const text = normalize(fields.flatMap(value => [value, english[value] ?? value]).join(' '))
    return terms.every(term => text.includes(term))
  }).sort((a, b) => (updatedAt(b) ?? '').localeCompare(updatedAt(a) ?? '') || a.id.localeCompare(b.id))
})
const totalPages = computed(() => Math.max(1, Math.ceil(results.value.length / pageSize)))
const visible = computed(() => results.value.slice((page.value - 1) * pageSize, page.value * pageSize))
watch(query, () => { page.value = 1 })
watch(totalPages, total => { page.value = Math.min(page.value, total) })
async function go(target: number) {
  page.value = Math.max(1, Math.min(target, totalPages.value))
  await nextTick()
  resultsHeading.value?.focus({ preventScroll: true })
  resultsHeading.value?.scrollIntoView({ block: 'nearest', behavior: 'instant' })
}
const schoolLogo = (project: IndependentProject) => project.school === 'Epitech' ? '/img/epitech.png' : project.school === 'École 89' ? '/img/ecole89.webp' : undefined
</script>
<template>
  <div class="project-browser">
    <label class="project-search"><span class="sr-only">{{ t('Rechercher un projet') }}</span><span class="search-field"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg><input v-model="query" type="search" :placeholder="t('Rechercher un projet')" /></span></label>
    <p ref="resultsHeading" tabindex="-1" class="project-results-count" role="status"><template v-if="query">{{ t('{count} projet(s)', { count: results.length }) }} · </template>{{ t('Page {page} sur {total}', { page, total: totalPages }) }}</p>
    <div v-if="visible.length" class="independent-list">
      <button v-for="project in visible" :key="project.id" class="independent-project" :data-project="project.id" @click="$emit('open', project)"><span><span class="project-title-row"><img v-if="schoolLogo(project)" :class="{ 'ecole89-logo': project.school === 'École 89' }" :src="schoolLogo(project)" :alt="project.school" loading="lazy" /><strong>{{ t(project.title) }}</strong></span><span>{{ t(project.description) }}</span><small>{{ project.technologies.join(' · ') }}</small><time v-if="updatedAt(project)" :datetime="updatedAt(project)">{{ t('Mis à jour le {date}', { date: formatDate(updatedAt(project)!) }) }}</time><span v-else class="project-updated">{{ t('Prototype local') }}</span></span><CvIcon /></button>
    </div>
    <div v-else class="project-empty"><p>{{ t('Aucun projet ne correspond à la recherche.') }}</p><button class="text-link" @click="query = ''">{{ t('Effacer la recherche') }}</button></div>
    <nav v-if="totalPages > 1" class="project-pagination" :aria-label="t('Pagination des projets')"><button :aria-label="t('Page précédente')" :disabled="page === 1" @click="go(page - 1)"><CvIcon name="back" /></button><button v-for="number in totalPages" :key="number" :aria-label="t('Page {page} sur {total}', { page: number, total: totalPages })" :aria-current="page === number ? 'page' : undefined" @click="go(number)">{{ number }}</button><button :aria-label="t('Page suivante')" :disabled="page === totalPages" @click="go(page + 1)"><CvIcon /></button></nav>
  </div>
</template>
