<template>
  <div class="paragraph">
    <h3>{{content.object.metadata.pres_title[selectedLang]}}</h3>
    <div class="begin">{{content.object.metadata.pres_first[selectedLang]}}</div>
    <!-- <p>{{content.object.metadata.pres_second}}</p> -->
  </div>
</template>

<script>
export default {
    name: 'Description',
    props: ['content', 'selectedLang']
}
</script>

<style scoped lang="scss">
    @import '@/styles/constants.scss';

    .paragraph {
        color: map-get($colors, primary);
        .begin {
            color: map-get($colors, secondary);
        }
    }
</style>
