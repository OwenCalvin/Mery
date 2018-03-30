<template>
  <div class="top">
    <span class="left side">
      <span class="text-white btn fa" :class="{'disable': !web.can.back}" @click="goBack">
        <font-awesome-icon :icon="icons.left"/>
      </span>
      <span class="text-white btn fa" :class="{'disable': !web.can.forward}" @click="goForward">
        <font-awesome-icon :icon="icons.right"/>
      </span>
      <span class="text-white btn fa" :class="{'disable': !web.can.refresh}" @click="reload">
        <font-awesome-icon :icon="icons.reload"/>
      </span>
    </span>
    <span class="drag"></span>
    <span class="side input">
      <input type="text" class="input-text" @keypress.enter="setWebUrl(url)" v-model="url">
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
  </div>
</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import electron from '../scripts/imports/electron'
  import icons from '../scripts/imports/icons'
  import { mapGetters, mapActions } from 'vuex'

  const WINDOW = electron.window

  export default {
    name: 'top',
    data: function () {
      return {
        icons: icons,
        url: null
      }
    },
    methods: {
      ...mapActions(['setWebUrl']),
      closeWindow () { WINDOW.close() },
      minimizeWindow () { WINDOW.minimize() },
      goBack () {
        if (this.web.can.back) {
          this.web.webview.goBack()
        }
      },
      goForward () {
        if (this.web.can.forward) {
          this.web.webview.goForward()
        }
      },
      reload () {
        if (this.web.can.refresh) {
          this.web.webview.reload()
        }
      }
    },
    computed: {
      ...mapGetters([
        'window',
        'ball',
        'web',
        'control'
      ])
    },
    mounted: function () {
      this.url = this.web.url
    },
    components: {
      FontAwesomeIcon
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mainpage.scss';
</style>
