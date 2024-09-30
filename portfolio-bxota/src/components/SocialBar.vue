<template>
  <div class="social-wrap">
    <ul>
      <li v-if="links.object.metadata.links.linkedin">
        <a target="_blank" :href="links.object.metadata.links.linkedin">
          <font-awesome-icon class="icon" :icon="['fab', 'linkedin']" />
        </a>
      </li>
      <li v-if="links.object.metadata.links.github">
        <a :href="links.object.metadata.links.github" target="_blank">
          <font-awesome-icon class="icon" :icon="['fab', 'github-square']" />
        </a>
      </li>
      <li v-if="links.object.metadata.links.mail">
        <a :href="links.object.metadata.links.mail" target="_blank">
          <font-awesome-icon class="icon" :icon="['fas', 'envelope']" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: 'SocialBar',
        props: ['links'],
    }
</script>

<style scoped lang="scss">
  @import '@/styles/constants.scss';
 .social-wrap {
    li {
      display: inline-block;
      margin-right: 10px;
    }
    .icon {
      font-size: 3rem;
    }
  }
</style>