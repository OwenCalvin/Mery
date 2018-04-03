<template>
  <div class="main-page">
    <transition name="scale">
      <Top
      class="side"
      v-show="control.visible"
      :style="{height: getPx(control.height)}">
      </Top>
    </transition>

    <Viewer
    class="viewer"
    :style="{top: getPx(control.totalHeight), bottom: getPx(control.totalHeight)}">
    </Viewer>

    <transition name="scale">
      <Bottom
      class="side"
      v-show="control.visible"
      :style="{height: getPx(control.height)}">
      </Bottom>
    </transition>

    <transition name="fade">
      <div
      class="tuto"
      v-show="!control.visible"
      :style="{height: getPx(control.height)}">
        CTRL + ALT + X
      </div>
    </transition>
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
    border-radius: 8px;
    overflow: hidden;
    position: absolute;
    width: 100%;
  }

  .side {
    user-select: none;
    width: 100%;
    position: absolute;
    background: rgb(35, 35, 35);
    color: white;
    border-radius: 8px;
    &:before {
      content: '';
      top: 50%;
      left: 50%;
      bottom: 0;
      width: 98%;
      height: 80%;
      position: absolute;
      transform: translateX(-50%) translateY(-50%);
      -webkit-app-region: drag;
    }

    .tuto {
      pointer-events: none;
      border-radius: 10px;
    }
  }
</style>
