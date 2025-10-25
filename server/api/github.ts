import { createError } from 'h3';
import { PORTFOLIO_TOPIC } from '~/constants/topics';
import type { PortfolioRepository } from '~/types/portfolio';

const GITHUB_USERNAME = 'Bxota';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`;

interface GitHubApiRepo {
  name: string;
  html_url: string;
  description: string | null;
  topics?: string[];
  updated_at: string;
  pushed_at: string;
}

// Fetch repositories from GitHub, keep only those tagged for the portfolio, and expose a lean payload.
export default defineEventHandler(async () => {
  const runtimeConfig = useRuntimeConfig();

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.mercy-preview+json',
    'User-Agent': `${GITHUB_USERNAME}-portfolio`
  };

  if (runtimeConfig.githubToken && runtimeConfig.githubToken.trim().length > 0) {
    headers.Authorization = `token ${runtimeConfig.githubToken}`;
  }

  try {
    const repositories = await $fetch<GitHubApiRepo[]>(GITHUB_API_URL, { headers });

    return repositories
      .filter((repo) => Array.isArray(repo.topics) && repo.topics.includes(PORTFOLIO_TOPIC))
      .map<PortfolioRepository>((repo) => ({
        name: repo.name,
        html_url: repo.html_url,
        description: repo.description ?? '',
        topics: repo.topics ?? [],
        updated_at: repo.updated_at,
        pushed_at: repo.pushed_at
      }))
      .sort(
        (left, right) =>
          new Date(right.pushed_at).getTime() - new Date(left.pushed_at).getTime()
      );
  } catch (error) {
    console.error('Failed to fetch GitHub repositories', error);

    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to load GitHub repositories from GitHub.'
    });
  }
});
