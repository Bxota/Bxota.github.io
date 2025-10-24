<script setup lang="ts">
import { workProjects } from '~/data/work-projects';

const projects = workProjects;
</script>

<template>
  <main class="work-content">
    <h1 class="page-title">Work</h1>

    <div class="projects-container">
      <article
        v-for="project in projects"
        :key="project.slug"
        class="project-card"
      >
        <NuxtLink
          :to="`/work/${project.slug}`"
          class="project-card__link"
          :aria-label="`View details for project ${project.title}`"
        >
          <div
            v-if="project.coverMode === 'group' && project.coverGroup"
            class="project-image project-image-group"
          >
            <img
              v-for="logo in project.coverGroup"
              :key="logo.src"
              class="project-image-group__logo"
              :src="logo.src"
              :alt="logo.alt"
            >
          </div>
          <img
            v-else
            class="project-image"
            :class="{
              'project-image--contain': project.coverMode === 'contain',
            }"
            :src="project.cover"
            :alt="project.coverAlt"
          >
          <div class="project-info">
            <h2 class="project-title">{{ project.title }}</h2>
            <p class="project-description">
              {{ project.shortDescription }}
            </p>
            <div class="project-tags">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>
  </main>
</template>
