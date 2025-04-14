<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { certificates } from '../data'

const { t } = useI18n()
</script>

<template>
  <section id="certificates" class="py-20 bg-accent/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center text-primary sm:text-4xl mb-12">
        {{ t('certificates.title') }}
      </h2>
      
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="cert in certificates" :key="cert.title"
             class="bg-white rounded-lg shadow-md overflow-hidden">
          <img :src="cert.image" :alt="cert.title" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-lg font-semibold mb-2 text-primary-light">{{ cert.title }}</h3>
            <p class="text-secondary">{{ cert.issuer }}</p>
            <p class="text-gray-500 text-sm">{{ cert.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>