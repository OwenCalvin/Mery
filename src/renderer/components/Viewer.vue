<template>
  <div class="viewer">
    <div id="mask" class="mask" :style="{'-webkit-mask-image': getBackground}"></div>
  </div>
</template>

<script>
  import { screen, remote } from 'electron'
  const window = remote.getCurrentWindow()

  export default {
    name: 'viewer',
    data: function () {
      return {
        hovered: false,
        posX: -200,
        posY: -200,
        radius: 200
      }
    },
    computed: {
      getBackground: function () {
        return `radial-gradient(circle at ${this.posX}px ${this.posY}px, transparent ${this.radius}px, white 0%)`
      }
    },
    mounted: function () {
      let _this = this
      setInterval(function () {
        let bounds = window.getBounds()
        let mousePos = screen.getCursorScreenPoint()
        _this.posX = (mousePos.x - bounds.x)
        _this.posY = (mousePos.y - bounds.y - 50) // 50px is the Header height
      }, 1)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/viewer.scss';
</style>
