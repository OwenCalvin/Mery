<template>
  <div class="viewer">
    <div class="mask" :style="{'-webkit-mask-image': getBackground, opacity: window.opacity}">
      <webview
      class="web"
      :src="'http://' + web.url"
      autosize
      allowtransparency>
      </webview>
    </div>
  </div>
</template>

<script>
  import loop from '../scripts/loop'
  import { mapGetters, mapActions } from 'vuex'
  import { ipcRenderer } from 'electron'

  let webview = document.querySelector('webview')

  export default {
    name: 'viewer',
    methods: {
      ...mapActions([
        'setBallPos',
        'setBallVisibility',
        'setWindowClick',
        'setWebview',
        'setWebCan'
      ])
    },
    computed: {
      ...mapGetters([
        'web',
        'control',
        'ball',
        'window'
      ]),
      getBackground: function () {
        if (!this.window.clickable) {
          return `radial-gradient(circle at ${this.ball.pos.x}px ${this.ball.pos.y}px, transparent ${this.ball.radius}px, white 0%)`
        }
      }
    },
    mounted: function () {
      webview = document.querySelector('webview')
      webview.addEventListener('dom-ready', () => {
        this.setWebview(webview)
        ipcRenderer.on('dev', () => { webview.openDevTools() })
        this.setWebCan({
          back: webview.canGoBack(),
          forward: webview.canGoForward(),
          refresh: true
        })
        webview.addEventListener('did-start-loading', () => {
          this.setWebCan({
            back: false,
            forward: false,
            refresh: false
          })
        })
        webview.addEventListener('enter-html-full-screen', (event) => {
          console.log(event)
          event.preventDefault()
        })
      })
      loop(this)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/viewer.scss';
</style>
