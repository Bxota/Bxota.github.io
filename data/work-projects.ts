export interface WorkProjectLink {
  label: string;
  url: string;
}

export interface WorkProjectRepository {
  owner: string;
  repo: string;
}

export interface WorkProject {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  cover: string;
  coverAlt: string;
  coverMode?: 'default' | 'contain' | 'group';
  coverGroup?: { src: string; alt: string }[];
  tags: string[];
  context?: string;
  role?: string;
  timeline?: string;
  contributions?: string[];
  links?: WorkProjectLink[];
  github?: WorkProjectRepository;
}

export const workProjects: WorkProject[] = [
  {
    slug: 'time-manager',
    title: 'Time Manager',
    shortDescription: 'Academic project to manage employee check-ins and check-outs.',
    longDescription:
      'Web platform designed to help HR teams monitor daily clock-ins and clock-outs. '
      + 'The focus was a mobile-first experience that centralises attendance data in real time and generates weekly insights for managers.',
    cover: '/img/epitech.png',
    coverAlt: 'Epitech logo',
    coverMode: 'contain',
    tags: ['Python - Django', 'React'],
    context: 'Academic project at Epitech',
    role: 'Backend & frontend lead',
    contributions: [
      'Modelled the data layer and business rules in Django.',
      'Built the HR back-office and the public API consumed by the mobile client.',
      'Developed the React interface and the authentication flow.',
    ],
  },
  {
    slug: 'follow-up-vaccination',
    title: 'Follow-up Vaccination',
    shortDescription:
      'Optimising influenza vaccination strategy by predicting demand and improving access to care.',
    longDescription:
      'Proof-of-concept delivered during a 48-hour hackathon dedicated to influenza vaccination. '
      + 'The prototype aggregated public datasets to estimate demand, recommend vaccination areas, and provide a tactical dashboard to field teams.',
    cover: '/img/elysee.png',
    coverAlt: 'Epitech and French Presidency logos',
    coverMode: 'group',
    coverGroup: [
      {
        src: '/img/epitech.png',
        alt: 'Epitech',
      },
      {
        src: '/img/elysee.png',
        alt: 'French Presidency',
      },
    ],
    tags: ['Python - Django', 'React', 'Hackathon'],
    context: 'Epitech x French Presidency hackathon',
    role: 'Full-stack developer',
    contributions: [
      'Aggregated multiple public datasets and computed actionable indicators.',
      'Delivered a Django API to power the React dashboard in under 48 hours.',
      'Designed dashboard screens and an interactive map to visualise recommendations.',
    ],
    github: {
      owner: 'Bxota',
      repo: 'T-HAK-700',
    },
    links: [
      {
        label: 'View on GitHub',
        url: 'https://github.com/Bxota/T-HAK-700',
      },
    ],
  },
  {
    slug: 'minecraft-mod-server',
    title: 'Hardcore Minecraft Mod',
    shortDescription:
      'A Minecraft mod that switches every player to spectator mode when someone dies.',
    longDescription:
      'Gameplay mod enforcing a shared-lives hardcore experience. All players are moved to spectator mode whenever one teammate is defeated, keeping the stakes high for collaborative runs.',
    cover: '/img/github.png',
    coverAlt: 'GitHub logo',
    coverMode: 'contain',
    tags: ['Java', 'Minecraft', 'Forge'],
    context: 'Community Minecraft mod',
    role: 'Developer',
    contributions: [
      'Hooked into Forge events to monitor player deaths in real time.',
      'Implemented global state coordination to ensure consistent spectator toggling.',
      'Added configuration hooks so streamers can tune challenge rules.',
    ],
    github: {
      owner: 'Bxota',
      repo: 'minecraft-mod-hardcore-server',
    },
    links: [
      {
        label: 'View on GitHub',
        url: 'https://github.com/Bxota/minecraft-mod-hardcore-server',
      },
    ],
  },
  {
    slug: 'healthcare-billing-engine',
    title: 'Healthcare Billing Engine',
    shortDescription: 'Cloud-based billing platform for healthcare professionals in France.',
    longDescription:
      'SaaS billing solution aimed at French healthcare professionals. '
      + 'It handles the full Sesam-Vitale billing chain, integrates with national insurance systems, and synchronises with practice management software.',
    cover: '/img/orisha.png',
    coverAlt: 'Orisha logo',
    tags: ['ASP.NET', 'VB.NET', 'C#', 'SQL', 'Oracle', 'REST', 'SOAP', 'Docker'],
    context: 'Orisha Healthcare',
    role: 'Backend lead developer',
    contributions: [
      'Re-architected legacy SOAP services into a containerised REST platform.',
      'Optimised batch processing and reduced billing turnaround by 30%.',
      'Led the Oracle database migration towards a multi-tenant ready structure.',
    ],
  },
  {
    slug: 'smart-card-engine',
    title: 'Smart Card Engine',
    shortDescription: 'Cross-platform engine to read health cards and manage secure devices.',
    longDescription:
      'Cross-platform engine orchestrating communication with Sesam-Vitale smart cards and secure readers. '
      + 'Provides a unified API for desktop and web applications that require advanced cryptographic operations.',
    cover: '/img/orisha.png',
    coverAlt: 'Orisha logo',
    tags: ['Go', 'Vue.js', 'TypeScript', 'Wails', 'API', 'Cross-Platform'],
    context: 'Orisha Healthcare',
    role: 'Tech lead',
    contributions: [
      'Implemented the Go core interfacing with PC/SC and secure card readers.',
      'Built a Wails bridge to expose capabilities to front-end applications.',
      'Set up an integration test suite running against physical smart cards.',
    ],
  },
  {
    slug: 'fse-dispatch',
    title: 'FSE Dispatch',
    shortDescription: 'Automation tool for executing processes and API commands.',
    longDescription:
      'Automation service orchestrating sequences of commands and API requests tied to third-party billing. '
      + 'The tool provides workflow management, real-time logging, and resilient recovery mechanisms.',
    cover: '/img/orisha.png',
    coverAlt: 'Orisha logo',
    tags: ['Go', 'REST API', 'Logger', 'Automation', 'Error Handling'],
    context: 'Orisha Healthcare',
    role: 'Backend engineer',
    contributions: [
      'Designed the concurrent execution engine and the queue system.',
      'Implemented a rule engine configurable by support teams.',
      'Added a real-time logging pipeline with severity levels.',
    ],
  },
  {
    slug: 'pyxcloud',
    title: 'PyxCloud',
    shortDescription: 'Web-based billing platform with tenant and instance management.',
    longDescription:
      'Cloud billing platform with multi-tenant features for practices, facilities, and environments. '
      + 'Includes a Kubernetes orchestration layer that automates onboarding for new customers.',
    cover: '/img/orisha.png',
    coverAlt: 'Orisha logo',
    tags: ['PHP', 'Symfony', 'PostgreSQL', 'Vue.js', 'Kubernetes', 'Filtering Engine'],
    context: 'Orisha Healthcare',
    role: 'Full-stack developer',
    contributions: [
      'Developed multi-tenant administration modules in Symfony.',
      'Designed the advanced filtering engine for accounting entries.',
      'Automated Kubernetes deployments through GitLab CI.',
    ],
  },
  {
    slug: 'terminal',
    title: 'Terminal',
    shortDescription: 'A simple terminal emulator built to explore Rust fundamentals.',
    longDescription:
      'Minimalist terminal emulator created in Rust to explore ownership, performance, and CLI tooling. '
      + 'It now serves as a sandbox for experiments such as scripting, syntax highlighting, and layout management.',
    cover: '/img/github.png',
    coverAlt: 'GitHub logo',
    tags: ['Rust', 'CLI', 'Personal Project'],
    context: 'Open-source personal project',
    role: 'Author',
    contributions: [
      'Implemented the termion-based rendering engine and raw input handling.',
      'Built an extensible command system to prototype new ideas.',
      'Documented contributor workflows and project guidelines.',
    ],
    github: {
      owner: 'Bxota',
      repo: 'terminal',
    },
    links: [
      {
        label: 'View on GitHub',
        url: 'https://github.com/Bxota/terminal',
      },
    ],
  },
  {
    slug: 'movie-show-tracker',
    title: 'Movie Show Tracker',
    shortDescription: 'Android app to track movies and shows, inspired by Letterboxd.',
    longDescription:
      'Native Android application built to keep track of favourite movies and shows. '
      + 'Relies on the IMDB API to retrieve media information and offers collaborative lists.',
    cover: '/img/github.png',
    coverAlt: 'GitHub logo',
    tags: ['Kotlin', 'Android', 'IMDB API', 'Watchlist'],
    context: 'Personal project',
    role: 'Author',
    contributions: [
      'Implemented an MVVM architecture with coroutines and Flow for network calls.',
      'Set up local caching with Room and a deferred synchronisation strategy.',
      'Built a Material Design interface with custom animations.',
    ],
  },
  {
    slug: 'file-manager',
    title: 'File Manager',
    shortDescription: 'Cloud file management tool for listing, editing, and organising files.',
    longDescription:
      'Cloud document management tool used internally to work with large files. '
      + 'Combines a REST API and a rich Vue.js interface to edit, preview, and organise collaborative content.',
    cover: '/img/orisha.png',
    coverAlt: 'Orisha logo',
    tags: ['PHP', 'Vue.js', 'Kubernetes', 'REST API'],
    context: 'Orisha Healthcare',
    role: 'Full-stack developer',
    contributions: [
      'Developed secured REST endpoints and the permission system.',
      'Integrated file preview features (PDF, images, CSV) on the front end.',
      'Automated Kubernetes deployments and managed object storage at scale.',
    ],
  },
];

export const findWorkProject = (slug: string): WorkProject | undefined =>
  workProjects.find((project) => project.slug === slug);
