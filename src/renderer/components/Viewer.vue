<template>
  <div class="viewer">
    <div id="mask" class="mask" :style="{'-webkit-mask-image': getBackground, opacity: opacity}">
      <webview class="web" :src="'http://' + url" autosize allowtransparency></webview>
    </div>
  </div>
</template>

<script>
  import loop, { setMT, setClick } from '../scripts/loop'
  let webView = document.querySelector('webview')

  export default {
    name: 'viewer',
    props: ['mt', 'url', 'clickable', 'opacity', 'radius'],
    data: function () {
      return {
        disable: true,
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
        if (!this.disable) {
          return `radial-gradient(circle at ${this.posX}px ${this.posY}px, transparent ${this.radius}px, white 0%)`
        }
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
        this.$parent.$on('web', (val) => {
          switch (val) {
            case 'back':
              webView.goBack()
              break
            case 'front':
              webView.goForward()
              break
            case 'refresh':
              webView.reload()
              break
            case 'dev':
              webView.openDevTools()
              break
          }
          this.setControls()
        })
      })

      loop(this)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/viewer.scss';
</style>
