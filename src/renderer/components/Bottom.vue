<template>
  <div class="bottom">
    <span class="side">
      <span class="text-white btn fa" @click="toggleControlVisibility(win)">
        <font-awesome-icon :icon="icons.eye"/>
      </span>

      <span :class="{'active': window.top}" class="text-white btn fa" @click="toggleWindowTop(win)">
        <font-awesome-icon :icon="icons.windows"/>
      </span>

      <span :class="{'active': window.clickable}" class="text-white btn fa" @click="toggleWindowClick(win)">
        <font-awesome-icon :icon="icons.click"/>
      </span>

      <span class="text-white btn fa" @click="addWebTab">
        <font-awesome-icon :icon="icons.plus"/>
      </span>
    </span>

    <span>
      <span class="tab" :class="{'selected': index === web.selectedTab}" v-for="(tab, index) in web.tabs" :key="index" :value="index" @click="setSelectedTab(index)">
        <span class="tab-title">
          {{ tab.title }}
        </span>
        <span v-if="web.tabs.length > 1" class="fa text-white" @click.capture.stop="deleteWebTab(index)">
          <font-awesome-icon :icon="icons.cross"/>
        </span>
      </span>
    </span>

    <span class="side">
      <span class="side">
        <vue-slider
        ref="slider"
        v-model="radius"
        :min="0"
        :max="350"
        :interval="1"
        :tooltip="false"
        width="100%">
        </vue-slider>

        <span class="text-white fa">
          <font-awesome-icon :icon="icons.dot"/>
        </span>
      </span>

      <span class="side">
        <vue-slider
        ref="slider"
        v-model="opacity"
        :min="0.1"
        :max="1"
        :interval=".01"
        :tooltip="false"
        width="100%">
        </vue-slider>
        <span class="text-white fa">
          <font-awesome-icon :icon="icons.opacity"/>
        </span>
      </span>
    </span>
  </div>
</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import VueSlider from 'vue-slider-component'
  import electron from '../scripts/imports/electron'
  import icons from '../scripts/imports/icons'
  import { mapGetters, mapActions } from 'vuex'
  import { ipcRenderer } from 'electron'

  export default {
    name: 'main-page',
    data () {
      return {
        win: electron.window,
        icons: icons
      }
    },
    methods: {
      ...mapActions([
        'toggleControlVisibility',
        'toggleWindowClick',
        'toggleWindowTop',
        'setBallRadius',
        'setWindowOpacity',
        'addWebTab',
        'setSelectedTab',
        'deleteWebTab'
      ])
    },
    computed: {
      ...mapGetters([
        'window',
        'ball',
        'web'
      ]),
      radius: {
        get () { return this.ball.radius },
        set (val) { this.setBallRadius(val) }
      },
      opacity: {
        get () { return this.window.opacity },
        set (val) { this.setWindowOpacity(val) }
      },
      tabSelection: {
        get () { return this.web.selectedTab },
        set (val) { this.setSelectedTab(val) }
      }
    },
    mounted () {
      ipcRenderer.on('view', () => { this.toggleControlVisibility(this.win) })
      ipcRenderer.on('mouse', () => { this.toggleWindowClick(this.win) })
      ipcRenderer.on('top', () => { this.toggleWindowTop(this.win) })
    },
    components: {
      VueSlider,
      FontAwesomeIcon
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/global.scss';

  .selected {
    background: rgba($color: white, $alpha: .2);
  }

  .tab {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    border-radius: .4em;
    padding: .3em 1em;
    font-size: 1.2em;
    height: 100%;
    cursor: pointer;
  }

  .bottom {
      position: absolute;
      bottom: 0;
  }
</style>
