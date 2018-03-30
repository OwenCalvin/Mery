<template>
  <div class="main-page">
    <Top
    class="control top"
    v-show="control.visible"
    :style="{height: getPx(control.height), marginBottom: getPx(control.margin)}">
    </Top>

    <Viewer
    class="viewer"
    :style="{top: getPx(control.totalHeight), bottom: getPx(control.totalHeight)}">
    </Viewer>

    <Bottom
    class="control bottom"
    v-show="control.visible"
    :style="{height: getPx(control.height), marginTop: getPx(control.margin)}">
    </Bottom>
  </div>
</template>

<script>
  import Top from './Top.vue'
  import Viewer from './Viewer.vue'
  import Bottom from './Bottom.vue'
  import { mapGetters } from 'vuex'

  export default {
    name: 'main-page',
    methods: {
      getPx (val) { return val + 'px' }
    },
    computed: {
      ...mapGetters([ 'control' ])
    },
    components: {
      Top,
      Viewer,
      Bottom
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mainpage.scss';
</style>
