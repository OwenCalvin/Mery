<template>
  <div id="app" @mousemove="setPosition($event)" @mouseout="unHover()" :style="{background: getBackground}">
    <router-view class="hover-hidden"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'see',
    data: function () {
      return {
        posX: 0,
        posY: 0
      }
    },
    computed: {
      getBackground: function () {
        return `radial-gradient(circle at ${this.posX}px ${this.posY}px, transparent 200px, rgba(255, 255, 255, .5) 0%)`
      }
    },
    methods: {
      setPosition: function (ev) {
        this.posX = ev.pageX
        this.posY = ev.pageY
      },
      unHover: function () {
        console.log('test')
      }
    }
  }
</script>

<style>
  body {
    padding: 0;
    margin: 0;
  }
  #app {
    position: absolute;
    /*background: radial-gradient(circle at 100px 30px, transparent 20%, white 20%);*/
    background-size: 100% 100%;
    min-height: 100%;
    width: 100%;
  }
</style>
