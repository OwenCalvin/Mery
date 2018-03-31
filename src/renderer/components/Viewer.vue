<template>
  <div class="viewer">
    <div class="mask" :style="{'-webkit-mask-image': getBackground, opacity: window.opacity}">
      <webview
      class="web"
      :src="web.url"
      allowfullscreen="0"
      autosize
      allowtransparency>
      </webview>
    </div>
  </div>
</template>

<script>
  import electron from '../scripts/imports/electron'
  import loop from '../scripts/loop'
  import { mapGetters, mapActions } from 'vuex'
  import { ipcRenderer } from 'electron'

  export default {
    name: 'viewer',
    methods: {
      ...mapActions([
        'setBallPos',
        'setBallVisibility',
        'setWindowClick',
        'setWebview',
        'setWebCan',
        'setWebUrlText'
      ]),
      setWebviewControls (webview) {
        // Set the web controls
        this.setWebUrlText(webview.getURL())
        this.setWebCan({
          back: webview.canGoBack(),
          forward: webview.canGoForward(),
          refresh: true
        })
      }
    },
    computed: {
      ...mapGetters([
        'web',
        'control',
        'ball',
        'window'
      ]),
      getBackground () {
        // Make a hole with -webkit-mask-image
        if (!this.window.clickable) {
          return `radial-gradient(circle at ${this.ball.pos.x}px ${this.ball.pos.y}px, transparent ${this.ball.radius}px, white 0%)`
        }
      }
    },
    mounted () {
      let webview = document.querySelector('webview')
      webview.addEventListener('dom-ready', () => {
        ipcRenderer.on('dev', () => { webview.openDevTools() })

        this.setWebview(webview)
        this.setWebviewControls(webview)

        webview.addEventListener('load-commit', () => {
          this.setWebviewControls(webview)
        })

        // Cannot do actions when the page isn't loaded
        webview.addEventListener('did-start-loading', () => {
          this.setWebCan({
            back: false,
            forward: false,
            refresh: false
          })
        })

        // Do not resize window when we enter in fullscreen mode with videos
        webview.addEventListener('enter-html-full-screen', () => {
          electron.window.setFullScreen(false)
        })
      })
      loop(this)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/global.scss';

  .viewer {
      border-radius: 10px;
      overflow: hidden;
      position: absolute;
      width: 100%;
  }

  .mask {
      transition: opacity .2s;
      background: white;
      height: 100%;
      width: 100%;
  }

  .web {
      height: 100%;
      width: 100%;
      display: inline-flex;
  }
</style>
