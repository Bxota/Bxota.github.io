<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as THREE from 'three'
import { fetchProfileOverview, type ProfileOverview } from './services/githubApi'

type SocialIcon = 'linkedin' | 'github' | 'email' | 'phone'
type SocialLink = { label: string; href: string; icon: SocialIcon; copy?: string; target?: string }
type Certification = { label: string; value: string }
type TechLogo = { name: string; logo: string }
type TechMarqueeTrack = { items: TechLogo[]; duration: number }
type Employer = { name: string; url: string; logo: string; logoAlt: string; dotClass: string }

const phoneNumber = '+336953122449'
// Paris time: this must never be visible before 1 September 2026.
const ovhCloudStartDate = new Date('2026-09-01T00:00:00+02:00')
const currentEmployer: Employer =
  new Date() >= ovhCloudStartDate
    ? {
        name: 'Alternant chez OVHCloud',
        url: 'https://www.ovhcloud.com/fr/',
        logo: '/ovhcloud.png',
        logoAlt: 'Logo OVHcloud',
        dotClass: 'brand__dot--ovhcloud',
      }
    : {
        name: 'Alternant chez Yunohit',
        url: 'https://yunohit.com',
        logo: '/yunohit.png',
        logoAlt: 'Logo Yunohit',
        dotClass: 'brand__dot--yunohit',
      }
const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thomas-leterme', icon: 'linkedin', target: '_blank' },
  { label: 'GitHub', href: 'https://github.com/bxota', icon: 'github', target: '_blank' },
  { label: 'Email', href: 'mailto:thomas.pro.leterme@gmail.com', icon: 'email', target: '_blank' },
  { label: 'Téléphone', href: `tel:${phoneNumber}`, icon: 'phone', copy: phoneNumber },
]

const iconPaths: Record<SocialIcon, string> = {
  linkedin:
    'M16 16h-2.8v-4.8c0-1.15-.43-1.93-1.5-1.93-.82 0-1.31.55-1.53 1.08-.08.19-.1.45-.1.71V16H7.3s.04-8.13 0-9h2.77v1.42c.37-.58 1.03-1.41 2.52-1.41 1.84 0 3.41 1.2 3.41 3.78zM4.23 5.17c-.9 0-1.48-.59-1.48-1.33 0-.76.6-1.33 1.52-1.33s1.48.57 1.5 1.33c0 .74-.58 1.33-1.52 1.33zM2.8 16h2.87V7H2.8z',
  github:
    'M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38l-.01-1.35c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27 7.6 7.6 0 0 1 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.45.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8',
  email:
    'M4.5 5h15a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11A1.5 1.5 0 0 1 4.5 5Zm0 2v.18l7.5 4.69 7.5-4.69V7.5a.5.5 0 0 0-.5-.5h-14a.5.5 0 0 0-.5.5Zm0 2.97V17a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5V9.97l-7.12 4.44a1 1 0 0 1-1.06 0Z',
  phone:
    'M7.57 13.09c1.54 2.96 3.96 5.2 7.08 6.68a1 1 0 0 0 .98-.08l2.3-1.46c.33-.2.76-.16 1.07.07.74.56 1.55 1.02 2.43 1.35.48.19.75.71.63 1.21l-.64 2.67A1 1 0 0 1 20.5 24C9.22 24 0 14.78 0 3.5A1 1 0 0 1 1.37 2.6L4.04 3.2c.5.11.86.53.9 1.03.08.96.3 1.88.63 2.73.13.34.03.72-.23.98l-1.7 1.7a1 1 0 0 0-.2 1.15z',
}

const iconViewBox: Record<SocialIcon, string> = {
  linkedin: '0 0 20 20',
  github: '0 0 16 16',
  email: '0 0 24 24',
  phone: '0 0 24 24',
}

const certifications: Certification[] = [
  { label: 'C#', value: 'Basic' },
  { label: 'GoLang', value: 'Basic' },
  { label: 'SQL', value: 'Basic' },
  { label: 'SQL', value: 'Intermediate' },
  { label: 'Solving problems', value: 'Basic' },
  { label: 'Software engineering', value: 'Basic' },
]

const projectColors = ['#ebe8ff', '#e5f5ff', '#ffe9d8', '#e7f5e0']

const techLogosLangages: TechLogo[] = [
  { name: 'VB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualbasic/visualbasic-original.svg' },
  { name: 'C#', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: 'C', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Go', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
  { name: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Kotlin', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
  { name: 'Swift', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
  { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'Rust', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg' },
]

const techLogosFrameworks: TechLogo[] = [
  { name: 'Vue.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Django', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  { name: 'Symfony', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg' },
  { name: 'Electron', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg' },
  { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Expo', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/expo/expo-original.svg' },
  { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
]

const techLogosOutils: TechLogo[] = [
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'OVH', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/ovh.svg' },
  { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Jira', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original-wordmark.svg' },
  { name: 'Proxmox', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/proxmox/proxmox-original-wordmark.svg' },
  { name: 'Grafana', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg' },
  { name: 'ElasticSearch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg' },
]

const MIN_CHIPS_PER_TRACK = 15

const buildMarqueeTrack = (logos: TechLogo[]): TechMarqueeTrack => {
  const base = [...logos]
  while (base.length < MIN_CHIPS_PER_TRACK) {
    base.push(...logos)
  }

  const doubled = [...base, ...base]
  return {
    items: doubled,
    duration: Math.max(10, base.length * 4),
  }
}

const techMarqueeTracks = computed<TechMarqueeTrack[]>(() => [
  buildMarqueeTrack(techLogosLangages),
  buildMarqueeTrack(techLogosFrameworks),
  buildMarqueeTrack(techLogosOutils),
])

const githubProfile = ref<ProfileOverview | null>(null)
const githubError = ref(false)
const isProjectsModalOpen = ref(false)
const bodyOverflow = ref('')
const backgroundCanvas = ref<HTMLCanvasElement | null>(null)
let disposeBackground: (() => void) | undefined

const githubReposAll = computed(() => githubProfile.value?.repos ?? [])

const githubReposTop3 = computed(() => {
  if (!githubReposAll.value.length) return []
  return githubReposAll.value.slice(0, 3)
})

const githubHasRepos = computed(() => !!githubReposAll.value.length)

const openProjectsModal = () => {
  if (!githubHasRepos.value) return
  isProjectsModalOpen.value = true
}

const closeProjectsModal = () => {
  isProjectsModalOpen.value = false
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isProjectsModalOpen.value) {
    closeProjectsModal()
  }
}

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN || ''
const mapboxStaticUrl = computed(() => {
  if (!mapboxToken) return ''
  const coords = '-0.5792,44.8378'
  const zoom = 12.5
  const style = 'dark-v11'
  const size = '800x600@2x'
  return `https://api.mapbox.com/styles/v1/mapbox/${style}/static/pin-s+7ce7ff(${coords})/${coords},${zoom},0/${size}?access_token=${mapboxToken}`
})

const setupBackground = () => {
  const canvas = backgroundCanvas.value
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
  camera.position.z = 5

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

  const particleCount = 360
  const positions = new Float32Array(particleCount * 3)
  for (let index = 0; index < particleCount; index += 1) {
    const offset = index * 3
    positions[offset] = (Math.random() - 0.5) * 10
    positions[offset + 1] = (Math.random() - 0.5) * 7
    positions[offset + 2] = (Math.random() - 0.5) * 4
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const particleCanvas = document.createElement('canvas')
  particleCanvas.width = 64
  particleCanvas.height = 64
  const particleContext = particleCanvas.getContext('2d')
  if (!particleContext) return
  const particleGradient = particleContext.createRadialGradient(32, 32, 0, 32, 32, 32)
  particleGradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  particleGradient.addColorStop(0.72, 'rgba(255, 255, 255, 0.96)')
  particleGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
  particleContext.fillStyle = particleGradient
  particleContext.fillRect(0, 0, 64, 64)
  const particleTexture = new THREE.CanvasTexture(particleCanvas)
  const material = new THREE.PointsMaterial({
    color: 0x2669c7,
    map: particleTexture,
    size: 0.052,
    transparent: true,
    opacity: 0.68,
    sizeAttenuation: true,
  })
  const particles = new THREE.Points(geometry, material)
  scene.add(particles)

  const resize = () => {
    const { innerWidth, innerHeight } = window
    renderer.setSize(innerWidth, innerHeight, false)
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
  }

  let frameId = 0
  const render = (time: number) => {
    particles.rotation.y = time * 0.000085
    particles.rotation.x = Math.sin(time * 0.00018) * 0.16
    camera.position.x = Math.sin(time * 0.0001) * 0.22
    camera.position.y = Math.cos(time * 0.00013) * 0.12
    renderer.render(scene, camera)
    frameId = window.requestAnimationFrame(render)
  }

  resize()
  window.addEventListener('resize', resize)
  frameId = window.requestAnimationFrame(render)

  disposeBackground = () => {
    window.cancelAnimationFrame(frameId)
    window.removeEventListener('resize', resize)
    geometry.dispose()
    material.dispose()
    particleTexture.dispose()
    renderer.dispose()
  }
}

watch(isProjectsModalOpen, (isOpen) => {
  if (isOpen) {
    bodyOverflow.value = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = bodyOverflow.value
  }
})

onMounted(async () => {
  bodyOverflow.value = document.body.style.overflow
  window.addEventListener('keydown', handleKeydown)
  setupBackground()

  try {
    githubProfile.value = await fetchProfileOverview()
  } catch (error) {
    githubError.value = true
    console.error('GitHub fetch failed', error)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  disposeBackground?.()
  document.body.style.overflow = bodyOverflow.value
})
</script>

<template>
  <div class="page">
    <canvas ref="backgroundCanvas" class="background-canvas" aria-hidden="true"></canvas>
    <nav class="topbar">
      <div class="topbar_brand">
        <div class="brand">
          <span class="brand__dot" aria-hidden="true"></span>
          <span class="brand__name">Thomas Leterme</span>
        </div>
        <a href="/CV.pdf" class="brand" download="CV-Thomas-Leterme.pdf">
          <span class="brand__dot brand__dot__blue" aria-hidden="true"></span>
          <span class="brand__name">Curriculum Vitae</span>
        </a>
        <a
          :href="currentEmployer.url"
          class="brand"
          target="_blank"
          rel="noreferrer"
        >
          <span class="brand__dot" :class="currentEmployer.dotClass" aria-hidden="true"></span>
          <span class="brand__name">{{ currentEmployer.name }}</span>
          <img
            class="brand__logo"
            :src="currentEmployer.logo"
            :alt="currentEmployer.logoAlt"
            loading="lazy"
          />
        </a>
      </div>
    </nav>

    <section class="hero-grid">
      <div class="card hero-card">
        <p class="hero-card__eyebrow">Développeur Fullstack — Bordeaux</p>
        <h1 class="hero-card__title">Thomas Leterme</h1>
        <p class="hero-card__lede">
          En train de valider un Master of Science à Epitech Bordeaux.
        </p>
        <div class="hero-card__meta">
          <template v-if="githubProfile">
            <p class="muted">GitHub · @{{ githubProfile.username }}</p>
            <p class="muted italic">
              {{ githubProfile.followers }} followers ·
              {{ githubProfile.publicRepos }} repos publics
            </p>
          </template>
          <p v-else-if="githubError" class="muted">GitHub non disponible</p>
          <p v-else class="muted">Chargement du profil GitHub…</p>
        </div>
        <div class="hero-card__actions">
          <a
            id="contact"
            class="btn btn--primary"
            href="mailto:thomas.pro.leterme@gmail.com"
            >Me contacter</a
          >
          <div class="social-buttons">
            <a
              v-for="link in socialLinks"
              :key="link.label"
              class="social-buttons__item"
              :href="link.href"
              :target="link.target || undefined"
              rel="noreferrer"
            >
              <svg
                class="social-buttons__icon"
                :viewBox="iconViewBox[link.icon]"
                role="img"
                aria-hidden="true"
              >
                <path :d="iconPaths[link.icon]" fill="currentColor" />
              </svg>
              <span class="sr-only">{{ link.label }}</span>
            </a>
          </div>
        </div>
      </div>

      <div class="card photo-card">
        <img
          src="/thomas.jpeg"
          alt="Portrait de Thomas Leterme"
          loading="lazy"
        />
      </div>
    </section>

    <section class="tech-marquee card">
      <div class="tech-marquee__header">
        <p class="card__eyebrow">Compétences</p>
      </div>
      <div class="tech-marquee__viewport">
        <div
          v-for="(track, trackIndex) in techMarqueeTracks"
          :key="trackIndex"
          class="tech-marquee__track"
          :style="{ '--marquee-duration': `${track.duration}s` }"
        >
          <div
            v-for="(tech, index) in track.items"
            :key="tech.name + index"
            class="tech-chip"
          >
            <img
              class="tech-chip__logo"
              :src="tech.logo"
              :alt="tech.name"
              loading="lazy"
            />
            <span class="tech-chip__label">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="gallery" id="work">
      <article
        v-for="(repo, index) in githubReposTop3"
        :key="repo.id"
        class="card project-card"
        :style="{
          '--card-accent-rgb':
            projectColors[index % projectColors.length]
              .replace('#', '')
              .match(/.{2}/g)
              ?.map((hex) => parseInt(hex, 16))
              .join(', ') || '247, 248, 251',
          '--card-border': projectColors[index % projectColors.length],
        }"
      >
        <p class="card__eyebrow">Projet GitHub</p>
        <h3 class="card__title">{{ repo.name }}</h3>
        <p class="muted card__desc">
          {{ repo.description || "Aucune description pour le moment." }}
        </p>
        <div class="card__footer">
          <div class="chips">
            <span v-if="repo.language" class="chip">{{ repo.language }}</span>
            <span v-if="repo.stars > 1" class="chip">★ {{ repo.stars }}</span>
          </div>
          <a
            class="pill-link"
            :href="repo.url"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              class="social-buttons__icon"
              :viewBox="iconViewBox.github"
              role="img"
              aria-hidden="true"
            >
              <path :d="iconPaths.github" fill="currentColor" />
            </svg>
          </a>
        </div>
      </article>

      <article v-if="githubError" class="card project-card card--placeholder">
        <p class="card__eyebrow">GitHub</p>
        <h3 class="card__title">Impossible de charger les projets</h3>
        <p class="muted">GitHub n'est pas disponible pour le moment.</p>
      </article>

      <article
        v-else-if="!githubProfile"
        class="card project-card card--placeholder"
      >
        <p class="card__eyebrow">GitHub</p>
        <h3 class="card__title">Chargement...</h3>
        <p class="muted">Je récupère les projets publics.</p>
      </article>

      <article
        v-else-if="!githubReposTop3.length"
        class="card project-card card--placeholder"
      >
        <p class="card__eyebrow">GitHub</p>
        <h3 class="card__title">Aucun projet public trouvé</h3>
        <p class="muted">Dès qu'un dépôt sera disponible, il apparaîtra ici.</p>
      </article>

      <!-- <article class="card map-card">
        <div class="card__header">
          <p class="card__eyebrow">Localisation</p>
        </div>
        <div class="map-embed" v-if="mapboxStaticUrl">
          <img :src="mapboxStaticUrl" alt="Bordeaux sur la carte" loading="lazy" />
        </div>
        <p v-else class="muted project__empty">Token Mapbox manquant ou invalide.</p>
      </article> -->

      <!-- <article class="card cert-card">
        <p class="card__eyebrow">Certifications</p>
        <ul class="list">
          <li v-for="item in certifications" :key="item.label">
            <span>{{ item.label }}</span>
            <span class="muted">{{ item.value }}</span>
          </li>
        </ul>
      </article> -->
    </section>

    <section class="all-projects">
      <button
        type="button"
        class="pill-link"
        @click="openProjectsModal"
        v-if="githubHasRepos && !githubError"
      >
        Tous les projets
      </button>
    </section>

    <teleport to="body">
      <div v-if="isProjectsModalOpen" class="projects-modal">
        <div class="projects-modal__backdrop" @click="closeProjectsModal"></div>
        <div
          class="projects-modal__dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="projects-modal-title"
        >
          <header class="projects-modal__header">
            <div>
              <!-- <p class="projects-modal__eyebrow">Mes projets</p> -->
              <h2 id="projects-modal-title" class="projects-modal__title">
                Tous mes dépôts GitHub
              </h2>
              <p v-if="githubProfile" class="projects-modal__meta">
                {{ githubReposAll.length }} projets publics ·
                {{ githubProfile.followers }} followers
              </p>
            </div>
            <button
              type="button"
              class="projects-modal__close"
              @click="closeProjectsModal"
              aria-label="Fermer la liste des projets"
            >
              ✕
            </button>
          </header>

          <ul class="projects-modal__list">
            <li v-for="repo in githubReposAll" :key="repo.id">
              <a
                class="project__link project__link--modal"
                :href="repo.url"
                target="_blank"
                rel="noreferrer"
              >
                <div>
                  <p class="project__title">{{ repo.name }}</p>
                  <p class="muted project__detail">
                    {{
                      repo.description || "Aucune description pour le moment."
                    }}
                  </p>
                  <p class="project__meta">
                    <span v-if="repo.language" class="project__language">{{
                      repo.language
                    }}</span>
                    <span
                      v-if="
                        repo.topics &&
                        repo.topics.length > 0 &&
                        repo.topics.some((topic) => topic !== 'portfolio')
                      "
                      class="project__topics"
                      >{{
                        repo.topics
                          .filter((topic) => topic !== "portfolio")
                          .map((topic) => `#${topic}`)
                          .join(" - ")
                      }}</span
                    >
                    <span v-if="repo.stars > 1">★ {{ repo.stars }}</span>
                    <a
                      v-if="repo.homepage"
                      class="project__meta-link"
                      :href="repo.homepage"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Démo ↗
                    </a>
                  </p>
                </div>
                <!-- <span class="project__status">GitHub</span> -->
              </a>
            </li>
          </ul>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style scoped>
.page {
  max-width: 1140px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 2.2rem 1.4rem 2.8rem;
  position: relative;
  z-index: 1;
}

.background-canvas {
  position: fixed;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.italic {
  font-style: italic;
  font-size: 0.9rem;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.4rem;
  gap: 1rem;
}

.topbar_brand {
  display: flex;
  gap: 1rem;
  margin-left: 0.5rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: var(--text);
}

.brand__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #f3c04d;
  box-shadow: 0 0 0 8px rgba(243, 192, 77, 0.2);
}

.brand__dot--yunohit {
  background: #ff5e5e;
  box-shadow: 0 0 0 8px rgba(255, 94, 94, 0.15);
}

.brand__dot--ovhcloud {
  background: #123f6d;
  box-shadow: 0 0 0 8px rgba(18, 63, 109, 0.15);
}

.brand__dot__blue {
  background: #4da6ff;
  box-shadow: 0 0 0 8px rgba(77, 166, 255, 0.15);
}

.brand__name {
  font-size: 1rem;
  margin-left: 0.2rem;
}

.brand__logo {
  width: 30px;
  height: auto;
  border-radius: 4px;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2.4fr);
  gap: 1.1rem;
  align-items: stretch;
  margin-bottom: 1.2rem;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
  padding: 1.35rem;
  border-radius: 18px;
  background: #f7f8fb;
  border: 1px solid var(--border);
  box-shadow: 0 2.5px 10px rgba(15, 23, 42, 0.08);
}

.hero-card {
  background: linear-gradient(135deg, #f8e7b3, #e3f1ff);
  border-radius: 14px 6px 6px 14px;
}

.hero-card__eyebrow {
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: #555a66;
  margin: 0;
}

.hero-card__title {
  margin: 0.1rem 0 0.2rem;
  font-size: clamp(2.1rem, 2vw + 1.4rem, 3rem);
  letter-spacing: -0.02em;
  color: #131722;
}

.hero-card__lede {
  margin: 0.35rem 0 0;
  font-size: 1.05rem;
  line-height: 1.6;
  max-width: 50ch;
  color: #333947;
}

.hero-card__meta {
  display: grid;
  gap: 0.2rem;
}

.hero-card__actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.75rem 1.15rem;
  border-radius: 999px;
  border: none;
  font-weight: 700;
  letter-spacing: 0.01em;
  cursor: pointer;
  text-decoration: none;
  transition: transform 140ms ease, box-shadow 140ms ease;
}

.btn--primary {
  background: #0f0f11;
  color: #fdfdfd;
  box-shadow: 0 2.5px 10px rgba(0, 0, 0, 0.3);
  transition: all 140ms ease;
}

.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.social-buttons {
  display: inline-flex;
  gap: 0.5rem;
}

.social-buttons__item {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid #b2b9c6;
  background: #fff;
  display: grid;
  place-items: center;
  color: #1b1f2b;
  transition: transform 140ms ease, border-color 140ms ease,
    box-shadow 140ms ease;
}

.social-buttons__item:hover {
  transform: translateY(-2px);
  border-color: #b2b9c6;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.social-buttons__icon {
  width: 18px;
  height: 18px;
}

.photo-card {
  padding: 0;
  overflow: hidden;
  background: #fff6e3;
  align-self: start;
  border-radius: 6px 14px 14px 6px;
}

.photo-card img {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  border-radius: inherit;
  display: block;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  align-items: stretch;
}

.all-projects {
  margin-top: 1.8rem;
  text-align: center;
}

.tech-marquee {
  background: linear-gradient(135deg, #e6f1ff 0%, #fff4e5 100%);
  margin-bottom: 1rem;
  overflow: hidden;
}

.tech-marquee__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.tech-marquee__hint {
  margin: 0;
  color: #3e4554;
  font-weight: 700;
}

.tech-marquee__viewport {
  position: relative;
  display: grid;
  gap: 0.55rem;
  overflow: hidden;
  margin-top: 0.3rem;
  padding: 0.25rem 0;
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000 10%,
    #000 90%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent,
    #000 10%,
    #000 90%,
    transparent
  );
}

.tech-marquee__track {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  animation: marquee var(--marquee-duration, 60s) linear infinite;
  will-change: transform;
  min-width: max-content;
}

.tech-marquee__track:nth-of-type(odd) {
  animation-direction: reverse;
}

.tech-marquee__track:hover {
  animation-play-state: paused;
}

.tech-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #e1e4ec;
  flex-shrink: 0;
  min-width: auto;
}

.tech-chip__logo {
  width: 28px;
  height: 28px;
  object-fit: contain;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.08));
}

.tech-chip__label {
  font-weight: 700;
  color: #1d2330;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .background-canvas {
    display: none;
  }

  .tech-marquee__track {
    animation: none;
  }
}

.card__eyebrow {
  margin: 0;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 0.82rem;
  color: #7a8290;
}

.card__title {
  margin: 0.1rem 0 0.2rem;
  font-size: 1.3rem;
  color: #121826;
}

.card__desc {
  margin: 0;
  line-height: 1.5;
}

.card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;
  margin-top: auto;
}

.card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.project-card {
  background: rgba(var(--card-accent-rgb, 247, 248, 251), 0.7);
  border: 2px solid var(--card-border, #f7f8fb);
}

.card--placeholder {
  background: #f7f8fb;
}

.chips {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip {
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  background: #ffffff;
  border: 1px solid #dfe4ed;
  font-weight: 600;
  color: #1d2330;
}

.pill-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: 1px solid #d8dde6;
  background: #ffffff;
  color: #101623;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  transition: transform 140ms ease, border-color 140ms ease,
    box-shadow 140ms ease;
}

.pill-link:hover {
  transform: translateY(-2px);
  border-color: #cbd2de;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
}

.map-embed {
  display: grid;
  gap: 0.55rem;
}

.map-embed img {
  width: 100%;
  height: auto;
  border-radius: 18px;
  border: 1px solid #d8dde6;
  box-shadow: 0 16px 38px rgba(17, 24, 39, 0.12);
}

.muted {
  color: #5c6576;
}

.list {
  display: grid;
  gap: 0.65rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;
  padding: 0.65rem 0.8rem;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #e1e4ec;
}

.skills-card {
  gap: 1rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 0.9rem;
}

.skills-group {
  border: 1px solid #e1e4ec;
  background: #ffffff;
  border-radius: 16px;
  padding: 0.85rem 0.9rem;
  display: grid;
  gap: 0.5rem;
}

.skills-group__title {
  margin: 0;
  font-weight: 700;
}

.pill-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.pill {
  padding: 0.4rem 0.75rem;
  border-radius: 12px;
  background: #f2f4f8;
  color: #1d2330;
  border: 1px solid #e1e4ec;
}

.card--wide {
  grid-column: span 2;
}

.project__empty {
  padding: 0.65rem 0.7rem;
  border-radius: 16px;
  border: 1px dashed #d8dde6;
  background: #ffffff;
}

.project__link {
  display: flex;
  justify-content: space-between;
  gap: 0.7rem;
  padding: 0.8rem 0.9rem;
  border-radius: 14px;
  border: 1px solid #e1e4ec;
  background: #ffffff;
  align-items: center;
  color: inherit;
  text-decoration: none;
  transition: border-color 160ms ease, transform 160ms ease,
    box-shadow 160ms ease;
  padding-right: 1.2rem;
}

.project__link:hover {
  border-color: #cbd2de;
  transform: translateY(-2px);
  box-shadow: 0 2px 0px rgba(15, 23, 42, 0.12),
    inset 0 0 2px rgba(15, 23, 42, 0.12);
}

.project__title {
  margin: 0;
  font-weight: 700;
}

.project__detail {
  margin-top: 0.1rem;
  font-size: 0.98rem;
}

.project__meta {
  display: flex;
  gap: 0.6rem;
  align-items: center;
  margin: 0.3rem 0 0;
  color: #5c6576;
  font-size: 0.9rem;
}

.project__meta span {
  display: inline-flex;
  gap: 0.3rem;
  align-items: center;
}

.project__meta a {
  color: #111827;
  text-decoration: none;
}

.project__meta a:hover {
  color: #2563eb;
}

.project__status {
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  border: 1px solid #e1e4ec;
  background: #f7f8fb;
  font-size: 0.88rem;
  color: #1d2330;
}

.projects-modal {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
}

.projects-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(17, 24, 39, 0.32);
  backdrop-filter: blur(4px);
}

.projects-modal__dialog {
  position: relative;
  z-index: 1;
  width: min(92vw, 960px);
  max-height: 82vh;
  padding: 1.4rem 1.5rem;
  border-radius: 20px;
  border: 1.5px solid #e1e4ec;
  background: #fdfdfd;
  box-shadow: 0 32px 90px rgba(15, 23, 42, 0.25),
    inset 0 0 10px rgba(15, 23, 42, 0.12);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  /* cubic bezier flash */
  animation: fadeInScale 240ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.projects-modal__header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
}

.projects-modal__eyebrow {
  margin: 0;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 0.82rem;
  color: #7a8290;
}

.projects-modal__title {
  margin: 0.1rem 0 0;
  letter-spacing: -0.02em;
}

.projects-modal__meta {
  margin: 0.5rem 0 0 0;
  color: #5c6576;
  font-style: italic;
}

.projects-modal__close {
  border: 1px solid #cbd2de;
  background: #ffffff;
  color: #111827;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  padding-bottom: 0.15rem;
  transition: border-color 140ms ease, transform 140ms ease,
    box-shadow 140ms ease;
}

.projects-modal__close:hover {
  background: #f7f8fb;
  box-shadow: 0 0 5px rgba(15, 23, 42, 0.12),
    inset 0 0 2px rgba(15, 23, 42, 0.12);
}

.projects-modal__list {
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0.5rem 0 0;
  display: grid;
  gap: 0.7rem;
  overflow: auto;
  flex: 1;
  min-height: 0;
}

.projects-modal__list li {
  padding: 0;
}

.projects-modal__list .project__link {
  border-style: solid;
}

.projects-modal__list .project__detail {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project__language {
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  background: #e1e4ec;
  color: #1d2330;
  font-size: 0.85rem;
  box-shadow: inset 0 2px 10px rgba(225, 228, 236, 0.5);
}

.project__topics {
  display: inline-flex;
  gap: 0.3rem;
  color: #2563eb;
  font-size: 0.85rem;
}

:global(.sr-only) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (max-width: 960px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .card--wide {
    grid-column: span 1;
  }
}

@media (max-width: 640px) {
  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .topbar_brand {
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-left: 0;
  }

  .brand {
    gap: 0.45rem;
  }

  .brand__name {
    font-size: 0.85rem;
  }

  .topbar__links {
    width: 100%;
  }

  .page {
    padding: 2rem 1rem 2.6rem;
  }

  .card__footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .tech-chip {
    min-width: 120px;
    padding: 0.45rem 0.65rem;
  }

  .tech-marquee__hint {
    font-size: 0.95rem;
  }
}
</style>
