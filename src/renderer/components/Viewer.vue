<template>
  <div class="viewer">
    <div class="mask" :style="{'-webkit-mask-image': getBackground, opacity: window.opacity}">
      <transition-group name="side">
        <Web
        v-for="(tab, index) in web.tabs"
        v-show="index === web.selectedTab"
        :id="'viewer' + index"
        :key="tab.id"
        :index="index">
        </Web>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import electron from '../scripts/imports/electron'
  import Web from './Web'
  import { mapGetters } from 'vuex'
  import { ipcRenderer } from 'electron'

  const WINDOW = electron.window

  export default {
    name: 'viewer',
    computed: {
      ...mapGetters([
        'web',
        'ball',
        'window',
        'selectedTab',
        'control'
      ]),
      getBackground () {
        // Make a hole with -webkit-mask-image
        if (!this.window.clickable) {
          return `radial-gradient(circle at ${this.ball.pos.x}px ${this.ball.pos.y}px, transparent ${this.ball.radius}px, white 0%)`
        }
      }
    },
    watch: {
      selectedTab () {
        if (this.selectedTab.webview && !this.selectedTab.webview.isLoading()) {
          let size = WINDOW.getSize()
          size[1] -= 2 * this.control.totalHeight
          this.selectedTab.webview.getWebContents().setSize({
            normal: {
              width: size[0],
              height: size[1]
            }
          })
        }
      }
    },
    mounted () {
      ipcRenderer.on('dev', () => { this.selectedTab.webview.openDevTools() })
    },
    components: { Web }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/global.scss';

  .mask {
      transition: opacity .2s;
      background: white;
      height: 100%;
      width: 100%;
  }

  .web {
    height: 100%;
    width: 100%;
  }
</style>
