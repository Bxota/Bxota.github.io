<template>
    <section id="certificates">
        <AnimateOnVisible name="fadeDown" :duration="1">
            <Title :title="content.object.metadata.title[selectedLang]" />
        </AnimateOnVisible>
        
        <div class="section-content">
            <div class="container-fluid">
                <div class="row d-flex flex-wrap align-items-center">
                    <div class="col-md-2 m-auto pb-4" v-for="(post, index) in this.content.object.metadata.links" :key="index">
                        <Download :url="post.url" :title="post.title" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Title from './Title.vue'
    import Download from './Download.vue';

    export default {
        name: 'Certificates',
        components: {
            Title,
            Download
        },
        props: ['content', "selectedLang"],
    }
</script>

<style scoped lang="scss">
    @import '@/styles/constants.scss';

    @media(min-width: #{map-get($breakpoints, medium)}) {
        .section-content {
            width: 80%;
            margin: 0 auto;
        }
    }
</style>
