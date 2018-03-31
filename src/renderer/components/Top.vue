<template>
  <div class="top">
    <span class="left side">
      <span class="text-white btn fa" :class="{'disable': !selectedTab.can.back}" @click="goBack">
        <font-awesome-icon :icon="icons.left"/>
      </span>
      <span class="text-white btn fa" :class="{'disable': !selectedTab.can.forward}" @click="goForward">
        <font-awesome-icon :icon="icons.right"/>
      </span>
      <span class="text-white btn fa" :class="{'disable': !selectedTab.can.reload, 'loading': !selectedTab.can.reload}" @click="reload">
        <font-awesome-icon :icon="icons.reload"/>
      </span>
    </span>
    <span class="drag"></span>
    <span class="side input">
      <input
      type="text"
      class="input-text"
      @blur="setFocus(false)"
      @focus="setFocus(true, $event)"
      @keypress.enter="setWebUrl(selectedTab.text)"
      v-model="url">
    </span>
    <span class="drag"></span>
    <span class="right side">
      <span class="text-white btn fa">
        <font-awesome-icon :icon="icons.settings"/>
      </span>
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
    data () {
      return {
        focused: false,
        icons: icons
      }
    },
    methods: {
      ...mapActions([
        'setWebUrl',
        'setWebText'
      ]),
      setFocus (val, event = null) {
        this.focused = val
        if (event) {
          event.target.select()
        }
      },
      closeWindow () { WINDOW.close() },
      minimizeWindow () { WINDOW.minimize() },
      goBack () {
        if (this.selectedTab.can.back) {
          this.selectedTab.webview.goBack()
        }
      },
      goForward () {
        if (this.selectedTab.can.forward) {
          this.selectedTab.webview.goForward()
        }
      },
      reload () {
        if (this.selectedTab.can.reload) {
          this.selectedTab.webview.reload()
        }
      }
    },
    computed: {
      ...mapGetters([
        'window',
        'ball',
        'web',
        'control',
        'selectedTab'
      ]),
      url: {
        get () { return this.selectedTab.text },
        set (val) { this.setWebText(val) }
      }
    },
    components: {
      FontAwesomeIcon
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/global.scss';

  .loading {
    animation: rotate 1s infinite;
  }
</style>
