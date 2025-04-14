<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { projects } from '../data'

const { t } = useI18n()
</script>

<template>
  <section id="projects" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center text-primary sm:text-4xl mb-12">
        {{ t('projects.title') }}
      </h2>
      
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div v-for="project in projects" :key="project.title" 
             class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
          <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2 text-primary-light">{{ project.title }}</h3>
            <p class="text-gray-600 mb-4">{{ project.description }}</p>
            <div class="mb-4">
              <span v-for="tech in project.technologies" :key="tech"
                    class="inline-block bg-accent/20 rounded-full px-3 py-1 text-sm font-semibold text-secondary mr-2 mb-2">
                {{ tech }}
              </span>
            </div>
            <a :href="project.link" target="_blank" 
               class="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-light transition-colors">
              {{ t('projects.viewProject') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>