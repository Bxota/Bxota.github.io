<script setup lang="ts">
import CvIcon from './CvIcon.vue'
import { t } from './i18n'
import type { Experience, Project } from './data'
export type DetailBlock = { kind: 'summary' | 'mission' | 'metric' | 'tags' | 'project' | 'role'; text?: string; value?: string; tags?: string[]; project?: Project; role?: Experience }
defineProps<{ block: DetailBlock }>()
defineEmits<{ project: [project: Project]; role: [role: Experience] }>()
</script>
<template>
  <div class="experience-block" :class="`block-${block.kind}`">
    <p v-if="block.kind === 'summary'">{{ t(block.text!) }}</p>
    <p v-else-if="block.kind === 'mission'" class="mission-item"><span aria-hidden="true">—</span><span>{{ t(block.text!) }}</span></p>
    <div v-else-if="block.kind === 'metric'" class="experience-metric"><strong>{{ block.value }}</strong><p>{{ t(block.text!) }}</p></div>
    <template v-else-if="block.tags"><h3>{{ t('Technologies & pratiques') }}</h3><div class="detail-technologies"><span v-for="tag in block.tags" :key="tag">{{ t(tag) }}</span></div></template>
    <button v-else-if="block.project" class="project-entry" @click="$emit('project', block.project)"><span><small>{{ t(block.project.category) }}</small><strong>{{ t(block.project.title) }}</strong></span><CvIcon /></button>
    <template v-else-if="block.role"><h3>{{ t('Parcours chez Orisha') }}</h3><button class="project-entry related-position" @click="$emit('role', block.role)"><span><strong>{{ t(block.role.role) }}</strong><small>{{ t(block.role.period) }}</small></span><CvIcon /></button></template>
  </div>
</template>
