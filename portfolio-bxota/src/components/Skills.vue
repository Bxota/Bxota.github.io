<template>
    <section id="skills">
        <AnimateOnVisible name="fadeDown" :duration="1">
            <Title :title="content.object.metadata.title[selectedLang]" />
        </AnimateOnVisible>

        <div class="section-content">
            <div class="container-fluid">
                <div class="row d-flex flex-wrap align-items-center">
                    <div class="col-md-2 m-auto pb-4" v-for="(post, index) in this.content.object.metadata.items" :key="index">
                        <AnimateOnVisible name="bounce">
                            <img id="imgLogo" class="mx-auto d-block" :src="getImgUrl(post.img)" :alt="post.title"/>
                            <div id="divAlt" class="altCaption text-center">{{post.title}}</div>
                        </AnimateOnVisible>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Title from './Title.vue'

    export default {
        name: 'Skills',
        components: {
            Title,
        },
        props: ['content', "selectedLang"],
        methods: {
            getImgUrl(img) {
                return require('../assets/img/logo/'+img);
            },
        },
    }
</script>

<style scoped lang="scss">
    @import '@/styles/constants.scss';

    #skills {
        background-color: lighten(map-get($colors, dark), 100%);
    }

    @media(min-width: #{map-get($breakpoints, medium)}) {
        .section-content {
            width: 80%;
            margin: 0 auto;
        }
    }

    img{
        max-width: 120px;
    }

    @media(max-width: #{map-get($breakpoints, medium)}) {
        .section-content {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        img{
            max-width: 60px;
            margin: 0 auto;
        }

        .col-md-2 {
            width: 30%;
            text-align: center;
        }
    }

    .altCaption{
        color: map-get($colors, secondary);
        margin-top: 1rem;
    }
</style>
