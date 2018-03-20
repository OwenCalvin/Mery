<template>
  <div id="main-page">
    <header></header>
    <Viewer></Viewer>
  </div>
</template>

<script>
  import Viewer from './Viewer.vue'
  export default {
    name: 'main-page',
    components: { Viewer },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mainpage.scss';
</style>

