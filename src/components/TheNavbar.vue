<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const isMenuOpen = ref(false)

const toggleLocale = () => {
  locale.value = locale.value === 'fr' ? 'en' : 'fr'
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <nav class="fixed w-full z-50 px-4 py-4">
    <div class="max-w-7xl mx-auto">
      <div class="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl px-4 py-2">
        <div class="flex items-center justify-between">
          <a href="#" class="text-xl font-balgin text-primary">Portfolio</a>
          
          <!-- Menu burger pour mobile -->
          <button @click="toggleMenu" class="sm:hidden p-2 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Menu desktop -->
          <div class="hidden sm:flex sm:items-center sm:space-x-8">
            <a href="#about" class="text-gray-700 hover:text-primary">{{ t('nav.about') }}</a>
            <a href="#skills" class="text-gray-700 hover:text-primary">{{ t('nav.skills') }}</a>
            <a href="#projects" class="text-gray-700 hover:text-primary">{{ t('nav.projects') }}</a>
            <a href="#certificates" class="text-gray-700 hover:text-primary">{{ t('nav.certificates') }}</a>
            <button @click="toggleLocale" class="px-3 py-1 rounded-md bg-primary/10 hover:bg-primary/20 text-primary">
              {{ locale === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR' }}
            </button>
          </div>
        </div>

        <!-- Menu mobile -->
        <div v-show="isMenuOpen" class="sm:hidden mt-4">
          <div class="flex flex-col space-y-4 pb-4">
            <a @click="closeMenu" href="#about" class="text-gray-700 hover:text-primary">{{ t('nav.about') }}</a>
            <a @click="closeMenu" href="#skills" class="text-gray-700 hover:text-primary">{{ t('nav.skills') }}</a>
            <a @click="closeMenu" href="#projects" class="text-gray-700 hover:text-primary">{{ t('nav.projects') }}</a>
            <a @click="closeMenu" href="#certificates" class="text-gray-700 hover:text-primary">{{ t('nav.certificates') }}</a>
            <button @click="toggleLocale" class="px-3 py-1 rounded-md bg-primary/10 hover:bg-primary/20 text-primary w-fit">
              {{ locale === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>