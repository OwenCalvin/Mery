<template>
  <div class="main-page">
    <header class="header" v-if="head.visible" :style="{height: getPx(head.height), marginBottom: getPx(head.mb)}">
      <span class="left side">
        <span :class="{'active': !head.visible}" class="text-white btn fa" @click="toggleHead">
          <font-awesome-icon :icon="icons.eyeSlash"/>
        </span>
        <span :class="{'active': clickable}" class="text-white btn fa" @click="toggleClick">
          <font-awesome-icon :icon="icons.click"/>
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
        <!--
        <md-button class="text-white btn fa md-icon-button">
          <font-awesome-icon :icon="icons.maximize" @click="maximizeWindow"/>
        </md-button>
        -->
        <span class="text-white btn fa">
          <font-awesome-icon :icon="icons.cross" @click="closeWindow"/>
        </span>
      </span>
    </header>
    <Viewer class="viewer" :clickable="clickable" :url="link.url" :mt="totalHeadHeight" :style="{top: getPx(totalHeadHeight)}"></Viewer>
  </div>
</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import Icons from '../scripts/imports/icons'
  import Electron from '../scripts/imports/electron'
  import Viewer from './Viewer.vue'
  import { ipcRenderer } from 'electron'

  const LINK = 'www.youtube.com'
  const HEIGHT = 40
  const MB = 3

  export default {
    name: 'main-page',
    data: function () {
      return {
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
          Electron.window.setResizable(false)
          this.head.height = 0
          this.head.mb = 0
          this.head.visible = false
        } else {
          Electron.window.setResizable(true)
          this.head.height = HEIGHT
          this.head.mb = MB
          this.head.visible = true
        }
      },
      toggleClick () {
        this.clickable = !this.clickable
      },
      getPx (val) { return val + 'px' },
      closeWindow () { Electron.window.close() },
      minimizeWindow () { Electron.window.minimize() }
      // maximizeWindow () { Electron.window.maximize() }
    },
    computed: {
      totalHeadHeight () {
        return this.head.height + this.head.mb
      },
      eyeIcon () {
        return this.head.height > 0 ? Icons.eyeSlash : Icons.eye
      }
    },
    mounted: function () {
      ipcRenderer.on('key', () => { this.toggleHead() })
      ipcRenderer.on('mouse', () => { this.toggleClick() })
    },
    components: {
      FontAwesomeIcon,
      Viewer
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mainpage.scss';
</style>

