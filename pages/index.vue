<template>
  <main class="home-content">
    <section class="intro-section">
      <h1 class="main-heading">
        <span class="main-heading-title-one">Fullstack</span>
        <span class="main-heading-title"> &</span>
        <br />
        <span class="highlight">Lead Developer</span>
      </h1>
    </section>

    <nav class="main-navigation">
      <NuxtLink to="/work" class="nav-link work-link">Work</NuxtLink>
      <NuxtLink to="/certificates" class="nav-link work-link">Certificates</NuxtLink>
      <NuxtLink to="/about" class="nav-link work-link">About</NuxtLink>
    </nav>

    <div class="contact-button-container">
      <NuxtLink to="mailto:thomas.pro.leterme@gmail.com" class="contact-button">Contact</NuxtLink>
    </div>
  </main>
</template>