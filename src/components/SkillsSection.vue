<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { skills } from '../data'

const { t } = useI18n()
</script>

<template>
  <section id="skills" class="py-20 bg-accent/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center text-primary sm:text-4xl mb-12">
        {{ t('skills.title') }}
      </h2>
      
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-4 text-primary-light">{{ t('skills.languages') }}</h3>
          <div class="space-y-2">
            <div v-for="lang in skills.languages" :key="lang" 
                 class="px-3 py-1 bg-primary/10 text-primary rounded-full inline-block mr-2 mb-2">
              {{ lang }}
            </div>
          </div>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-4 text-secondary">{{ t('skills.frameworks') }}</h3>
          <div class="space-y-2">
            <div v-for="framework in skills.frameworks" :key="framework"
                 class="px-3 py-1 bg-secondary/10 text-secondary rounded-full inline-block mr-2 mb-2">
              {{ framework }}
            </div>
          </div>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-4 text-secondary-light">{{ t('skills.tools') }}</h3>
          <div class="space-y-2">
            <div v-for="tool in skills.tools" :key="tool"
                 class="px-3 py-1 bg-secondary-light/10 text-secondary-light rounded-full inline-block mr-2 mb-2">
              {{ tool }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>