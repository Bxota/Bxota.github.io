<script>
import { NuxtLink } from "#components";
import RiGithubLine from "vue-remix-icons/icons/ri-github-line.vue"
import RiLinkedinLine from "vue-remix-icons/icons/ri-linkedin-line.vue"
import RiMailLine from "vue-remix-icons/icons/ri-mail-line.vue"
import RiMenuLine from "vue-remix-icons/icons/ri-menu-line.vue"
import RiCloseLine from "vue-remix-icons/icons/ri-close-line.vue"

export default {
  components: {
    RiGithubLine,
    RiLinkedinLine,
    RiMailLine,
    RiMenuLine,
    RiCloseLine
  },
  data() {
    return {
      menuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      // Empêcher le défilement du body quand le menu est ouvert
      if (this.menuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    closeMenu() {
      this.menuOpen = false;
      document.body.style.overflow = '';
    },
    handleClickOutside(event) {
      // Si le clic est en dehors des liens et du menu burger
      const mobileNav = this.$el.querySelector('.mobile-nav');
      const menuToggle = this.$el.querySelector('.menu-toggle');

      if (this.menuOpen &&
        !mobileNav.contains(event.target) &&
        !menuToggle.contains(event.target)) {
        this.closeMenu();
      }
    }
  },
  mounted() {
    // Ajouter un écouteur d'événement pour les clics sur la page
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    // Supprimer l'écouteur d'événement lors de la destruction du composant
    document.removeEventListener('click', this.handleClickOutside);
  }
}
</script>

<template>
  <header class="site-header">
    <div class="header-content">
      <div class="header-top">
        <NuxtLink to="/" class="name">
          <div class="font-migra-bold">Thomas</div>
          <div class="font-migra-light">Leterme</div>
        </NuxtLink>
      </div>

      <!-- Navigation pour desktop -->
      <div class="desktop-nav desktop-only">
        <NuxtLink to="/" class="header-nav-link" :class="{ active: $route.path === '/' }">
          Home
        </NuxtLink>
        <NuxtLink to="/work" class="header-nav-link" :class="{ active: $route.path === '/work' }">
          Work
        </NuxtLink>
        <NuxtLink to="/certificates" class="header-nav-link" :class="{ active: $route.path === '/certificates' }">
          Certificates
        </NuxtLink>
        <NuxtLink to="/about" class="header-nav-link" :class="{ active: $route.path === '/about' }">
          About
        </NuxtLink>
      </div>

      <!-- Icône du menu burger visible uniquement sur mobile -->
      <button @click.stop="toggleMenu" class="menu-toggle mobile-only" aria-label="Toggle menu">
        <RiMenuLine v-if="!menuOpen" class="menu-icon" />
        <RiCloseLine v-else class="menu-icon" />
      </button>

      <!-- Social links pour desktop -->
      <div class="social-links desktop-only">
        <NuxtLink to="https://github.com/Bxota" class="social-link" target="_blank">
          <RiGithubLine class="social-icon"></RiGithubLine>
        </NuxtLink>
        <NuxtLink to="https://www.linkedin.com/in/thomas-leterme/" class="social-link" target="_blank">
          <RiLinkedinLine class="social-icon"></RiLinkedinLine>
        </NuxtLink>
        <NuxtLink to="mailto:thomas.pro.leterme@gmail.com" class="social-link" target="_blank">
          <RiMailLine class="social-icon"></RiMailLine>
        </NuxtLink>
      </div>
    </div>

    <!-- Menu mobile qui s'affiche lors du clic sur le burger -->
    <div class="mobile-menu" :class="{ 'active': menuOpen }">
      <div class="mobile-menu-content">
        <nav class="mobile-nav">
          <NuxtLink to="/" class="mobile-nav-link" @click="closeMenu">Home</NuxtLink>
          <NuxtLink to="/work" class="mobile-nav-link" @click="closeMenu">Work</NuxtLink>
          <NuxtLink to="/certificates" class="mobile-nav-link" @click="closeMenu">Certificates</NuxtLink>
          <NuxtLink to="/about" class="mobile-nav-link" @click="closeMenu">About</NuxtLink>
        </nav>

        <div class="mobile-social-links">
          <NuxtLink to="https://github.com/Bxota" class="social-link" target="_blank">
            <RiGithubLine class="social-icon"></RiGithubLine>
          </NuxtLink>
          <NuxtLink to="https://www.linkedin.com/in/thomas-leterme/" class="social-link" target="_blank">
            <RiLinkedinLine class="social-icon"></RiLinkedinLine>
          </NuxtLink>
          <NuxtLink to="mailto:thomas.pro.leterme@gmail.com" class="social-link" target="_blank">
            <RiMailLine class="social-icon"></RiMailLine>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>