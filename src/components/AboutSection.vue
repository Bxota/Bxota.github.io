<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section id="about" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div class="flex flex-col lg:flex-row items-center gap-20">
        <div class="photo">
          <a>
            <img src="/img/photo.webp" alt="photo" />
          </a>
        </div>
        <div class="text lg:text-center text-center"> 
          <h2 class="text-3xl font-bold text-primary sm:text-4xl">{{ t('about.title') }}</h2>
          <p class="mt-4 max-w-2xl text-xl text-gray-600">
            {{ t('about.description') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
.photo {
  a:focus {
    outline: none;
  }
  flex-shrink: 0;
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    display: inline-block;
  }
}
img {
  max-width: 100%;
}
</style>