<script setup lang="ts">
import { computed } from 'vue';
import type { PortfolioRepository } from '~/types/portfolio';

const props = withDefaults(defineProps<{
  repo: PortfolioRepository;
  imagePath?: string;
  imageAlt?: string;
}>(), {
  imagePath: '/img/github.png',
  imageAlt: 'Logo GitHub'
});

const formattedPushDate = computed(() => {
  const date = new Date(props.repo.pushed_at);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(date);
});

const hasLink = computed(() => Boolean(props.repo.html_url && props.repo.html_url.trim().length > 0));

const linkAttributes = computed(() => (hasLink.value
  ? {
    href: props.repo.html_url,
    target: '_blank',
    rel: 'noopener noreferrer',
    'aria-label': `Ouvrir le dépôt ${props.repo.name}`
  }
  : {
    role: 'group',
    'aria-label': `Informations sur ${props.repo.name}`
  }));
</script>

<template>
  <article class="project-card project-card--github">
    <component :is="hasLink ? 'a' : 'div'" v-bind="linkAttributes" :class="[
      'project-card__link',
      hasLink ? 'project-card__link--external' : 'project-card__link--static'
    ]">
      <img class="project-image project-image--contain" :src="props.imagePath" :alt="props.imageAlt">
      <div class="project-info">
        <h2 class="project-title">{{ props.repo.name }}</h2>
        <p class="project-description">
          {{ props.repo.description || 'Pas de description fournie.' }}
        </p>
        <div v-if="props.repo.topics?.length" class="project-tags">
          <span v-for="topic in props.repo.topics" :key="topic" class="tag">
            {{ topic }}
          </span>
        </div>
        <p v-if="formattedPushDate" class="project-meta">
          Dernier push le {{ formattedPushDate }}
        </p>
      </div>
    </component>
  </article>
</template>
