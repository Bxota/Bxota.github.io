import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      certificates: 'Certificates'
    },
    about: {
      title: 'About Me',
      description: "I'm a Lead Developer graduating with a degree in Application Design and Development (Level 6 RNCP), I have gained a solid expertise in software development through my studies and professional experiences."
    },
    skills: {
      title: 'Skills',
      languages: 'Programming Languages',
      frameworks: 'Frameworks',
      tools: 'Tools & Services'
    },
    projects: {
      title: 'Projects',
      viewProject: 'View Project'
    },
    certificates: {
      title: 'Certificates'
    }
  },
  fr: {
    nav: {
      about: 'À propos',
      skills: 'Compétences',
      projects: 'Projets',
      certificates: 'Certificats'
    },
    about: {
      title: 'À propos de moi',
      description: 'Je suis un développeur passionné spécialisé dans la création d\'applications web modernes. J\'aime créer des solutions élégantes à des problèmes complexes.'
    },
    skills: {
      title: 'Compétences',
      languages: 'Langages de programmation',
      frameworks: 'Frameworks',
      tools: 'Outils & Services'
    },
    projects: {
      title: 'Projets',
      viewProject: 'Voir le projet'
    },
    certificates: {
      title: 'Certificats'
    }
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'en',
  messages
})