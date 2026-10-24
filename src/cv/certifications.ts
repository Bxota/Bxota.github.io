export type Certification = { name: string; level: string; provider: string; date: string; file: string; id: string; verificationUrl?: string; detail?: string }
export const awsCertification: Certification = {
  name: 'AWS Academy Graduate – Cloud Architecting',
  level: 'Training Badge',
  provider: 'AWS Academy',
  date: '18 octobre 2026',
  file: 'AWS_Academy_Cloud_Architecting',
  id: 'aws-academy-cloud-architecting',
  verificationUrl: 'https://www.credly.com/go/aOq39UTC',
  detail: 'Formation de 60 heures',
}

export const awsSecurityCertification: Certification = {
  name: 'AWS Academy Graduate – Cloud Security Foundations',
  level: 'Training Badge',
  provider: 'AWS Academy',
  date: '24 octobre 2026',
  file: 'AWS_Academy_Cloud_Security_Foundations',
  id: 'aws-academy-cloud-security-foundations',
  verificationUrl: 'https://www.credly.com/go/TEUV41Xf',
  detail: 'Formation de 20 heures',
}

export const certificationProviders = [
  { name: 'AWS Academy', summary: '2 badges · octobre 2026', logo: '' },
  { name: 'HackerRank', summary: '6 certificats · décembre 2024', logo: '/img/hacker_rank.png' },
]

export const certifications: Certification[] = [
  awsSecurityCertification,
  awsCertification,
  { name: 'Software Engineer', provider: 'HackerRank', level: '', date: '22 décembre 2024', file: 'Software_Engineer_Certificate', id: 'A8D347866351' },
  { name: 'Problem Solving', provider: 'HackerRank', level: 'Basic', date: '22 décembre 2024', file: 'problem_solving_basic_certificate', id: 'DDDE983B4DC6' },
  { name: 'C#', provider: 'HackerRank', level: 'Basic', date: '21 décembre 2024', file: 'C_Sharp_Basic_Certificate', id: 'ACE146E41EC4' },
  { name: 'Go', provider: 'HackerRank', level: 'Basic', date: '22 décembre 2024', file: 'Golang_Basic_Certificate', id: '6B861701E751' },
  { name: 'SQL', provider: 'HackerRank', level: 'Intermediate', date: '21 décembre 2024', file: 'SQL Intermediate_Certificate', id: '2B657CD18A51' },
  { name: 'SQL', provider: 'HackerRank', level: 'Basic', date: '21 décembre 2024', file: 'SQL_Basic_Certificate', id: '2B6B1546AA6C' },
]
