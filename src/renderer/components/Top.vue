<template>
  <div class="top">
    <div class="columns is-gapless control space-around">
      <div class="column is-2">
        <div class="columns">
          <div class="column is-3 btn fa" :class="{'disable': !selectedTab.can.back}" @click="goBack">
            <font-awesome-icon :icon="icons.left"/>
          </div>
          <div class="column is-3 btn fa" :class="{'disable': !selectedTab.can.forward}" @click="goForward">
            <font-awesome-icon :icon="icons.right"/>
          </div>
          <div class="column is-3 text-white btn fa" :class="{'disable': !selectedTab.can.reload, 'loading': !selectedTab.can.reload}" @click="reload">
            <font-awesome-icon :icon="icons.reload"/>
          </div>
        </div>
      </div>

      <div class="column is-6">
        <div class="columns is-gapless">
          <div class="column is-11">
            <input
            class="text-normal"
            type="text"
            @blur="setFocus(false)"
            @focus="setFocus(true, $event)"
            @keypress.enter="goTo"
            v-model="url"/>
          </div>
          <div class="column is-1" @click="addWebTab">
            <div class="btn fa">
              <font-awesome-icon :icon="icons.plus"/>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-2">
        <div class="columns end">
          <div class="column is-3 btn fa">
            <font-awesome-icon :icon="icons.minimize" @click="minimizeWindow"/>
          </div>
          <div class="column is-3 btn fa">
            <font-awesome-icon :icon="icons.cross" @click="closeWindow"/>
          </div>
        </div>
      </div>
    </div>
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
        'setWebText',
        'addWebTab'
      ]),
      setFocus (val, event = null) {
        this.focused = val
        if (event) {
          event.target.select()
        }
      },
      closeWindow () { WINDOW.close() },
      minimizeWindow () { WINDOW.minimize() },
      goTo () {
        this.setWebUrl({
          url: this.selectedTab.text,
          index: this.web.selectedTab
        })
      },
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
        set (val) {
          this.setWebText({
            text: val,
            index: this.web.selectedTab
          })
        }
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
