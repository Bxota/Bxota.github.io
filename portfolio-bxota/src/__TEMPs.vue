<template>
  <transition name="fade" tag="div" class="wrapper" mode="out-in">
    <div class="wrapper" v-if="isLoaded" id="app">
      <LandingPage :user="user" />
      </div>
  </transition>
</template>

<script>
import LandingPage from "./components/LandingPage.vue";

import { cosmic } from "./cosmic.js";

export default {
  name: "App",
  components: {
    LandingPage,
  },
  data: () => ({
    isLoaded: false,
    user: {},
  }),
  methods: {
    async fetchObject(slug) {
      return await cosmic.objects.findOne({
        type: slug,
        slug: slug
      }).props("slug,title,metadata")
      .depth(1)
    },
    extractFirstObject(objects) {
      if(objects.objects == null)
        return void 0;
      else
        return objects.objects[0];
    }
  },
  created() {
    document.body.classList.add("loading");
    Promise.all([
      this.fetchObject('user-data')
    ]).then(([
      user_data
    ]) => {
      this.user = {
        name: user_data.object.metadata.name,
        status: user_data.object.metadata.status,
        email: user_data.object.metadata.email,
        phone: user_data.object.metadata.phone,
        city: user_data.object.metadata.city,
        lang: user_data.object.metadata.lang,
        photo: user_data.object.metadata.photo,
      }
      this.isLoaded = true;
      this.$nextTick(() => document.body.classList.remove("loading"));
    });
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/constants.scss";

#app {
  font-family: Montserrat-Regular, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.wrapper {
  height: 100%;
}
</style>
