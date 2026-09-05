// Source : CV français fourni le 31 août 2026, daté du 20 février 2026.
// Les schémas de projets sont indicatifs et restent à valider.
export type Project = {
  id: string
  title: string
  category: string
  description: string
  steps: [string, string, string]
  result: string
  technologies: string[]
}

export type Experience = {
  id: string
  company: string
  initials: string
  role: string
  period: string
  years: string
  location: string
  type: string
  summary: string
  missions: string[]
  technologies: string[]
  metric: string
  metricLabel: string
  projects: Project[]
}

export const experiences: Experience[] = [
  {
    id: 'ovhcloud', company: 'OVHcloud', initials: 'OVH', role: 'Développeur logiciel',
    period: '1er sept. 2026 — en cours', years: '2026 — …', location: '', type: 'Développement logiciel',
    summary: 'Développement logiciel en Go et Perl au sein de l’équipe Public Cloud Integration.',
    missions: ['Développement logiciel au sein de l’équipe Public Cloud Integration.', 'Développement en Go et Perl.'],
    technologies: ['Go', 'Perl'], metric: 'Go · Perl', metricLabel: 'langages utilisés',
    projects: [],
  },
  {
    id: 'yunohit', company: 'Yunohit', initials: 'Yu', role: 'Développeur Python',
    period: 'Sept. 2025 — 31 août 2026¹', years: '2025 — 2026', location: 'Bordeaux', type: 'Alternance',
    summary: 'Fonctionnalités DMP et microservices Python dans un contexte réglementaire de santé.',
    missions: ['Développement de fonctionnalités pour un agrément réglementaire.', 'Compréhension et implémentation du cahier des charges du DMP.', 'Création de microservices répondant à des besoins techniques.'],
    technologies: ['Python', 'Microservices'], metric: 'DMP', metricLabel: 'interopérabilité en santé',
    projects: [{ id: 'dmp', title: 'Connecter le logiciel au DMP', category: 'Interopérabilité · Santé',
      description: 'Compréhension et implémentation du cahier des charges du Dossier médical partagé (DMP). Développement de fonctionnalités et de microservices dans le cadre d’une démarche d’agrément réglementaire.',
      steps: ['Cahier des charges', 'Services Python', 'Fonctionnalités DMP'],
      result: 'Développement de fonctionnalités contribuant à la démarche d’agrément réglementaire.', technologies: ['Python', 'Microservices'] }],
  },
  {
    id: 'freelance', company: 'Indépendant', initials: 'TL', role: 'Développeur web freelance',
    period: 'Mars 2025 — sept. 2025', years: '2025', location: 'Paris · à distance', type: 'Freelance',
    summary: 'Création de sites web pour des TPE et PME et suivi du développement.',
    missions: ['Création de sites web pour des TPE et PME.', 'Élaboration de plans marketing.', 'Supervision complète du processus de développement.', 'Amélioration d’un site portfolio.'],
    technologies: ['Web', 'Produit'], metric: 'A → Z', metricLabel: 'de l’idée à la réalisation',
    projects: [{ id: 'sites', title: 'Une présence web pour les TPE / PME', category: 'Web · Produit',
      description: 'Création de sites web, élaboration de plans marketing et supervision du processus de développement durant la période de mars à septembre 2025.',
      steps: ['Besoin client', 'Conception du site', 'Livraison'], result: 'Création de sites et accompagnement du processus de développement.', technologies: ['Web', 'Produit'] }],
  },
  {
    id: 'orisha-lead', company: 'Orisha Health & Safety', initials: 'O', role: 'Lead Developer',
    period: 'Juin 2023 — févr. 2025', years: '2023 — 2025', location: 'Paris', type: 'Équipe technique',
    summary: 'Encadrement de 5 développeurs, suivi de roadmap, revue de code et arbitrages d’architecture.',
    missions: ['Planification et répartition des tâches : équipe de 5 développeurs, 350 tickets par an.', 'Suivi de roadmap et arbitrages techniques.', 'Revue de code et renforcement de la sécurité.', 'Réduction de 50 % du temps de déploiement grâce au CI/CD.', 'Conception de schémas d’architecture et décisions de scalabilité et de maintenabilité.'],
    technologies: ['CI/CD', 'Architecture', 'Leadership'], metric: '−50 %', metricLabel: 'de temps de déploiement',
    projects: [{ id: 'cicd', title: 'Automatisation des déploiements', category: 'Industrialisation · CI/CD',
      description: 'Amélioration du processus de déploiement grâce au CI/CD, dans le cadre des responsabilités de Lead Developer chez Orisha Health & Safety.',
      steps: ['Code', 'Pipeline CI/CD', 'Déploiement'], result: 'Réduction de 50 % du temps de déploiement grâce au CI/CD.', technologies: ['CI/CD', 'Architecture'] },
    { id: 'leadership', title: 'Organiser une équipe de développement', category: 'Leadership · Organisation',
      description: 'Planification et répartition des tâches au sein d’une équipe de cinq développeurs. Suivi de roadmap, arbitrages techniques, revue de code et renforcement de la sécurité.',
      steps: ['Roadmap', 'Équipe de 5 devs', 'Livraisons'], result: 'Planification et répartition d’environ 350 tickets par an pour 5 développeurs.', technologies: ['Leadership', 'Architecture'] }],
  },
  {
    id: 'orisha-dev', company: 'Orisha Health & Safety', initials: 'O', role: 'Software Developer',
    period: 'Oct. 2022 — mai 2023', years: '2022 — 2023', location: 'Paris', type: 'Développement logiciel',
    summary: 'API REST, microservices Python, migration de données et lecteur de cartes en Go et Vue.js.',
    missions: ['Mise en place d’une API REST en VB et C# avec 35 ressources.', 'Développement de microservices en Python.', 'Migration Oracle vers PostgreSQL : plus de 35 tables.', 'Développement d’un lecteur de cartes en Go et Vue.js, amélioration de vitesse de 20 %.', 'Prise en compte des standards UX/UI.'],
    technologies: ['C#', 'VB', 'Python', 'Go', 'Vue.js', 'PostgreSQL'], metric: '+20 %', metricLabel: 'de vitesse du lecteur de cartes',
    projects: [{ id: 'cards', title: 'Un lecteur de cartes plus rapide', category: 'Logiciel · Performance',
      description: 'Développement d’un lecteur de cartes avec Go et Vue.js, en tenant compte des standards UX/UI. Le CV indique une amélioration de vitesse de 20 %.',
      steps: ['Lecture de carte', 'Traitement Go', 'Interface Vue.js'], result: 'Amélioration de 20 % de la vitesse du lecteur de cartes.', technologies: ['Go', 'Vue.js'] },
    { id: 'migration', title: 'D’Oracle à PostgreSQL', category: 'Données · Migration',
      description: 'Migration d’une base de données Oracle vers PostgreSQL portant sur plus de 35 tables, au sein de l’environnement logiciel d’Orisha Health & Safety.',
      steps: ['Oracle', 'Migration', 'PostgreSQL'], result: 'Migration de plus de 35 tables d’Oracle vers PostgreSQL.', technologies: ['PostgreSQL', 'Oracle', 'SQL'] }],
  },
  {
    id: 'reemo', company: 'Reemo', initials: 'Re', role: 'Développeur full-stack',
    period: 'Sept. 2021 — sept. 2022', years: '2021 — 2022', location: 'Paris', type: 'Alternance',
    summary: 'Scripts de déploiement YAML, publication de packages et utilisation de Kubernetes et Docker.',
    missions: ['Écriture de scripts YAML pour le déploiement automatique de machines.', 'Enregistrement de packages sur Yarn et npm.', 'Première expérience avec Kubernetes et Docker.', 'Contribution à de nombreuses fonctionnalités.'],
    technologies: ['Docker', 'Kubernetes', 'YAML', 'npm'], metric: 'Cloud', metricLabel: 'première expérience des conteneurs',
    projects: [{ id: 'deployment', title: 'Automatiser le déploiement de machines', category: 'Infrastructure · Automatisation',
      description: 'Écriture de scripts YAML pour le déploiement automatique de machines. Première expérience avec Kubernetes et Docker et enregistrement de packages sur Yarn et npm.',
      steps: ['Configuration YAML', 'Automatisation', 'Machines déployées'], result: 'Écriture de scripts YAML pour le déploiement automatique de machines.', technologies: ['YAML', 'Docker', 'Kubernetes'] }],
  },
]

export const skillGroups = [
  { name: 'Développement', items: ['Python', 'C#', 'Go', 'TypeScript', 'SQL', 'PHP', 'VB', 'C/C++', 'Kotlin', 'Swift', 'Rust', 'Flutter'] },
  { name: 'Interfaces & frameworks', items: ['Vue.js', 'React', 'Symfony', 'Django', 'Electron', 'CosmicJS', 'Tailwind', 'Capacitor'] },
  { name: 'Infrastructure & données', items: ['Docker', 'Git', 'Jira', 'GitOps', 'Grafana', 'Proxmox', 'AWS', 'Azure', 'Scaleway', 'OVH', 'PostgreSQL', 'MariaDB', 'Oracle', 'S3'] },
  { name: 'Pratiques', items: ['CI/CD', 'Architecture', 'Leadership', 'Gestion de projet agile', 'Communication', 'Analyse', 'Produit'] },
]

export const education = [
  { school: 'Epitech', city: 'Bordeaux', years: '2025 — 2027', title: 'Master of Science', detail: 'Expert technique en programmation informatique · Titre RNCP niveau 7, architecte des systèmes d’information.', note: 'Spécialité Cloud & Cybersécurité · en cours¹' },
  { school: 'École 89', city: 'Ferrières-en-Brie', years: '2019 — 2022', title: 'Bachelor en programmation informatique', detail: 'Titre RNCP niveau 6, concepteur développeur d’applications.', note: '' },
]

export type EmployerGroup = { id: string; name: string; logo?: string; initials?: string; location: string; period: string; roles: Experience[] }
export const employerGroups: EmployerGroup[] = [
  { id: 'ovhcloud', name: 'OVHcloud', logo: '/ovhcloud.png', location: '', period: 'Depuis le 1er septembre 2026', roles: experiences.filter(item => item.id === 'ovhcloud') },
  { id: 'yunohit', name: 'Yunohit', logo: '/yunohit.png', location: 'Bordeaux', period: 'Septembre 2025 — 31 août 2026¹', roles: experiences.filter(item => item.id === 'yunohit') },
  { id: 'freelance', name: 'Indépendant', logo: '/img/independent.svg', location: 'Paris · à distance', period: 'Mars — septembre 2025', roles: experiences.filter(item => item.id === 'freelance') },
  { id: 'orisha', name: 'Orisha Health & Safety', logo: '/img/orisha.png', location: 'Paris', period: 'Octobre 2022 — février 2025', roles: experiences.filter(item => item.company === 'Orisha Health & Safety') },
  { id: 'reemo', name: 'Reemo', logo: '/img/reemo.svg', location: 'Paris', period: 'Septembre 2021 — septembre 2022', roles: experiences.filter(item => item.id === 'reemo') },
]

export const certifications = [
  { name: 'Software Engineer', level: '', date: '22 décembre 2024', file: 'Software_Engineer_Certificate', id: 'A8D347866351' },
  { name: 'Problem Solving', level: 'Basic', date: '22 décembre 2024', file: 'problem_solving_basic_certificate', id: 'DDDE983B4DC6' },
  { name: 'C#', level: 'Basic', date: '21 décembre 2024', file: 'C_Sharp_Basic_Certificate', id: 'ACE146E41EC4' },
  { name: 'Go', level: 'Basic', date: '22 décembre 2024', file: 'Golang_Basic_Certificate', id: '6B861701E751' },
  { name: 'SQL', level: 'Intermediate', date: '21 décembre 2024', file: 'SQL Intermediate_Certificate', id: '2B657CD18A51' },
  { name: 'SQL', level: 'Basic', date: '21 décembre 2024', file: 'SQL_Basic_Certificate', id: '2B6B1546AA6C' },
]

export type IndependentProject = { id: string; title: string; context: 'Personnel' | 'École'; description: string; technologies: string[]; url?: string; school?: string; evidence?: string; evidenceUrl?: string }
export const independentProjects: IndependentProject[] = [
  { id: 'portfolio', title: 'Portfolio personnel', context: 'Personnel', description: 'Site personnel développé avec Vue et TypeScript. Présentation du profil, des compétences et des dépôts publics via l’API GitHub.', technologies: ['Vue.js', 'TypeScript', 'Vite'], url: 'https://github.com/Bxota/Bxota.github.io' },
  { id: 'cv-web', title: 'CV interactif', context: 'Personnel', description: 'Version web du CV : parcours professionnel, fiches de projets, certifications et consultation sur ordinateur et mobile.', technologies: ['Vue.js', 'TypeScript', 'CSS'], url: 'https://github.com/Bxota/Bxota.github.io' },
  // Métadonnées publiques GitHub vérifiées le 31 août 2026. Sélection, pas inventaire exhaustif.
  { id: 'plants', title: 'Mes Plantes', context: 'Personnel', description: 'Herbier personnel : identification de plantes à partir de photos et conseils d’entretien.', technologies: ['Vue.js', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'], url: 'https://github.com/Bxota/plants', evidence: 'Stack décrite dans le README', evidenceUrl: 'https://github.com/Bxota/plants/blob/main/README.md' },
  { id: 'env-guard', title: 'Env Guard', context: 'Personnel', description: 'Bibliothèque de validation des variables d’environnement au démarrage : types, contraintes et rapport d’erreurs.', technologies: ['Rust'], url: 'https://github.com/Bxota/env-guard', evidence: 'Bibliothèque documentée dans le README', evidenceUrl: 'https://github.com/Bxota/env-guard/blob/main/README.md' },
  { id: 'system-monitor', title: 'System Monitor', context: 'Personnel', description: 'Application de surveillance du processeur, de la mémoire et du réseau.', technologies: ['Rust', 'iced'], url: 'https://github.com/Bxota/System-Monitor', evidence: 'Stack décrite dans le README', evidenceUrl: 'https://github.com/Bxota/System-Monitor/blob/main/README.md' },
  { id: 'terminal', title: 'Terminal en Rust', context: 'Personnel', description: 'Développement d’un terminal en Rust.', technologies: ['Rust'], url: 'https://github.com/Bxota/terminal', evidence: 'Description et langage principal GitHub' },
  { id: 'mail-lab', title: 'Mail Lab', context: 'Personnel', description: 'Exploration des protocoles SMTP, POP3 et IMAP.', technologies: ['Python'], url: 'https://github.com/Bxota/mail-lab', evidence: 'Description et langage principal GitHub' },
  { id: 'amq', title: 'Exploration du protocole AMQ', context: 'Personnel', description: 'Expérimentations autour de la messagerie AMQ.', technologies: ['Python'], url: 'https://github.com/Bxota/amq-protocol', evidence: 'Description et langage principal GitHub' },
  { id: 'currency', title: 'Convertisseur de devises', context: 'Personnel', description: 'Application mobile de conversion de devises.', technologies: ['TypeScript'], url: 'https://github.com/Bxota/currency-converter', evidence: 'Description et langage principal GitHub' },
  { id: 'minecraft', title: 'Minecraft · Hardcore', context: 'Personnel', description: 'Mod de serveur : passage de tous les joueurs en mode spectateur lorsqu’un joueur meurt.', technologies: ['Java'], url: 'https://github.com/Bxota/minecraft-mod-hardcore-server', evidence: 'Description et langage principal GitHub' },
  { id: 'time-manager', title: 'Time Manager', context: 'École', school: 'Epitech', description: 'Projet T-DEV-700 · Gestion du temps.', technologies: ['Python'], url: 'https://github.com/Bxota/T-DEV-700', evidence: 'Sujet Epitech et langage principal GitHub' },
  { id: 'optimisations', title: 'Optimisations algorithmiques', context: 'École', school: 'Epitech', description: 'Projet T_NOC_701 · Optimisations algorithmiques.', technologies: ['Python'], url: 'https://github.com/Bxota/T_NOC_701', evidence: 'Sujet Epitech et langage principal GitHub' },
  { id: 'hackathon', title: 'Hackathon · Élysée', context: 'École', school: 'Epitech', description: 'Projet T-HAK-700 · Hackathon en collaboration avec l’Élysée.', technologies: ['Vue.js'], url: 'https://github.com/Bxota/T-HAK-700', evidence: 'Sujet Epitech et langage principal GitHub' },
  { id: 'movie-show-tracker', title: 'Movie Show Tracker', context: 'École', school: 'École 89', description: 'Application mobile de suivi des films et séries.', technologies: ['Kotlin'], url: 'https://github.com/Bxota/MovieShowTracker', evidence: 'Sujet ecole-89 et langage principal GitHub' },
]

export type TravelPhoto = {
  src: string
  srcset: string
  width: number
  height: number
  caption: string
}
export const cotonouPhotos: TravelPhoto[] = [
  {
    src: '/cv/cotonou/delegation-epitech-450.webp',
    srcset: '/cv/cotonou/delegation-epitech-450.webp 450w',
    width: 450,
    height: 600,
    caption: 'Délégation Epitech à Cotonou',
  },
  {
    src: '/cv/cotonou/visite-asin-960.webp',
    srcset: '/cv/cotonou/visite-asin-480.webp 480w, /cv/cotonou/visite-asin-960.webp 960w, /cv/cotonou/visite-asin-1440.webp 1440w',
    width: 960,
    height: 1280,
    caption: 'Visite de l’ASIN',
  },
  {
    src: '/cv/cotonou/conference-cotonou-960.webp',
    srcset: '/cv/cotonou/conference-cotonou-480.webp 480w, /cv/cotonou/conference-cotonou-960.webp 960w, /cv/cotonou/conference-cotonou-1440.webp 1440w',
    width: 960,
    height: 1280,
    caption: 'Conférence à Cotonou',
  },
  {
    src: '/cv/cotonou/cotonou-coucher-soleil-960.webp',
    srcset: '/cv/cotonou/cotonou-coucher-soleil-480.webp 480w, /cv/cotonou/cotonou-coucher-soleil-960.webp 960w, /cv/cotonou/cotonou-coucher-soleil-1440.webp 1440w',
    width: 960,
    height: 1280,
    caption: 'Cotonou au coucher du soleil',
  },
]
