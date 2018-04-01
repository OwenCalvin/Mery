<template>
  <div class="main-page">
    <Top
    class="control"
    v-show="control.visible"
    :style="{height: getPx(control.height)}">
    </Top>

    <Viewer
    class="viewer"
    :style="{top: getPx(control.totalHeight), bottom: getPx(control.totalHeight)}">
    </Viewer>

    <Bottom
    class="control"
    v-show="control.visible"
    :style="{height: getPx(control.height)}">
    </Bottom>

    <div
    class="control tuto"
    v-show="!control.visible"
    :style="{height: getPx(control.height)}">
      CTRL + ALT + X
    </div>
  </div>
</template>

<script>
  import loop from '../scripts/loop'
  import Top from './Top.vue'
  import Viewer from './Viewer.vue'
  import Bottom from './Bottom.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'main-page',
    methods: {
      ...mapActions([
        'setBallPos',
        'setBallVisibility',
        'setWindowClick'
      ]),
      getPx (val) { return val + 'px' }
    },
    computed: {
      ...mapGetters([
        'web',
        'ball',
        'window',
        'control'
      ])
    },
    mounted () {
      loop(this)
    },
    components: {
      Top,
      Viewer,
      Bottom
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/global.scss';
  .main-page {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .viewer {
      border-radius: 10px;
      overflow: hidden;
      position: absolute;
      width: 100%;
  }

  .control {
      user-select: none;
      width: 100%;
      position: absolute;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
      background: rgb(50, 50, 50);
      color: white;
      opacity: .9;
      transition: opacity .3s;
      border-radius: 10px;
      &:hover {
          opacity: 1;
      }
  }
</style>
