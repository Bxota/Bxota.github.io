<template>
  <section id="projects">
    <AnimateOnVisible name="fadeDown" :duration="1">
		<Title
		class="title"
		:title="content.object.metadata.title[selectedLang]"
		:description="content.object.metadata.description[selectedLang]"
		/>
    </AnimateOnVisible>

    <div class="container-fluid center-block">
      <article class="content text-center">

        <AnimateOnVisible
      class="timeline mx-auto"
      v-for="(post, index) in content.object.metadata.items[selectedLang]"
      :key="index"
      name="fadeLeft"
      :duration="0.5"
    >

      <vue-timeline-update
        :id="'toggle-' + index" 
        v-b-toggle="'collapse-' + index"
        variant="primary"
        :date="new Date(post.date)"
        :title="post.title"
        :description="post.shortContent"
        :thumbnail="getImgUrl(post.image)"
        :color="post.color"
        :category="post.tag + ' | ' + post.languages"
        icon="code"
      />

      <b-collapse :id="'collapse-' + index" class="mb-5">
          <div class="gb-vue-timeline-update gb-vue-timeline-update--dark js-vue-timeline-update not-collapsed">
            <div class="gb-vue-timeline-update__left"></div>
            <div class="gb-vue-timeline-update__center">
              <span class="gb-vue-timeline-update__line"></span>
            </div>
            <div class="gb-vue-timeline-update__right">
              <div class="gb-vue-timeline-update__information">
                <div class="gb-vue-timeline-update__meta"></div>
              </div>
              <div class="gb-vue-timeline-update__description">
                <p>{{ post.content }}</p>
                <span v-if="post.link">
                  Link : <a :href="post.link">{{ post.link }}</a>
                </span>
              </div>
            </div>
          </div>
      </b-collapse>
    </AnimateOnVisible>
      </article>
    </div>
  </section>
</template>

<script>
import Title from "./Title.vue";

export default {
  name: "Projects",
  props: ['content', 'selectedLang'],
  components: {
    Title,
  },
  methods: {
    getImgUrl(img) {
      if(img == undefined || img == "")
        return ""
      else if(/^https:\/\/cdn\.cosmicjs\.com\/.+\.(jpg|png|gif)$/.test(img))
        return img
      return require('../assets/img/projects/'+img)
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/constants.scss";

$linear: map-get($colors, dark);

#projects {
  background-color: lighten(map-get($colors, primary), 5%);

}

.title {
  color: map-get($colors, light);
}

/deep/ .text-wrapper {
  &:after {
    border-bottom: 1px solid map-get($colors, dark);
  }
}

article .inner {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    z-index: 1;
}

.content {
    color: map-get($colors, light);
    margin-top: 30px;
    header {
        height: 100%;
        width: 70%;
    }
    h1{
        font-size: 3rem;
    }
}

.vertical-center {
    display: flex;
    align-items: center;
}

h1 {
    margin-top: 10px;
    margin-bottom: 20px;
}

.content {
  color: #a9c7df;
  background-color: lighten(map-get($colors, primary), 5%);
}

.card-body {
  background-color: lighten(map-get($colors, primary), 5%);
}
</style>
