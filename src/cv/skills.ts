import { experiences, independentProjects, skillGroups } from './data'
export type SkillSource = { label: string; kind: 'experience' | 'project' | 'cv'; id: string; note: string }
const normalize = (skill: string) => ({ Vue: 'Vue.js', Golang: 'Go', 'C++': 'C/C++', C: 'C/C++' }[skill] ?? skill)
export function skillSources(skill: string): SkillSource[] {
  const sources: SkillSource[] = []
  experiences.forEach(experience => {
    if ([...experience.technologies, ...experience.projects.flatMap(project => project.technologies)].some(value => normalize(value) === skill)) sources.push({ kind: 'experience', id: experience.id, label: `${experience.company} · ${experience.role}`, note: experience.id === 'ovhcloud' ? 'Expérience professionnelle · mise à jour de septembre 2026' : 'Expérience professionnelle · CV' })
  })
  independentProjects.forEach(project => {
    if (project.technologies.some(value => normalize(value) === skill)) sources.push({ kind: 'project', id: project.id, label: project.title, note: project.evidence ?? 'Code du dépôt local' })
  })
  if (skillGroups.some(group => group.items.includes(skill))) sources.push({ kind: 'cv', id: 'cv', label: 'CV PDF', note: 'Compétence déclarée' })
  return sources
}
const declared = new Set(skillGroups.flatMap(group => group.items))
const extra = [...new Set([...experiences.flatMap(item => [...item.technologies, ...item.projects.flatMap(project => project.technologies)]), ...independentProjects.flatMap(item => item.technologies)].map(normalize))].filter(skill => !declared.has(skill)).sort()
export const sourcedSkillGroups = [...skillGroups, { name: 'Autres technologies documentées', items: extra }]
