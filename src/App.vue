<script setup lang="ts">
import TheNavbar from './components/TheNavbar.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import CertificatesSection from './components/CertificatesSection.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <TheNavbar />
  <main class="pt-16">
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <CertificatesSection />
  </main>
  <TheFooter />
</template>