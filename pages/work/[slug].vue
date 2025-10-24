<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import { useRoute, useHead, useFetch, createError, useRouter } from '#imports';
import type { UseFetchOptions } from '#app';
import { findWorkProject, type WorkProject } from '~/data/work-projects';

interface GithubRepository {
  html_url: string;
  description: string | null;
  language: string | null;
  pushed_at: string | null;
}

type GithubLanguages = Record<string, number>;

const route = useRoute();
const router = useRouter();

const resolvedProject = computed(() =>
  findWorkProject(route.params.slug as string),
);

if (!resolvedProject.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project not found',
  });
}

const project = computed(() => resolvedProject.value as WorkProject);

useHead({
  title: `${project.value.title} | Work`,
  meta: [
    {
      name: 'description',
      content: project.value.longDescription ?? project.value.shortDescription,
    },
  ],
});

const githubRepo = ref<GithubRepository | null>(null);
const githubRepoError = ref<string | null>(null);
const githubReadmeHtml = ref<string | null>(null);
const githubReadmeError = ref<string | null>(null);
const githubLanguages = ref<string[]>([]);
const githubLanguagesError = ref<string | null>(null);
const githubReadmeContainer = ref<HTMLElement | null>(null);
const githubReadmeDetails = ref<HTMLDetailsElement | null>(null);
const cleanupReadmeAnchors: Array<() => void> = [];
let ignoreNextHashScroll = false;

if (project.value.github) {
  const { owner, repo } = project.value.github;
  const commonHeaders = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  const repoResponse = await fetchGithubResource<GithubRepository>(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: commonHeaders,
      default: () => null,
    },
  );

  if (repoResponse.error) {
    githubRepoError.value = 'Unable to retrieve GitHub repository details right now.';
  } else {
    githubRepo.value = repoResponse.data ?? null;
  }

  const readmeResponse = await fetchGithubResource<string>(
    `https://api.github.com/repos/${owner}/${repo}/readme`,
    {
      headers: {
        ...commonHeaders,
        Accept: 'application/vnd.github.html',
      },
      responseType: 'text',
      default: () => null,
    },
  );

  if (readmeResponse.error) {
    githubReadmeError.value = 'The README is not available right now.';
  } else {
    const rawHtml = readmeResponse.data;
    githubReadmeHtml.value =
      rawHtml !== null && rawHtml !== undefined
        ? rewriteGithubReadmeLinks(rawHtml)
        : null;
  }

  const languagesResponse = await fetchGithubResource<GithubLanguages>(
    `https://api.github.com/repos/${owner}/${repo}/languages`,
    {
      headers: commonHeaders,
      default: () => ({}),
    },
  );

  if (languagesResponse.error) {
    githubLanguagesError.value = 'Unable to retrieve language statistics.';
  } else if (languagesResponse.data) {
    githubLanguages.value = Object.entries(languagesResponse.data)
      .sort(([, bytesA], [, bytesB]) => bytesB - bytesA)
      .map(([language]) => language);
  }
}

const githubLastUpdate = computed(() => {
  if (!githubRepo.value?.pushed_at) {
    return null;
  }

  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(githubRepo.value.pushed_at));
});

const escapeCssIdentifier = (value: string) => {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
    return CSS.escape(value);
  }
  return value.replace(/[^A-Za-z0-9_-]/g, '\\$&');
};

const fetchGithubResource = async <T>(
  url: string,
  options: UseFetchOptions<T> = {},
) => {
  try {
    const { data, error } = await useFetch<T>(url, options);
    if (error.value) {
      return { data: null, error: error.value };
    }
    return { data: data.value ?? null, error: null };
  } catch (fetchError) {
    return { data: null, error: fetchError };
  }
};

const rewriteGithubReadmeLinks = (html: string) => {
  if (!project.value.github) {
    return html;
  }

  const { owner, repo } = project.value.github;
  const baseUrl = `https://github.com/${owner}/${repo}/blob/HEAD/`;

  return html.replace(/href="([^"]+)"/gi, (fullMatch, href) => {
    if (!href) {
      return fullMatch;
    }

    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(href)) {
      return fullMatch;
    }

    if (href.startsWith('/')) {
      return `href="https://github.com${href}"`;
    }

    try {
      const absoluteUrl = new URL(href, baseUrl).toString();
      return `href="${absoluteUrl}"`;
    } catch {
      return fullMatch;
    }
  });
};

const enhanceReadmeAnchors = () => {
  cleanupReadmeAnchors.forEach((fn) => fn());
  cleanupReadmeAnchors.length = 0;

  const container = githubReadmeContainer.value;
  if (!container) {
    return;
  }

  const anchors = container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
  anchors.forEach((anchor) => {
    const handler = (event: Event) => {
      event.preventDefault();
      const rawHash = anchor.getAttribute('href');
      if (!rawHash) {
        return;
      }
      const targetId = decodeURIComponent(rawHash.slice(1));
      if (!targetId) {
        return;
      }

      if (route.hash !== `#${targetId}`) {
        ignoreNextHashScroll = true;
        router.replace({ hash: targetId }).catch(() => {
          ignoreNextHashScroll = false;
        });
      } else {
        ignoreNextHashScroll = false;
      }

      const selector = `[id="${escapeCssIdentifier(targetId)}"]`;
      const target =
        container.querySelector<HTMLElement>(selector) ??
        document.getElementById(targetId);

      if (target) {
        if (githubReadmeDetails.value && !githubReadmeDetails.value.open) {
          githubReadmeDetails.value.open = true;
        }
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };

    anchor.addEventListener('click', handler);
    cleanupReadmeAnchors.push(() => anchor.removeEventListener('click', handler));
  });
};

if (import.meta.client) {
  const scrollToReadmeHash = () => {
    if (ignoreNextHashScroll) {
      ignoreNextHashScroll = false;
      return;
    }

    const hash = route.hash;
    if (!hash) {
      return;
    }
    const targetId = decodeURIComponent(hash.slice(1));
    if (!targetId) {
      return;
    }

    const container = githubReadmeContainer.value;
    if (!container) {
      return;
    }

    const selector = `[id="${escapeCssIdentifier(targetId)}"]`;
    const target =
      container.querySelector<HTMLElement>(selector) ??
      document.getElementById(targetId);

    if (!target) {
      return;
    }

    if (githubReadmeDetails.value && !githubReadmeDetails.value.open) {
      githubReadmeDetails.value.open = true;
    }

    requestAnimationFrame(() => {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  watch(githubReadmeHtml, async (html) => {
    if (!html) {
      cleanupReadmeAnchors.forEach((fn) => fn());
      cleanupReadmeAnchors.length = 0;
      return;
    }
    await nextTick();
    enhanceReadmeAnchors();
    scrollToReadmeHash();
  });

  onMounted(async () => {
    if (githubReadmeHtml.value) {
      await nextTick();
      enhanceReadmeAnchors();
      scrollToReadmeHash();
    }
  });

  watch(
    () => route.hash,
    (hash) => {
      if (!hash) {
        return;
      }
      nextTick(() => scrollToReadmeHash());
    },
  );

  onBeforeUnmount(() => {
    cleanupReadmeAnchors.forEach((fn) => fn());
    cleanupReadmeAnchors.length = 0;
  });
}
</script>

<template>
  <main class="work-content project-detail">
    <NuxtLink to="/work" class="project-detail__back">
      <span aria-hidden="true">←</span>
      Back to projects
    </NuxtLink>

    <header class="project-detail__header">
      <div>
        <figure v-if="project.coverMode === 'group' && project.coverGroup"
          class="project-detail__cover"
          v-for="logo in project.coverGroup"
          :key="logo.src"
          :src="logo.src"
          :alt="logo.alt">
            <div
              v-if="project.coverMode === 'group' && project.coverGroup"
              class="project-detail__cover-group"
            >
              <img
                class="project-detail__cover-logo"
                :src="logo.src"
                :alt="logo.alt"
              >
            </div>
            <img
              v-else
              class="project-detail__cover-image"
              :class="{ 'project-detail__cover-image--contain': project.coverMode === 'contain' }"
              :src="project.cover"
              :alt="project.coverAlt"
            >
        </figure>
        <figure v-else class="project-detail__cover">
            <img
              class="project-detail__cover-image"
              :class="{ 'project-detail__cover-image--contain': project.coverMode === 'contain' }"
              :src="project.cover"
              :alt="project.coverAlt"
            >
        </figure>
      </div>

      <div class="project-detail__intro">
        <h1 class="project-detail__title">
          {{ project.title }}
        </h1>
        <p v-if="project.context" class="project-detail__context">
          {{ project.context }}
        </p>
        <p class="project-detail__description">
          {{ project.longDescription }}
        </p>
        <div class="project-detail__meta">
          <div v-if="project.role" class="project-detail__meta-item">
            <span class="project-detail__meta-label">Role</span>
            <span class="project-detail__meta-value">{{ project.role }}</span>
          </div>
          <div v-if="project.timeline" class="project-detail__meta-item">
            <span class="project-detail__meta-label">Timeline</span>
            <span class="project-detail__meta-value">{{ project.timeline }}</span>
          </div>
        </div>
        <div class="project-tags project-detail__tags">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </header>

    <section
      v-if="project.contributions?.length"
      class="project-detail__section"
    >
      <h2 class="project-detail__section-title">
        What I delivered
      </h2>
      <ul class="project-detail__list">
        <li v-for="item in project.contributions" :key="item">
          {{ item }}
        </li>
      </ul>
    </section>

    <section v-if="project.links?.length" class="project-detail__section">
      <h2 class="project-detail__section-title">
        Resources
      </h2>
      <ul class="project-detail__links">
        <li v-for="link in project.links" :key="link.url">
          <a
            :href="link.url"
            target="_blank"
            rel="noopener"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
    </section>

    <section
      v-if="project.github"
      class="project-detail__section project-detail__github"
    >
      <h2 class="project-detail__section-title">
        GitHub
      </h2>
      <p v-if="githubRepo?.description" class="project-detail__github-description">
        {{ githubRepo.description }}
      </p>
      <p v-else-if="githubRepoError" class="project-detail__github-error">
        {{ githubRepoError }}
      </p>
      <p v-else class="project-detail__github-placeholder">
        Find more technical information directly on the GitHub repository.
      </p>
      <div v-if="githubLanguages.length" class="project-detail__github-languages">
        <span
          v-for="language in githubLanguages"
          :key="language"
          class="project-detail__github-language"
        >
          {{ language }}
        </span>
      </div>
      <p v-else-if="githubLanguagesError" class="project-detail__github-error">
        {{ githubLanguagesError }}
      </p>
      <details
        v-if="githubReadmeHtml"
        class="project-detail__github-readme"
        ref="githubReadmeDetails"
      >
        <summary class="project-detail__github-readme-summary">
          View the README
        </summary>
        <div
          ref="githubReadmeContainer"
          class="project-detail__github-readme-content"
          v-html="githubReadmeHtml"
        />
      </details>
      <p v-else-if="githubReadmeError" class="project-detail__github-error">
        {{ githubReadmeError }}
      </p>
      <p v-if="githubLastUpdate" class="project-detail__github-meta">
        Last activity: <strong>{{ githubLastUpdate }}</strong>
      </p>
      <a
        v-if="githubRepo"
        class="project-detail__github-link"
        :href="githubRepo.html_url"
        target="_blank"
        rel="noopener"
      >
        Open repository
      </a>
    </section>
  </main>
</template>
