<template>
  <div class="viewer">
    <div id="mask" class="mask" :style="{'-webkit-mask-image': getBackground}">
      <webview class="web" :src="'http://' + url" autosize allowtransparency></webview>
    </div>
  </div>
</template>

<script>
  import electron from '../scripts/imports/electron'
  import loop, { setMT, setClick } from '../scripts/loop'
  const RADIUS = 0.2
  let webView = document.querySelector('webview')

  export default {
    name: 'viewer',
    props: ['mt', 'url', 'clickable'],
    data: function () {
      return {
        radius: RADIUS,
        posX: 0,
        posY: 0
      }
    },
    methods: {
      setControls () {
        webView.addEventListener('dom-ready', () => {
          this.$emit('setControls', {back: webView.canGoBack(), front: webView.canGoForward()})
        })
      }
    },
    computed: {
      getBackground: function () {
        let radius = electron.window.getSize()[0] * this.radius
        return `radial-gradient(circle at ${this.posX}px ${this.posY}px, transparent ${radius}px, white 0%)`
      }
    },
    watch: {
      clickable () { setClick(this.clickable) },
      mt () { setMT(this.mt) },
      url () { this.setControls() }
    },
    mounted: function () {
      webView = document.querySelector('webview')
      webView.addEventListener('dom-ready', () => {
        this.$parent.$on('go', (val) => {
          switch (val) {
            case 'back':
              webView.goBack()
              break
            case 'front':
              webView.goForward()
          }
          this.setControls()
        })
        this.$parent.$on('dev', () => { webView.openDevTools() })
      })

      loop(this)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/viewer.scss';
</style>
