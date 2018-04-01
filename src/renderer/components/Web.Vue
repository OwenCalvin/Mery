<template>
  <div class="web">
    <webview
    :id="'web' + index"
    :src="this.web.tabs[index].url"
    class="webview"
    autosize
    allowtransparency
    nodeintegration>
    </webview>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'web',
    props: ['index'],
    methods: {
      ...mapActions([
        'setWebview',
        'setWebCan',
        'setWebText',
        'setWebUrl',
        'addWebTab',
        'setSelectedTab',
        'setWebTitle'
      ]),
      setVuex (func, params) {
        params.index = this.index
        func(params)
      },
      setWebviewControls (webview) {
        // Set the web controls
        this.setVuex(this.setWebTitle, { title: webview.getTitle() })
        this.setVuex(this.setWebText, { text: webview.getURL() })
        this.setVuex(this.setWebCan, {
          can: {
            back: webview.canGoBack(),
            forward: webview.canGoForward(),
            reload: true
          }
        })
      }
    },
    computed: {
      ...mapGetters([
        'web',
        'selectedTab'
      ])
    },
    mounted () {
      let webview = document.querySelector('#web' + this.index)
      webview.addEventListener('dom-ready', () => {
        this.setVuex(this.setWebview, { webview: webview })
        this.setWebviewControls(webview)

        webview.addEventListener('load-commit', () => {
          this.setWebviewControls(webview)
        })

        // Cannot do actions when the page isn't loaded
        webview.addEventListener('did-start-loading', () => {
          this.setVuex(this.setWebCan, {
            can: {
              back: false,
              forward: false,
              reload: false
            }
          })
        })

        webview.addEventListener('new-window', (event) => {
        })
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/global.scss';

  .webview {
    height: 100%;
    width: 100%;
    display: inline-flex;
  }
</style>
