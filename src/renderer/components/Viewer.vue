<template>
  <div class="viewer">
    <div id="mask" class="mask" :style="{'-webkit-mask-image': getBackground}"></div>
  </div>
</template>

<script>
  import loop, { setMT } from '../scripts/loop'

  export default {
    name: 'viewer',
    props: ['mt'],
    data: function () {
      let radius = 200
      return {
        hovered: false,
        posX: -radius,
        posY: -radius,
        radius: radius
      }
    },
    computed: {
      getBackground: function () {
        return `radial-gradient(circle at ${this.posX}px ${this.posY}px, transparent ${this.radius}px, white 0%)`
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
