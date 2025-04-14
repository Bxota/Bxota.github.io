<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section id="about" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-3xl font-bold text-primary sm:text-4xl">{{ t('about.title') }}</h2>
        <p class="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
          {{ t('about.description') }}
        </p>
      </div>
    </div>
  </section>
</template>