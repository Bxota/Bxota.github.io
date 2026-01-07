<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import MastheadBadge from './components/MastheadBadge.vue'
import TileCard from './components/TileCard.vue'
import { fetchProfileOverview, type ProfileOverview } from './services/githubApi'

type SocialIcon = 'linkedin' | 'github' | 'email' | 'phone'
type SocialLink = { label: string; href: string; icon: SocialIcon; copy?: string; target?: string }
type Certification = { label: string; value: string }

const phoneNumber = '+336953122449'
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

const githubProfile = ref<ProfileOverview | null>(null)
const githubError = ref(false)
const isProjectsModalOpen = ref(false)
const bodyOverflow = ref('')

const githubTitle = computed(() => {
  if (githubProfile.value?.username) {
    return `GitHub · @${githubProfile.value.username}`
  }
  return 'GitHub'
})

const githubCopy = computed(() => {
  if (githubError.value) return 'GitHub non disponible'
  if (!githubProfile.value) return 'Chargement...'
  return `${githubProfile.value.followers} followers · ${githubProfile.value.publicRepos} repos publics`
})

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

  try {
    githubProfile.value = await fetchProfileOverview()
  } catch (error) {
    githubError.value = true
    console.error('GitHub fetch failed', error)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = bodyOverflow.value
})
</script>

<template>
  <div class="page">
    <header class="masthead">
      <MastheadBadge title="Thomas LETERME" copy="Fullstack Developer">
        <template #icon>
          <svg class="masthead__icon-user" viewBox="0 0 24 24" role="img" aria-hidden="true">
            <path
              d="M12 12a4 4 0 1 0-4-4 4.003 4.003 0 0 0 4 4m0 2c-3.33 0-6 2-6 4v1h12v-1c0-2-2.67-4-6-4"
              fill="currentColor"
            />
          </svg>
        </template>
      </MastheadBadge>
      <MastheadBadge title="Alternant chez Yunohit" copy="Bordeaux, France">
        <template #icon>
          <span class="masthead__dot" aria-hidden="true"></span>
        </template>
      </MastheadBadge>
      <MastheadBadge :title="githubTitle" :copy="githubCopy">
        <template #icon>
          <svg class="masthead__icon-github" viewBox="0 0 16 16" role="img" aria-hidden="true">
            <path
              d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38l-.01-1.35c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27 7.6 7.6 0 0 1 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.45.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8"
            />
          </svg>
        </template>
      </MastheadBadge>
      <MastheadBadge
        v-for="link in socialLinks"
        :key="link.label"
        :href="link.href"
        :target="link.target || undefined"
        :title="link.label"
        :copy="link.copy"
        hover-reveal
        class="masthead__badge--social"
      >
        <template #icon>
          <div class="masthead__social">
            <svg
              class="masthead__social-icon"
              :viewBox="iconViewBox[link.icon]"
              role="img"
              aria-hidden="true"
            >
              <path :d="iconPaths[link.icon]" fill="currentColor" />
            </svg>
            <span class="sr-only">{{ link.label }}</span>
          </div>
        </template>
      </MastheadBadge>
    </header>

    <section class="mosaic">
      <div class="mosaic__grid">
        <TileCard variant="media" tone="accent" class="photo-tile mosaic__photo">
          <div class="photo-card">
            <img src="/thomas.jpeg" alt="Portrait de Thomas Leterme" class="photo-img" />
          </div>
        </TileCard>

        <TileCard variant="media" tone="ghost" class="location-tile mosaic__loc">
          <div class="map-embed" v-if="mapboxStaticUrl">
            <img :src="mapboxStaticUrl" alt="Bordeaux sur la carte" loading="lazy" />
          </div>
          <p v-else class="project__empty">Token Mapbox manquant ou invalide.</p>
        </TileCard>

        <TileCard eyebrow="Ecole" tone="ghost" class="mosaic__school">
          <span>
            Epitech Bordeaux • <span style="color: var(--muted);"><i>en cours</i></span>
            <p class="muted">Master en architecture des SI </p>
          </span>
        </TileCard>

        <TileCard eyebrow="Mes projets" class="mosaic__projects" tone="ghost">
          <template #header-action>
            <button
              v-if="githubHasRepos && !githubError"
              type="button"
              class="projects__see-all"
              @click="openProjectsModal"
            >
              Tout voir
            </button>
          </template>
          <ul class="projects">
            <li v-if="githubError" class="project__empty">
              Impossible de charger les projets GitHub pour le moment.
            </li>
            <li v-else-if="!githubProfile" class="project__empty">Chargement des projets GitHub…</li>
            <li v-else-if="!githubReposTop3.length" class="project__empty">Aucun projet public trouvé.</li>
            <li v-else v-for="repo in githubReposTop3" :key="repo.id">
              <a class="project__link" :href="repo.url" target="_blank" rel="noreferrer">
                <div>
                  <p class="project__title">{{ repo.name }}</p>
                  <p class="muted project__detail">{{ repo.description || 'Aucune description pour le moment.' }}</p>
                  <p class="project__meta">
                    <span v-if="repo.language">{{ repo.language }}</span>
                    <span>★ {{ repo.stars }}</span>
                  </p>
                </div>
                <span class="project__status">GitHub</span>
              </a>
            </li>
          </ul>
        </TileCard>

        <TileCard eyebrow="Certifications" tone="ghost" class="mosaic__current">
          <ul class="list">
            <li v-for="item in certifications" :key="item.label">
              <span>{{ item.label }}</span>
              <span class="muted">{{ item.value }}</span>
            </li>
          </ul>
        </TileCard>
      </div>

      <TileCard eyebrow="Compétences" class="skills-tile mosaic__skills" tone="ghost">
        <div class="skills-grid">
          <div class="skills-group">
            <p class="skills-group__title">Langages de programmation</p>
            <div class="pill-grid">
              <span v-for="item in ['VB', 'C#', 'C', 'C++', 'Go', 'Python', 'Php', 'TypeScript', 'Kotlin', 'Swift']" :key="item" class="pill">{{ item }}</span>
            </div>
          </div>
          <div class="skills-group">
            <p class="skills-group__title">Frameworks</p>
            <div class="pill-grid">
              <span v-for="item in ['VueJS', 'Symfony', 'Django', 'ElectronJs', 'CosmicJs', 'Bootstrap', 'Capacitor']" :key="item" class="pill">{{ item }}</span>
            </div>
          </div>
          <div class="skills-group">
            <p class="skills-group__title">Base de données</p>
            <div class="pill-grid">
              <span v-for="item in ['Oracle', 'PostgreSQL', 'MariaDB', 'S3 (AWS)']" :key="item" class="pill">{{ item }}</span>
            </div>
          </div>
          <div class="skills-group">
            <p class="skills-group__title">Cloud</p>
            <div class="pill-grid">
              <span v-for="item in ['AWS', 'Scaleway', 'OVH', 'Azure', 'Grafana']" :key="item" class="pill">{{ item }}</span>
            </div>
          </div>
          <div class="skills-group">
            <p class="skills-group__title">Outils</p>
            <div class="pill-grid">
              <span v-for="item in ['Atlassian (Jira)', 'Git', 'TFS', 'Visual Studio', 'Visual Studio Code', 'Docker', 'WSL']" :key="item" class="pill">{{ item }}</span>
            </div>
          </div>
        </div>
      </TileCard>
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
              <p class="projects-modal__eyebrow">Mes projets</p>
              <h2 id="projects-modal-title" class="projects-modal__title">Tous mes dépôts GitHub</h2>
              <p v-if="githubProfile" class="projects-modal__meta">
                {{ githubReposAll.length }} projets publics · {{ githubProfile.followers }} followers
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
              <a class="project__link project__link--modal" :href="repo.url" target="_blank" rel="noreferrer">
                <div>
                  <p class="project__title">{{ repo.name }}</p>
                  <p class="muted project__detail">
                    {{ repo.description || 'Aucune description pour le moment.' }}
                  </p>
                  <p class="project__meta">
                    <span v-if="repo.language">{{ repo.language }}</span>
                    <span>★ {{ repo.stars }}</span>
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
                <span class="project__status">GitHub</span>
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
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1.8rem 1.1rem 2.2rem;
  position: relative;
}

.page::after {
  content: '';
  position: absolute;
  inset: 8% 3%;
  border-radius: 32px;
  background: radial-gradient(circle at 10% 10%, rgba(140, 230, 255, 0.12), transparent 24%),
    radial-gradient(circle at 90% 0%, rgba(137, 232, 200, 0.12), transparent 26%),
    linear-gradient(120deg, rgba(255, 255, 255, 0.02), transparent 30%);
  filter: blur(12px);
  z-index: -1;
  opacity: 0.9;
}

.masthead {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.masthead__eyebrow {
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
  font-size: 0.78rem;
  margin: 0 0 0.4rem;
}

.masthead h1 {
  margin: 0;
  font-size: clamp(2.1rem, 2.4vw + 1.2rem, 3rem);
  letter-spacing: -0.03em;
}

.masthead__subtitle {
  color: var(--muted);
  max-width: 56ch;
  line-height: 1.6;
  margin: 0.4rem 0 0;
  font-size: 1rem;
}

:global(.masthead__badge) {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  padding: 0.65rem 0.9rem;
  border-radius: 999px;
  min-width: 230px;
  height: 52px;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.25);
}

:global(.masthead__badge--icon-only) {
  min-width: 0;
  padding: 0.5rem 0.65rem;
  gap: 0.5rem;
  height: 52px;
  justify-content: center;
}

:global(.masthead__badge--social) {
  min-width: 0;
  padding: 0.6rem 0.85rem;
  height: 52px;
}

:global(.masthead__badge--hover-reveal) {
  min-width: 0;
  width: auto;
  padding-right: 0.65rem;
  gap: 0;
  transition: padding 750ms ease, border-color 750ms ease, gap 750ms ease;
}

:global(.masthead__badge--hover-reveal .masthead__texts) {
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  white-space: nowrap;
  transition: max-width 280ms ease, opacity 280ms ease;
}

:global(.masthead__badge--hover-reveal:hover),
:global(.masthead__badge--hover-reveal:focus-within) {
  border-color: rgba(140, 230, 255, 0.4);
  padding-right: 1.4rem;
  gap: 0.45rem;
}

:global(.masthead__badge--hover-reveal:hover .masthead__texts),
:global(.masthead__badge--hover-reveal:focus-within .masthead__texts) {
  max-width: 200px;
  opacity: 1;
}


:global(.masthead__icon-github) {
  width: 22px;
  height: 22px;
  fill: currentColor;
  display: block;
}

:global(.masthead__icon-user) {
  width: 22px;
  height: 22px;
  fill: currentColor;
  display: block;
}

:global(.masthead__texts) {
  display: grid;
  gap: 0.15rem;
}

:global(.masthead__dot) {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 8px rgba(140, 230, 255, 0.1);
}

:global(.masthead__badge-title) {
  margin: 0;
  font-weight: 600;
}

:global(.masthead__badge-copy) {
  margin: 0;
  color: var(--muted);
  font-size: 0.95rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--grid-gap);
  align-items: start;
}

.photo-card {
  position: relative;
  height: 100%;
  min-height: 340px;
  width: 100%;
  background: radial-gradient(circle at 30% 20%, rgba(140, 230, 255, 0.2), transparent 32%),
    radial-gradient(circle at 70% 70%, rgba(137, 232, 200, 0.18), transparent 30%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
}

.photo-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  filter: saturate(1.05) contrast(1.02);
}

.photo-tile,
.location-tile {
  width: 100%;
  min-width: 280px;
}

.muted {
  color: var(--muted);
}

.list {
  display: grid;
  gap: 0.55rem;
  margin-top: 0.35rem;
}

.list li {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.65rem 0.7rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.03);
}

.bullet-list {
  display: grid;
  gap: 0.6rem;
  margin: 0.2rem 0 0;
}

.bullet-list li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.55rem;
  align-items: start;
  padding: 0.6rem 0.65rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.03);
  line-height: 1.5;
}

.bullet-list li::before {
  content: '•';
  color: var(--accent);
  font-weight: 700;
}

:deep(.masthead__social) {
  display: inline-flex;
  gap: 0.35rem;
  align-items: center;
  font-size: 0.95rem;
}

:deep(.masthead__icon-btn) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  color: var(--text);
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1;
  font-size: 0.95rem;
  text-transform: uppercase;
  box-shadow: none;
  transition: color 120ms ease;
}

:deep(.masthead__icon-btn:hover) {
  color: var(--accent);
}

:deep(.masthead__social-icon) {
  width: 18px;
  height: 18px;
  display: block;
}

.skills-tile {
  display: flex;
  flex-direction: column;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
}

.skills-group {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0.75rem 0.85rem;
  background: rgba(255, 255, 255, 0.03);
}

.skills-group__title {
  margin: 0 0 0.45rem;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.pill-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.pill {
  padding: 0.4rem 0.7rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text);
  font-size: 0.95rem;
}

.map-embed {
  display: grid;
  gap: 0.55rem;
  min-height: 0;
  height: auto;
}

.map-embed img {
  width: 100%;
  height: auto;
  aspect-ratio: 10 / 4;
  object-fit: cover;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: block;
}

.layout-school .list {
  height: 100%;
  display: grid;
  gap: 0.6rem;
}

.mosaic {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  gap: var(--grid-gap);
  align-items: start;
}

.mosaic__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-areas:
    'photo loc'
    'photo school'
    'projects current';
  gap: var(--grid-gap);
}

.mosaic__photo {
  grid-area: photo;
}

.mosaic__loc {
  grid-area: loc;
}

.mosaic__school {
  grid-area: school;
}

.mosaic__skills {
  align-self: start;
  max-height: 700px;
  overflow: auto;
}

.mosaic__projects {
  grid-area: projects;
}

.mosaic__current {
  grid-area: current;
}

@media (max-width: 960px) {
  .mosaic {
    grid-template-columns: 1fr;
  }

  .mosaic__grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    grid-template-areas: none;
  }

  .mosaic__photo,
  .mosaic__loc,
  .mosaic__school,
  .mosaic__projects,
  .mosaic__current {
    grid-area: auto;
  }

  .mosaic__skills {
    max-height: none;
  }
}

.projects__see-all {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.1rem;
  border: none;
  background: none;
  color: var(--accent);
  font-weight: 700;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: color 140ms ease, transform 140ms ease;
}

.projects__see-all::after {
  content: '↗';
  font-size: 0.92rem;
}

.projects__see-all:hover {
  color: #9be3ff;
  transform: translateY(-1px);
}

.projects {
  display: grid;
  gap: 0.55rem;
  margin-top: 0.35rem;
}

.projects li {
  list-style: none;
  padding: 0;
}

.project__link {
  display: flex;
  justify-content: space-between;
  gap: 0.7rem;
  padding: 0.55rem 0.7rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.03);
  align-items: center;
  color: inherit;
  text-decoration: none;
  transition: border-color 160ms ease, transform 160ms ease;
}

.project__link:hover {
  border-color: rgba(140, 230, 255, 0.4);
  transform: translateY(-2px);
}

.project__title {
  margin: 0;
  font-weight: 600;
}

.project__detail {
  margin-top: 0.1rem;
  font-size: 0.95rem;
}

.project__meta {
  display: flex;
  gap: 0.6rem;
  align-items: center;
  margin: 0.3rem 0 0;
  color: var(--muted);
  font-size: 0.9rem;
}

.project__meta span {
  display: inline-flex;
  gap: 0.3rem;
  align-items: center;
}

.project__meta a {
  color: var(--text);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.project__meta a:hover {
  color: var(--accent);
}

.project__status {
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.06);
  font-size: 0.85rem;
  color: var(--text);
}

.project__empty {
  padding: 0.65rem 0.7rem;
  border-radius: var(--radius);
  border: 1px dashed var(--border);
  background: rgba(255, 255, 255, 0.02);
  color: var(--muted);
  font-style: italic;
}

.project__link--modal {
  align-items: flex-start;
}

.project__link--modal .project__status {
  margin-top: 0.15rem;
}

.projects-modal {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 20;
}

.projects-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(2, 6, 15, 0.9);
  backdrop-filter: blur(5px);
}

.projects-modal__dialog {
  position: relative;
  z-index: 1;
  width: min(92vw, 920px);
  max-height: 82vh;
  padding: 1.35rem 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.08));
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.55);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
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
  color: var(--muted);
}

.projects-modal__title {
  margin: 0.1rem 0 0;
  letter-spacing: -0.02em;
}

.projects-modal__meta {
  margin: 0.25rem 0 0;
  color: var(--muted);
}

.projects-modal__close {
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: border-color 140ms ease, transform 140ms ease;
}

.projects-modal__close:hover {
  border-color: rgba(140, 230, 255, 0.5);
  transform: translateY(-1px);
}

.projects-modal__list {
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.6rem;
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

.key-line {
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.55rem 0.65rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.03);
  font-size: 0.95rem;
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

@media (max-width: 900px) {
  .masthead {
    flex-direction: column;
  }

  :global(.masthead__badge) {
    width: fit-content;
  }
}

@media (max-width: 640px) {
  .page {
    padding: 2.4rem 1rem 3rem;
  }

  .masthead__subtitle {
    font-size: 0.96rem;
  }

  .list li,
  .key-line {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (min-width: 960px) {
  .page {
    max-height: 100vh;
    overflow: hidden;
  }
}
</style>
