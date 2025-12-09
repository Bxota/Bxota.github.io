<script setup lang="ts">
import { ECOLE89_TOPIC, EPITECH_TOPIC } from '~/constants/topics';
import { workProjects } from '~/data/work-projects';
import type { PortfolioRepository } from '~/types/portfolio';

const githubError = ref<string | null>(null);

const { data: githubData, pending: githubPending } = await useAsyncData(
  'github-projects',
  async () => {
    try {
      githubError.value = null;
      return await $fetch<PortfolioRepository[]>('/api/github', {
        responseType: 'json'
      });
    } catch (error) {
      console.error('Failed to load GitHub repositories for the work page', error);
      githubError.value =
        'Impossible de récupérer les projets GitHub pour le moment.';
      return [];
    }
  },
  {
    server: false,
    lazy: true
  }
);

const manualProjects = workProjects;

const searchQuery = ref('');
const selectedTopics = ref<string[]>([]);
const showSuggestions = ref(false);

const normalize = (value: string) => value.toLowerCase();

const manualProjectUrls = new Set(
  manualProjects
    .map((project) => project.html_url?.toLowerCase() ?? '')
    .filter((url) => url.length > 0)
);

const resolvedGithubData = computed<PortfolioRepository[]>(() => {
  const value = githubData.value;

  if (Array.isArray(value)) {
    return value;
  }

  if (value) {
    console.warn('Unexpected GitHub data payload', value);
    if (!githubError.value) {
      githubError.value = 'Les projets GitHub ne peuvent pas être affichés pour le moment.';
    }
  }

  return [];
});

const githubProjects = computed<PortfolioRepository[]>(() =>
  resolvedGithubData.value.filter((repo) => {
    const repoUrl = repo.html_url?.toLowerCase();
    return !repoUrl || !manualProjectUrls.has(repoUrl);
  })
);

const availableTopics = computed(() => {
  const topicSet = new Set<string>();

  manualProjects.forEach((project) => {
    project.topics?.forEach((topic) => topicSet.add(topic));
  });

  resolvedGithubData.value.forEach((repo) => {
    repo.topics?.forEach((topic) => topicSet.add(topic));
  });

  return Array.from(topicSet).sort((a, b) =>
    a.localeCompare(b, 'fr', { sensitivity: 'base' })
  );
});

const projectNameSuggestions = computed(() => {
  const names = new Set<string>();

  manualProjects.forEach((project) => names.add(project.name));
  resolvedGithubData.value.forEach((repo) => names.add(repo.name));

  return Array.from(names).sort((a, b) =>
    a.localeCompare(b, 'fr', { sensitivity: 'base' })
  );
});

const filteredProjectNameSuggestions = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    return projectNameSuggestions.value.slice(0, 10);
  }

  return projectNameSuggestions.value
    .filter((name) => name.toLowerCase().includes(query))
    .slice(0, 10);
});

const toggleTopic = (topic: string) => {
  const normalizedTopic = normalize(topic);
  const current = selectedTopics.value.map(normalize);

  if (current.includes(normalizedTopic)) {
    selectedTopics.value = selectedTopics.value.filter(
      (existing) => normalize(existing) !== normalizedTopic
    );
  } else {
    selectedTopics.value = [...selectedTopics.value, topic];
  }
};

const clearFilters = () => {
  searchQuery.value = '';
  selectedTopics.value = [];
};

let closeSuggestionsTimeout: ReturnType<typeof setTimeout> | null = null;

const openSuggestions = () => {
  if (closeSuggestionsTimeout) {
    clearTimeout(closeSuggestionsTimeout);
    closeSuggestionsTimeout = null;
  }
  showSuggestions.value = true;
};

const scheduleCloseSuggestions = () => {
  if (closeSuggestionsTimeout) {
    clearTimeout(closeSuggestionsTimeout);
  }
  closeSuggestionsTimeout = setTimeout(() => {
    showSuggestions.value = false;
  }, 120);
};

const selectSuggestion = (name: string) => {
  searchQuery.value = name;
  if (closeSuggestionsTimeout) {
    clearTimeout(closeSuggestionsTimeout);
    closeSuggestionsTimeout = null;
  }
  showSuggestions.value = false;
};

const matchesFilters = (repository: PortfolioRepository) => {
  const query = searchQuery.value.trim().toLowerCase();
  const normalizedTopics = selectedTopics.value.map(normalize);
  const repositoryTopics = repository.topics?.map(normalize) ?? [];

  const matchesTopic =
    normalizedTopics.length === 0 ||
    normalizedTopics.some((topic) => repositoryTopics.includes(topic));

  const matchesSearch =
    query.length === 0 ||
    [repository.name, repository.description]
      .filter((value): value is string => Boolean(value))
      .some((value) => value.toLowerCase().includes(query));

  return matchesTopic && matchesSearch;
};

const filteredGithubProjects = computed(() =>
  githubProjects.value.filter(matchesFilters)
);

const filteredManualProjects = computed(() =>
  manualProjects.filter(matchesFilters)
);

const epitechGithubProjects = computed<PortfolioRepository[]>(() =>
  filteredGithubProjects.value.filter((repo) =>
    repo.topics?.some((topic) => normalize(topic) === EPITECH_TOPIC)
  )
);

const ecole89GithubProjects = computed<PortfolioRepository[]>(() =>
  filteredGithubProjects.value.filter((repo) =>
    repo.topics?.some((topic) => normalize(topic) === ECOLE89_TOPIC)
  )
);

const otherGithubProjects = computed<PortfolioRepository[]>(() =>
  filteredGithubProjects.value.filter((repo) => {
    const topics = repo.topics?.map(normalize) ?? [];
    return !topics.includes(EPITECH_TOPIC) && !topics.includes(ECOLE89_TOPIC);
  })
);

</script>

<template>
  <main class="work-content">
    <h1 class="page-title">Work</h1>

    <section class="project-filters">
      <h2 class="project-filters__title">Filtres</h2>

      <div class="project-filters__controls">
        <label class="project-filter project-filter--search">
          <span class="project-filter__label">Recherche</span>
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Nom ou description…"
            class="project-filter__input"
            @focus="openSuggestions"
            @blur="scheduleCloseSuggestions"
          >
          <ul
            v-if="showSuggestions && filteredProjectNameSuggestions.length"
            class="project-filter__suggestions"
          >
            <li
              v-for="name in filteredProjectNameSuggestions"
              :key="name"
            >
              <button
                type="button"
                class="project-filter__suggestion"
                @mousedown.prevent="selectSuggestion(name)"
              >
                {{ name }}
              </button>
            </li>
          </ul>
        </label>

        <div class="project-filter project-filter--topics">
          <span class="project-filter__label">Topics</span>
          <div class="project-filter__chips">
            <button
              v-for="topic in availableTopics"
              :key="topic"
              type="button"
              class="filter-chip"
              :class="{ 'filter-chip--active': selectedTopics.includes(topic) }"
              @click="toggleTopic(topic)"
            >
              {{ topic }}
            </button>
            <p
              v-if="!availableTopics.length"
              class="project-filter__empty"
            >
              Aucun topic disponible pour le moment.
            </p>
          </div>
        </div>
      </div>

      <button
        v-if="searchQuery || selectedTopics.length"
        type="button"
        class="project-filters__reset"
        @click="clearFilters"
      >
        Réinitialiser les filtres
      </button>
    </section>

    <section class="github-projects">
      <h2 class="github-projects__title">Projets GitHub</h2>

      <p v-if="githubPending" class="project-list-message">
        Chargement des projets GitHub…
      </p>
      <p v-else-if="githubError" class="project-list-message project-list-message--error">
        {{ githubError }}
      </p>
      <template v-else>
        <div
          v-if="epitechGithubProjects.length"
          class="github-projects__group"
        >
          <h3 class="github-projects__subtitle">Projets d'études - Epitech</h3>
          <div class="projects-container">
            <GithubProjectCard v-for="repo in epitechGithubProjects" :key="repo.html_url" :repo="repo"
              image-path="/img/epitech.png" image-alt="Logo Epitech" />
          </div>
        </div>

        <div
          v-if="ecole89GithubProjects.length"
          class="github-projects__group"
        >
          <h3 class="github-projects__subtitle">Projets d'études - École 89</h3>
          <div class="projects-container">
            <GithubProjectCard v-for="repo in ecole89GithubProjects" :key="repo.html_url" :repo="repo"
              image-alt="Logo École 89" image-path="/img/ecole89.webp" />
          </div>
        </div>

        <div
          v-if="otherGithubProjects.length"
          class="github-projects__group"
        >
          <h3 class="github-projects__subtitle">Autres projets GitHub</h3>
          <div class="projects-container">
            <GithubProjectCard v-for="repo in otherGithubProjects" :key="repo.html_url" :repo="repo" />
          </div>
        </div>

        <p
          v-if="!epitechGithubProjects.length && !ecole89GithubProjects.length && !otherGithubProjects.length"
          class="project-list-message"
        >
          Aucun projet GitHub à afficher pour le moment.
        </p>
      </template>
    </section>

    <section class="github-projects">
      <h2 class="github-projects__title">Projets entreprise : Orisha Health & Safety</h2>
      <div class="projects-container">
        <GithubProjectCard
          v-for="project in filteredManualProjects"
          :key="project.name"
          :repo="project"
          :image-path="project.imagePath"
          :image-alt="project.imageAlt"
        />
      </div>
      <p
        v-if="!filteredManualProjects.length"
        class="project-list-message"
      >
        Aucun projet interne à afficher pour le moment.
      </p>
    </section>
  </main>
</template>
