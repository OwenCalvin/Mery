<template>
  <div class="viewer">
    <div class="mask" :style="{'-webkit-mask-image': getBackground, opacity: window.opacity}">
      <Web
      v-for="(tab, index) in web.tabs"
      :key="index"
      :index="index">
      </Web>
    </div>
  </div>
</template>

<script>
  import Web from './Web'
  import { mapGetters } from 'vuex'

  export default {
    name: 'viewer',
    computed: {
      ...mapGetters([
        'web',
        'ball',
        'window'
      ]),
      getBackground () {
        // Make a hole with -webkit-mask-image
        if (!this.window.clickable) {
          return `radial-gradient(circle at ${this.ball.pos.x}px ${this.ball.pos.y}px, transparent ${this.ball.radius}px, white 0%)`
        }
      }
    },
    components: { Web }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/global.scss';

  .mask {
      transition: opacity .2s;
      background: white;
      height: 100%;
      width: 100%;
  }

  .web {
    height: 100%;
    width: 100%;
  }
</style>
