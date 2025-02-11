<template>
    <div>        
        <h2>{{ this.title }}</h2>
        <a :href="getPdfUrl(this.url)" :download="this.title">Download</a>
    </div>
  </template>
  
<script>
    export default {
        props: ['url', 'title'],
        methods: {
            getPdfUrl(url) {
                return '/pdf/' + url;
            }
        }
    }
</script>