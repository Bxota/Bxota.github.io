<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import CvIcon from './CvIcon.vue'
import ExperienceList from './ExperienceList.vue'
import ExperiencePages from './ExperiencePages.vue'
import ProjectBrowser from './ProjectBrowser.vue'
import { locale, t, type Locale } from './i18n'
import { skillSources, sourcedSkillGroups } from './skills'
import TravelGallery from './TravelGallery.vue'
import { trapDialogFocus } from './dialog'
import { certifications, education, employerGroups, experiences, independentProjects, type Experience, type IndependentProject, type Project } from './data'

const mobilePreview = ref(false)
const menuOpen = ref(false)
const evidenceSkill = ref('')
const currentEmployer = { name: 'OVHcloud', url: 'https://www.ovhcloud.com/fr/' }
const selectedExperience = ref<Experience | null>(null)
const selectedProject = ref<Project | null>(null)
const selectedIndependent = ref<IndependentProject | null>(null)
const selectedCertificate = ref<typeof certifications[number] | null>(null)
const selectedSkill = ref('')
const activeSection = ref('profil')
const dialog = ref<HTMLDialogElement | null>(null)
const detailBody = ref<HTMLElement | null>(null)
const detailHeading = ref<HTMLElement | null>(null)
let previousFocus: HTMLElement | null = null
const sections = [ { id: 'profil', name: 'Profil' }, { id: 'parcours', name: 'Expériences' }, { id: 'projets', name: 'Projets' }, { id: 'competences', name: 'Compétences' }, { id: 'formation', name: 'Formation' }, { id: 'certifications', name: 'Certifications' }, { id: 'contact', name: 'Coordonnées' } ]
const matchesSkill = (item: Experience, skill: string) => item.technologies.includes(skill) || item.projects.some(project => project.technologies.includes(skill))
const matchedIds = computed(() => selectedSkill.value ? experiences.filter(item => matchesSkill(item, selectedSkill.value)).map(item => item.id) : undefined)
const visibleEmployers = computed(() => employerGroups.filter(group => !matchedIds.value || group.roles.some(role => matchedIds.value!.includes(role.id))))
const isDetailOpen = computed(() => selectedExperience.value || selectedIndependent.value || selectedCertificate.value)
const articleKey = computed(() => selectedCertificate.value?.id ?? selectedIndependent.value?.id ?? selectedProject.value?.id ?? selectedExperience.value?.id)

function updateUrl(values: Record<string, string | null>) {
  const url = new URL(window.location.href)
  url.searchParams.delete('direction')
  Object.entries(values).forEach(([key, value]) => value ? url.searchParams.set(key, value) : url.searchParams.delete(key))
  window.history.pushState({}, '', url)
  void syncRoute()
}
async function syncRoute() {
  const params = new URLSearchParams(window.location.search)
  let saved: string | null = null
  try { saved = window.localStorage.getItem('cv-language') } catch { /* Storage may be disabled. */ }
  const language = params.get('lang') ?? saved
  locale.value = language === 'en' ? 'en' : 'fr'
  document.documentElement.lang = locale.value
  document.title = locale.value === 'en' ? 'Thomas Leterme — CV' : 'Thomas Leterme — Curriculum vitæ'
  document.querySelector('meta[name="description"]')?.setAttribute('content', locale.value === 'en'
    ? 'Thomas Leterme’s CV: professional experience, projects, education and certifications.'
    : 'CV de Thomas Leterme : expériences professionnelles, projets, formation et certifications.')
  mobilePreview.value = params.get('apercu') === 'mobile'
  selectedCertificate.value = certifications.find(item => item.id === params.get('certificat')) ?? null
  selectedIndependent.value = selectedCertificate.value ? null : independentProjects.find(item => item.id === params.get('personnel')) ?? null
  const experience = selectedCertificate.value || selectedIndependent.value ? null : experiences.find(item => item.id === params.get('experience')) ?? null
  selectedExperience.value = experience
  selectedProject.value = experience?.projects.find(item => item.id === params.get('projet')) ?? null
  await nextTick()
  if (isDetailOpen.value) {
    if (!dialog.value?.open) {
      previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
      dialog.value?.showModal()
      document.body.classList.add('detail-open')
    }
    detailBody.value?.scrollTo({ top: 0 })
    dialog.value?.querySelector<HTMLElement>('#detail-title')?.focus({ preventScroll: true })
  } else if (dialog.value?.open) {
    dialog.value.close()
    document.body.classList.remove('detail-open')
    previousFocus?.focus({ preventScroll: true })
  }
}
function setLanguage(value: Locale) {
  try { window.localStorage.setItem('cv-language', value) } catch { /* URL remains the source of truth. */ }
  updateUrl({ lang: value })
}
function openExperience(experience: Experience) { updateUrl({ experience: experience.id, projet: null, personnel: null, certificat: null }) }
function openProject(experience: Experience, project: Project) { updateUrl({ experience: experience.id, projet: project.id, personnel: null, certificat: null }) }
function openIndependent(project: IndependentProject) { updateUrl({ personnel: project.id, experience: null, projet: null, certificat: null }) }
function openCertificate(id: string) { updateUrl({ certificat: id, experience: null, projet: null, personnel: null }) }
function closeDetails() { updateUrl({ experience: null, projet: null, personnel: null, certificat: null }) }
function navigateSection(id: string) {
  menuOpen.value = false
  document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
  activeSection.value = id
}
function filterBySkill(skill: string) { selectedSkill.value = selectedSkill.value === skill ? '' : skill; nextTick(() => navigateSection('parcours')) }
function relatedCount(skill: string) { return skillSources(skill).length }
async function openEvidence(skill: string) {
  evidenceSkill.value = evidenceSkill.value === skill ? '' : skill
  if (!evidenceSkill.value) return
  await nextTick()
  document.getElementById('skill-evidence')?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
}
const certificateImage = (file: string) => `/cv/certificates/${encodeURIComponent(file)}.png`
const certificatePdf = (file: string) => `/pdf/${encodeURIComponent(file)}.pdf`

let observer: IntersectionObserver | undefined
onMounted(async () => {
  // Les anciennes URL de comparaison restent valides et affichent désormais la seule version retenue.
  const url = new URL(window.location.href)
  if (url.searchParams.has('direction')) { url.searchParams.delete('direction'); window.history.replaceState({}, '', url) }
  await syncRoute()
  window.addEventListener('popstate', syncRoute)
  observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) activeSection.value = entry.target.id }), { rootMargin: '-15% 0px -60% 0px' })
  sections.forEach(section => { const element = document.getElementById(section.id); if (element) observer?.observe(element) })
})
onBeforeUnmount(() => { window.removeEventListener('popstate', syncRoute); observer?.disconnect(); document.body.classList.remove('detail-open') })
</script>

<template>
  <div class="cv-app">
    <a class="skip-link" href="#cv-content">{{ t("Aller au CV") }}</a>

    <div class="preview-shell" :class="{ 'is-mobile-preview': mobilePreview }">
      <div class="cv-layout">
        <aside class="document-index" :class="{ 'menu-open': menuOpen }" @keydown.esc="menuOpen = false">
          <p class="index-title">{{ t("Sommaire") }}</p>
          <button class="mobile-menu-toggle" :aria-expanded="menuOpen" aria-controls="cv-navigation" @click="menuOpen = !menuOpen"><CvIcon :name="menuOpen ? 'close' : 'menu'" :size="19" /><span>{{ t("Sommaire") }}</span><small>{{ t(sections.find(section => section.id === activeSection)?.name ?? '') }}</small></button>
          <div id="cv-navigation" class="index-menu">
            <nav :aria-label="t('Sections du CV')"><a v-for="(section, index) in sections" :key="section.id" :href="`#${section.id}`" :aria-current="activeSection === section.id ? 'location' : undefined" @click.prevent="navigateSection(section.id)"><span>{{ String(index).padStart(2, '0') }}</span>{{ t(section.name) }}</a></nav>
            <div class="index-actions">
              <div class="language-switch" role="group" aria-label="Language / Langue"><button lang="fr" :aria-pressed="locale === 'fr'" aria-label="Français" @click="setLanguage('fr')">FR</button><button lang="en" :aria-pressed="locale === 'en'" aria-label="English" @click="setLanguage('en')">EN</button></div>
              <a href="/CV.pdf" download="CV-Thomas-Leterme.pdf" hreflang="fr"><CvIcon name="download" :size="17" /> {{ t("CV PDF (FR)") }}</a>
            </div>
            <a class="portfolio-return" href="/"><CvIcon name="back" :size="16" /> Portfolio</a>
          </div>
        </aside>
        <main id="cv-content" class="document">
          <header class="document-meta"><span>{{ t("Curriculum vitæ") }}</span><span>Thomas Leterme · {{ locale.toUpperCase() }}</span></header>
          <section id="profil" class="profile-section">
            <div class="profile-heading"><div><h1>Thomas<br />Leterme</h1><h2>{{ t("Développeur full-stack") }}</h2><p class="profile-location">{{ t("Bordeaux, France") }}</p><p class="current-employer"><span class="employment-status">{{ t("En poste chez") }}</span> <a :href="currentEmployer.url" target="_blank" rel="noreferrer">{{ currentEmployer.name }}</a></p></div><div class="profile-photo"><img src="/thomas.jpeg" :alt="t('Portrait de Thomas Leterme')" width="1536" height="2048" fetchpriority="high" /></div></div>
            <p class="profile-description">{{ t("Développement logiciel, architecture et encadrement technique. En Master of Science à Epitech, spécialité Cloud & Cybersécurité, préparation du titre RNCP niveau 7 d’architecte des systèmes d’information.") }}</p>
            <div class="profile-links"><a href="mailto:thomas.pro.leterme@gmail.com"><CvIcon name="mail" :size="18" /> Email</a><a href="https://www.linkedin.com/in/thomas-leterme" target="_blank" rel="noreferrer"><CvIcon name="linkedin" :size="18" /> LinkedIn</a><a href="https://github.com/Bxota" target="_blank" rel="noreferrer"><CvIcon name="github" :size="18" /> GitHub</a></div>
          </section>

          <section id="parcours" class="document-section">
            <div class="section-heading"><span>01</span><h2>{{ t("Expériences professionnelles") }}</h2></div>
            <div v-if="selectedSkill" class="filter-notice" role="status"><span><strong>{{ t(selectedSkill) }}</strong> · {{ matchedIds?.length }} {{ t("poste(s) associé(s)") }}</span><button @click="selectedSkill = ''">{{ t("Tout afficher") }} <CvIcon name="close" :size="16" /></button></div>
            <ExperienceList :groups="visibleEmployers" :matched-ids="matchedIds" @open="openExperience" />
            <p class="source-note">{{ t("¹ Le PDF source date de février 2026. La fin de l’expérience Yunohit et le poste chez OVHcloud ont été actualisés en septembre 2026.") }}</p>
          </section>

          <section id="projets" class="document-section">
            <div class="section-heading"><span>02</span><h2>{{ t("Projets personnels & scolaires") }}</h2></div>
            <ProjectBrowser @open="openIndependent" />
          </section>

          <section id="competences" class="document-section">
            <div class="section-heading"><span>03</span><h2>{{ t("Compétences") }}</h2></div>
            <div class="skill-groups"><div v-for="group in sourcedSkillGroups" :key="group.name" class="skill-group"><h3>{{ t(group.name) }}</h3><div class="skill-items"><template v-for="skill in group.items" :key="skill"><button v-if="relatedCount(skill)" :aria-label="`${t(skill)} : ${relatedCount(skill)} sources`" :aria-pressed="evidenceSkill === skill" @click="openEvidence(skill)">{{ t(skill) }}<CvIcon name="up-right" :size="13" /></button><span v-else>{{ t(skill) }}</span></template></div></div></div>
            <div v-if="evidenceSkill" id="skill-evidence" class="skill-evidence" role="region" :aria-label="t('Sources pour {skill}', { skill: t(evidenceSkill) })"><header><h3>{{ t(evidenceSkill) }}</h3><button :aria-label="t('Fermer les sources')" @click="evidenceSkill = ''"><CvIcon name="close" :size="18" /></button></header><ul><li v-for="source in skillSources(evidenceSkill)" :key="source.kind + source.id"><button v-if="source.kind === 'experience'" @click="openExperience(experiences.find(item => item.id === source.id)!)">{{ source.kind === 'experience' ? t(experiences.find(item => item.id === source.id)!.company) + ' · ' + t(experiences.find(item => item.id === source.id)!.role) : t(source.label) }}<CvIcon name="arrow" :size="16" /></button><button v-else-if="source.kind === 'project'" @click="openIndependent(independentProjects.find(item => item.id === source.id)!)">{{ t(source.label) }}<CvIcon name="arrow" :size="16" /></button><a v-else href="/CV.pdf" target="_blank" rel="noreferrer">{{ t(source.label) }}<CvIcon name="up-right" :size="16" /></a><p>{{ t(source.note) }}</p></li></ul><button v-if="experiences.some(item => matchesSkill(item, evidenceSkill))" class="text-link" @click="filterBySkill(evidenceSkill)">{{ t("Filtrer les expériences") }} <CvIcon name="arrow" :size="16" /></button></div>
            <p class="source-note">{{ t("Sources : CV, informations professionnelles actualisées en septembre 2026 et dépôts publics vérifiés le 31 août 2026. Une technologie présente dans un dépôt ne définit pas un niveau de maîtrise.") }}</p>
            <div class="languages"><h3>{{ t("Langues") }}</h3><p>{{ t("Français") }} <span>{{ t("Natif") }}</span></p><p>{{ t("Anglais") }} <span>{{ t("Professionnel · B2") }}</span></p><p>{{ t("Créole réunionnais") }} <span>{{ t("Notions") }}</span></p></div>
          </section>

          <section id="formation" class="document-section">
            <div class="section-heading"><span>04</span><h2>{{ t("Formation") }}</h2></div>
            <div class="education-list"><details v-for="(item, index) in education" :key="item.school" class="education-item"><summary><img :src="index === 0 ? '/img/epitech.png' : '/img/ecole89.webp'" :alt="`Logo ${item.school}`" loading="lazy" /><span><strong>{{ item.school }} <small>{{ item.years }}</small></strong><span>{{ t(item.title) }}</span><span class="education-city">{{ item.city }}</span></span><CvIcon name="plus" /></summary><div class="education-details"><p>{{ t(item.detail) }}</p><p v-if="item.note">{{ t(item.note) }}</p><button class="text-link" @click="navigateSection('projets')">{{ t("Projets d’école") }} <CvIcon name="arrow" :size="16" /></button></div></details></div>
            <article class="expedition"><header><img src="/img/epitech.png" alt="Epitech" loading="lazy" /><div><h3>Learning Expedition</h3><p>{{ t("Cotonou, Bénin · 8 — 14 février 2026") }}</p></div></header><p>{{ t("Échanges avec les étudiants d’Epitech, visites de l’ASIN et de Sèmè City (SCOP), rencontres chez MTN et Concentrix.") }}</p><TravelGallery /></article>
          </section>

          <section id="certifications" class="document-section">
            <div class="section-heading"><span>05</span><h2>{{ t("Certifications") }}</h2></div>
            <div class="certificate-provider"><img src="/img/hacker_rank.png" alt="Logo HackerRank" loading="lazy" /><h3>HackerRank</h3><span>{{ t("6 certificats · décembre 2024") }}</span></div>
            <div class="certificate-grid"><button v-for="cert in certifications" :key="cert.id" class="certificate-card" @click="openCertificate(cert.id)" :aria-label="t('Voir le certificat {name} {level}', { name: cert.name, level: cert.level })"><img :src="certificateImage(cert.file)" :alt="t('Certificat {name} {level} de Thomas Leterme', { name: cert.name, level: cert.level })" width="1000" height="762" loading="lazy" /><span class="certificate-label"><span><strong>{{ cert.name }}</strong><span>{{ cert.level || t('Certification professionnelle') }}</span></span><CvIcon name="up-right" :size="19" /></span></button></div>
            <div class="other-certificates"><p><strong>Voltaire</strong><span>{{ t("Niveau Affaires · score 784") }}</span></p><p><strong>TOEIC</strong><span>{{ t("700 · en cours dans le CV source") }}</span></p></div>
          </section>

          <section id="contact" class="document-section contact-section"><div class="section-heading"><span>06</span><h2>{{ t("Coordonnées") }}</h2></div><dl><div><dt><CvIcon name="mail" :size="17" /> Email</dt><dd><a href="mailto:thomas.pro.leterme@gmail.com">{{ t("thomas.pro.leterme@gmail.com") }}</a></dd></div><div><dt><CvIcon name="linkedin" :size="17" /> LinkedIn</dt><dd><a href="https://www.linkedin.com/in/thomas-leterme" target="_blank" rel="noreferrer">{{ t("thomas-leterme") }} <CvIcon name="up-right" :size="16" /></a></dd></div><div><dt><CvIcon name="github" :size="17" /> GitHub</dt><dd><a href="https://github.com/Bxota" target="_blank" rel="noreferrer">{{ t("Bxota") }} <CvIcon name="up-right" :size="16" /></a></dd></div></dl><div class="interests"><h3>{{ t("Centres d’intérêt") }}</h3><p>{{ t("Technologies, finance, sport, automobile, jeux vidéo et horlogerie.") }}</p></div></section>
          <footer class="document-footer"><a href="/CV.pdf" download="CV-Thomas-Leterme.pdf"><CvIcon name="download" :size="17" /> {{ t("CV PDF (FR)") }}</a><span>{{ t("OVHcloud est une marque d’OVH SAS.") }}</span><button @click="navigateSection('profil')">{{ t("Haut de page ↑") }}</button></footer>
        </main>
      </div>
    </div>

    <dialog ref="dialog" class="detail-dialog" :class="{ 'mobile-dialog': mobilePreview, 'certificate-dialog': selectedCertificate, 'experience-dialog': selectedExperience }" aria-labelledby="detail-title" @keydown="trapDialogFocus" @cancel.prevent="closeDetails" @click="event => { if (event.target === dialog) closeDetails() }">
      <div v-if="isDetailOpen" class="detail-surface">
        <header class="detail-toolbar"><div class="detail-breadcrumb"><button @click="closeDetails">CV</button><span>/</span><template v-if="selectedExperience"><button v-if="selectedProject" @click="openExperience(selectedExperience)">{{ t(selectedExperience.company) }}</button><span v-else>{{ t(selectedExperience.company) }}</span></template><span v-else>{{ t(selectedCertificate ? 'Certifications' : 'Projets') }}</span></div><div class="language-switch" role="group" aria-label="Language / Langue"><button lang="fr" :aria-pressed="locale === 'fr'" aria-label="Français" @click="setLanguage('fr')">{{ t("FR") }}</button><button lang="en" :aria-pressed="locale === 'en'" aria-label="English" @click="setLanguage('en')">{{ t("EN") }}</button></div><button class="close-detail" :aria-label="t('Fermer les détails')" @click="closeDetails"><CvIcon name="close" /></button></header>
        <ExperiencePages v-if="selectedExperience" :experience="selectedExperience" :project="selectedProject" @project="openProject(selectedExperience!, $event)" @role="openExperience" />
        <div v-else ref="detailBody" class="detail-body"><article :key="articleKey" class="detail-article">
          <template v-if="selectedCertificate"><p class="detail-eyebrow">HackerRank</p><h2 id="detail-title" ref="detailHeading" tabindex="-1">{{ selectedCertificate.name }}<span v-if="selectedCertificate.level"> · {{ selectedCertificate.level }}</span></h2><p class="detail-subtitle">{{ t("Obtenu le") }} {{ t(selectedCertificate.date) }}</p><img class="certificate-full" :src="certificateImage(selectedCertificate.file)" :alt="t('Certificat {name} {level} de Thomas Leterme', { name: selectedCertificate.name, level: selectedCertificate.level })" /><a class="pdf-link" :href="certificatePdf(selectedCertificate.file)" target="_blank" rel="noreferrer"><CvIcon name="download" /> {{ t("Ouvrir le certificat PDF") }}</a><p class="source-note">{{ t("Identifiant :") }} {{ selectedCertificate.id }}</p></template>
          <template v-else-if="selectedIndependent"><p class="detail-eyebrow">{{ t(selectedIndependent.context === 'École' ? 'Projet d’école' : 'Projet personnel') }}</p><h2 id="detail-title" ref="detailHeading" tabindex="-1">{{ t(selectedIndependent.title) }}</h2><p v-if="selectedIndependent.school" class="detail-subtitle">{{ selectedIndependent.school }}</p><section class="detail-section"><h3>{{ t('Description') }}</h3><p>{{ t(selectedIndependent.description) }}</p></section><section class="detail-section"><h3>{{ t('Technologies') }}</h3><div class="detail-technologies"><span v-for="tech in selectedIndependent.technologies" :key="tech">{{ t(tech) }}</span></div></section><a v-if="selectedIndependent.url" class="pdf-link" :href="selectedIndependent.url" target="_blank" rel="noreferrer"><CvIcon name="github" /> {{ t("Consulter le dépôt") }} <CvIcon name="up-right" /></a><p v-if="selectedIndependent.evidence" class="source-note detail-proof">{{ t(selectedIndependent.evidence) }} · {{ t('Vérifié le 31 août 2026.') }}<a v-if="selectedIndependent.evidenceUrl" :href="selectedIndependent.evidenceUrl" target="_blank" rel="noreferrer"> {{ t("Lire le README") }} <CvIcon name="up-right" :size="14" /></a></p></template>
        </article></div>
      </div>
    </dialog>
  </div>
</template>
