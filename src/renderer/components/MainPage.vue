<template>
  <div class="main-page">
    <header class="control" v-if="head.visible" :style="{height: getPx(head.height), marginBottom: getPx(head.mb)}">
      <span class="left side">
        <span class="text-white btn fa" :class="{'disable': !controls.canGoBack}" @click="goBack">
          <font-awesome-icon :icon="icons.left"/>
        </span>
        <span class="text-white btn fa" :class="{'disable': !controls.canGoFront}" @click="goFront">
          <font-awesome-icon :icon="icons.right"/>
        </span>
        <span class="text-white btn fa" @click="refresh">
          <font-awesome-icon :icon="icons.reload"/>
        </span>
      </span>
      <span class="drag"></span>
      <span class="side input">
        <input type="text" class="input-text" @keypress.enter="link.url = link.text" v-model="link.text">
      </span>
      <span class="drag"></span>
      <span class="right side">
        <span class="text-white btn fa">
          <font-awesome-icon :icon="icons.minimize" @click="minimizeWindow"/>
        </span>
        <span class="text-white btn fa">
          <font-awesome-icon :icon="icons.cross" @click="closeWindow"/>
        </span>
      </span>
    </header>

    <Viewer class="viewer" @setControls="setControls" :radius="radius" :opacity="opacity" :clickable="clickable" :url="link.url" :mt="totalHeadHeight" :style="{top: getPx(totalHeadHeight), bottom: getPx(totalHeadHeight)}"></Viewer>
    
    <footer class="control" v-if="head.visible" :style="{height: getPx(head.height), marginTop: getPx(head.mb)}">
      <span class="side">
        <span :class="{'active': !head.visible}" class="text-white btn fa" @click="toggleHead">
          <font-awesome-icon :icon="icons.eye"/>
        </span>
        <span :class="{'active': clickable}" class="text-white btn fa" @click="toggleClick">
          <font-awesome-icon :icon="icons.click"/>
        </span>
      </span>

      <span class="drag"></span>
      
      <span class="side">
        <vue-slider ref="slider" v-model="radius" :min="50" :max="350" :interval="1" :tooltip="false" width="100%"></vue-slider>
        <span class="text-white fa">
          <font-awesome-icon :icon="icons.dot"/>
        </span>
      </span>

      <span class="side">
        <vue-slider ref="slider" v-model="opacity" :min="0.1" :max="1" :interval=".01" :tooltip="false" width="100%"></vue-slider>
        <span class="text-white fa">
          <font-awesome-icon :icon="icons.opacity"/>
        </span>
      </span>
    </footer>
  </div>
</template>

<script>
  import vueSlider from 'vue-slider-component'
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import Icons from '../scripts/imports/icons'
  import electron from '../scripts/imports/electron'
  import Viewer from './Viewer.vue'
  import { ipcRenderer } from 'electron'

  const LINK = 'www.youtube.com'
  const HEIGHT = 40
  const MB = 3

  export default {
    name: 'main-page',
    data: function () {
      return {
        opacity: 0.9,
        radius: 200,
        sizeState: {
          maximized: false,
          width: electron.window.getSize[0],
          height: electron.window.getSize[1]
        },
        controls: {
          canGoBack: false,
          canGoFront: false
        },
        clickable: true,
        link: {
          text: LINK,
          url: LINK
        },
        icons: Icons,
        head: {
          visible: true,
          height: HEIGHT,
          mb: MB
        },
        close: false
      }
    },
    methods: {
      toggleHead () {
        if (this.head.visible) {
          electron.window.setResizable(false)
          this.head.height = 0
          this.head.mb = 0
          this.head.visible = false
        } else {
          electron.window.setResizable(true)
          this.head.height = HEIGHT
          this.head.mb = MB
          this.head.visible = true
        }
      },
      toggleClick () {
        this.clickable = !this.clickable
      },
      getPx (val) { return val + 'px' },
      closeWindow () { electron.window.close() },
      minimizeWindow () { electron.window.minimize() },
      goBack () { this.$emit('web', 'back') },
      goFront () { this.$emit('web', 'front') },
      refresh () { this.$emit('web', 'refresh') },
      setControls (val) {
        this.controls.canGoBack = val.back
        this.controls.canGoFront = val.front
      }
    },
    computed: {
      totalHeadHeight () { return this.head.height + this.head.mb }
    },
    mounted: function () {
      ipcRenderer.on('key', () => { this.toggleHead() })
      ipcRenderer.on('mouse', () => { this.toggleClick() })
      ipcRenderer.on('dev', () => { this.$emit('web', 'dev') })
    },
    components: {
      vueSlider,
      FontAwesomeIcon,
      Viewer
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mainpage.scss';
</style>

