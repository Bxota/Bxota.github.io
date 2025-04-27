<script setup lang="ts">
import TheHeader from '~/components/TheHeader.vue';
</script>

<template>
  <div class="page-container">
    <TheHeader></TheHeader>
    <NuxtLayout>
      <NuxtPage />
      <NuxtRouteAnnouncer />
    </NuxtLayout>
  </div>
</template>