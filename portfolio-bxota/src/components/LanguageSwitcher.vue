<template>
    <div class="language-switcher">
      <button v-for="(lang, index) in languages" :key="index" @click="changeLanguage(lang.code)">
        <img :src="getImgUrl(lang.flag)" :alt="lang.name" class="flag" />
      </button>
      
    </div>
</template>
  
<script>
  export default {
    props: ["selectedLang"],
    data() {
      return {
        languages: [
          { code: "fr", name: "Français", flag: "fr.png" },
          { code: "en", name: "English", flag: "en.png" },
        ],
      };
    },
    methods: {
      changeLanguage(langCode) {
        this.$emit("updateLang", langCode); // Émettre l'événement avec le code de la langue
      },
      getImgUrl(flag) {
        return require(`../assets/img/flags/${flag}`);
      },
    },
  };
</script>

<style scoped lang="scss">
img {
    width: 50%;
    height: 50%;
}
</style>