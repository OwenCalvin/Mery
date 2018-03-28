<template>
  <div class="viewer">
    <div id="mask" class="mask" :style="{'-webkit-mask-image': getBackground}"></div>
  </div>
</template>

<script>
  import electron from '../scripts/imports/electron'
  import loop, { setMT } from '../scripts/loop'
  const RADIUS_RATIO = 0.35

  export default {
    name: 'viewer',
    props: ['mt'],
    data: function () {
      let radius = 200
      return {
        hovered: false,
        posX: -radius,
        posY: -radius
      }
    },
    computed: {
      getBackground: function () {
        let radius = electron.window.getSize()[0] * RADIUS_RATIO
        return `radial-gradient(circle at ${this.posX}px ${this.posY}px, transparent ${radius}px, white 0%)`
      }
    },
    mounted: function () {
      setMT(this.mt)
      loop(this)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/viewer.scss';
</style>
