<template>
  <div class="viewer">
    <div id="mask" class="mask" :style="{'-webkit-mask-image': getBackground}">
      <webview class="web" :src="'http://' + url" autosize="on" allowtransparency></webview>
    </div>
  </div>
</template>

<script>
  import electron from '../scripts/imports/electron'
  import loop, { setMT, setClick } from '../scripts/loop'
  const RADIUS = 0.2

  export default {
    name: 'viewer',
    props: ['mt', 'url', 'clickable'],
    data: function () {
      return {
        radius: RADIUS,
        posX: 0,
        posY: 0
      }
    },
    computed: {
      getBackground: function () {
        let radius = electron.window.getSize()[0] * this.radius
        return `radial-gradient(circle at ${this.posX}px ${this.posY}px, transparent ${radius}px, white 0%)`
      }
    },
    watch: {
      clickable () {
        setClick(this.clickable)
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
