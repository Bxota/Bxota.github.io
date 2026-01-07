type GitHubUser = {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  location: string | null
  followers: number
  following: number
  public_repos: number
}

type GitHubRepo = {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  language: string | null
  topics?: string[]
  homepage?: string | null
}

export type SpotlightRepo = {
  id: number
  name: string
  url: string
  description: string | null
  stars: number
  language: string | null
  topics: string[]
  homepage?: string | null
}

export type ProfileOverview = {
  username: string
  name: string | null
  avatarUrl: string
  bio: string | null
  location: string | null
  followers: number
  following: number
  publicRepos: number
  repos: SpotlightRepo[]
}

const API_ROOT = 'https://api.github.com'
const token = import.meta.env.VITE_GITHUB_TOKEN

const baseHeaders: HeadersInit = {
  Accept: 'application/vnd.github+json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
}

function resolveUsername(username?: string) {
  return username || import.meta.env.VITE_GITHUB_USERNAME
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_ROOT}${path}`, {
    ...options,
    headers: {
      ...baseHeaders,
      ...(options.headers || {}),
    },
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`GitHub API ${response.status} ${response.statusText}: ${errorBody}`)
  }

  return (await response.json()) as T
}

async function fetchPaginated<T>(pathWithQuery: string): Promise<T[]> {
  let page = 1
  const items: T[] = []

  while (true) {
    const separator = pathWithQuery.includes('?') ? '&' : '?'
    const batch = await request<T[]>(`${pathWithQuery}${separator}per_page=100&page=${page}`)
    items.push(...batch)

    if (batch.length < 100) break
    page += 1
  }

  return items
}

export async function fetchUser(username?: string): Promise<GitHubUser> {
  const target = resolveUsername(username)
  if (!target) throw new Error('Missing GitHub username. Set VITE_GITHUB_USERNAME or pass a username.')

  return request<GitHubUser>(`/users/${encodeURIComponent(target)}`)
}

export async function fetchRepos(
  username?: string,
  { topics = [], sort = 'pushed' }: { topics?: string[]; sort?: string } = {}
): Promise<GitHubRepo[]> {
  const target = resolveUsername(username)
  if (!target) throw new Error('Missing GitHub username. Set VITE_GITHUB_USERNAME or pass a username.')

  const repos = await fetchPaginated<GitHubRepo>(
    `/users/${encodeURIComponent(target)}/repos?type=public&sort=${encodeURIComponent(sort)}`
  )

  if (!topics.length) return repos

  const normalizedTopics = topics.map((topic) => topic.toLowerCase().trim()).filter(Boolean)
  if (!normalizedTopics.length) return repos

  return repos.filter((repo) => {
    const repoTopics = (repo.topics || []).map((topic) => topic.toLowerCase())
    return normalizedTopics.every((topic) => repoTopics.includes(topic))
  })
}

export async function fetchProfileOverview({
  username,
  topics = [],
  repoLimit = Infinity,
}: {
  username?: string
  topics?: string[]
  repoLimit?: number
} = {}): Promise<ProfileOverview> {
  const [user, repos] = await Promise.all([fetchUser(username), fetchRepos(username, { topics })])

  const spotlightRepos: SpotlightRepo[] = repos.slice(0, repoLimit).map((repo) => ({
    id: repo.id,
    name: repo.name,
    url: repo.html_url,
    description: repo.description,
    stars: repo.stargazers_count,
    language: repo.language,
    topics: repo.topics || [],
    homepage: repo.homepage ?? null,
  }))

  return {
    username: user.login,
    name: user.name,
    avatarUrl: user.avatar_url,
    bio: user.bio,
    location: user.location,
    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
    repos: spotlightRepos,
  }
}
