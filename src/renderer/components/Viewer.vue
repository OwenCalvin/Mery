<template>
  <div id="view" class="mask" @mousemove="setPosition($event)" @mouseleave="unHover" :style="{'-webkit-mask-image': getBackground}">
  </div>
</template>

<script>
  // import $ from 'jquery'
  export default {
    name: 'viewer',
    data: function () {
      return {
        hovered: false,
        posX: 0,
        posY: 0
      }
    },
    computed: {
      getBackground: function () {
        let radius = this.hovered ? 0 : 0
        return `radial-gradient(circle at ${this.posX}px ${this.posY}px, transparent ${radius}px, white 0%)`
      }
    },
    methods: {
      setPosition: function (ev) {
        this.posX = ev.pageX
        this.posY = ev.pageY
      },
      unHover: function () {
        console.log('unhover')
        this.hovered = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/viewer.scss';
</style>
