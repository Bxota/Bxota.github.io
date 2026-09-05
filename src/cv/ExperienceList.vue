<script setup lang="ts">
import { t } from './i18n'
import CvIcon from './CvIcon.vue'
import type { EmployerGroup, Experience } from './data'
defineProps<{ groups: EmployerGroup[]; matchedIds?: string[] }>()
defineEmits<{ open: [experience: Experience] }>()
</script>

<template>
  <div class="experience-list">
    <article v-for="group in groups" :key="group.id" class="employer" :data-employer="group.id">
      <header class="employer-header">
        <div class="employer-logo"><img v-if="group.logo" :src="group.logo" :alt="`Logo ${group.name}`" loading="lazy" /><span v-else aria-hidden="true">{{ group.initials }}</span></div>
        <div class="employer-heading"><h3>{{ t(group.name) }}</h3><p><span v-if="group.location" class="employer-location">{{ t(group.location) }}</span><span class="employer-period">{{ t(group.period) }}</span></p></div>
        <span v-if="group.roles.length > 1" class="progression-label">{{ t('{count} postes', { count: group.roles.length }) }}</span>
      </header>
      <div class="role-timeline" :class="{ 'has-progression': group.roles.length > 1 }">
        <button v-for="(role, index) in group.roles" :key="role.id" class="experience-row" :class="{ 'unmatched-role': matchedIds && !matchedIds.includes(role.id) }" @click="$emit('open', role)" :aria-label="t('Voir {role} chez {company}', { role: t(role.role), company: t(role.company) })">
          <span class="timeline-point" aria-hidden="true"></span>
          <span class="role-main"><span v-if="group.roles.length > 1 && index === 0" class="promotion-label">{{ t("Évolution interne") }}</span><strong>{{ t(role.role) }}</strong><span class="role-period">{{ t(role.period) }}<template v-if="role.type === 'Alternance'"> {{ t("· Alternance") }}</template></span><span class="role-summary">{{ t(role.summary) }}</span><span class="role-tags"><span v-for="tech in role.technologies.slice(0, 3)" :key="tech">{{ t(tech) }}</span></span></span>
          <span class="role-open"><CvIcon /><span v-if="role.projects.length">{{ t(role.projects.length > 1 ? '{count} projets' : '{count} projet', { count: role.projects.length }) }}</span></span>
        </button>
      </div>
    </article>
  </div>
</template>
