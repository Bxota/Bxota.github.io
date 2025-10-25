import { ECOLE89_TOPIC, EPITECH_TOPIC, ORISHA_TOPIC, PORTFOLIO_TOPIC } from '~/constants/topics';
import type { PortfolioRepository } from '~/types/portfolio';

export interface PortfolioWorkProject extends PortfolioRepository {
  imagePath: string;
  imageAlt: string;
}

const sharedTopics = [PORTFOLIO_TOPIC] as const;

export const workProjects: PortfolioWorkProject[] = [
  {
    name: 'Healthcare Billing Engine',
    html_url: '',
    description: 'Cloud-based billing platform for healthcare professionals in France.',
    topics: [...sharedTopics, ORISHA_TOPIC],
    updated_at: '2024-01-05T00:00:00Z',
    pushed_at: '',
    imagePath: '/img/orisha.png',
    imageAlt: 'Orisha logo'
  },
  {
    name: 'Smart Card Engine',
    html_url: '',
    description: 'Cross-platform engine to read health cards and manage secure devices.',
    topics: [...sharedTopics, ORISHA_TOPIC],
    updated_at: '2023-09-12T00:00:00Z',
    pushed_at: '',
    imagePath: '/img/orisha.png',
    imageAlt: 'Orisha logo'
  },
  {
    name: 'FSE Dispatch',
    html_url: '',
    description: 'Automation tool for executing processes and API commands.',
    topics: [...sharedTopics, ORISHA_TOPIC],
    updated_at: '2022-03-18T00:00:00Z',
    pushed_at: '',
    imagePath: '/img/orisha.png',
    imageAlt: 'Orisha logo'
  },
  {
    name: 'PyxCloud',
    html_url: '',
    description: 'Web-based billing platform with tenant and instance management.',
    topics: [...sharedTopics, ORISHA_TOPIC],
    updated_at: '2021-10-01T00:00:00Z',
    pushed_at: '',
    imagePath: '/img/orisha.png',
    imageAlt: 'Orisha logo'
  },
  {
    name: 'File Manager',
    html_url: '',
    description: 'Cloud file management tool for listing, editing, and organising files.',
    topics: [...sharedTopics, ORISHA_TOPIC],
    updated_at: '2018-11-09T00:00:00Z',
    pushed_at: '',
    imagePath: '/img/orisha.png',
    imageAlt: 'Orisha logo'
  },
];
