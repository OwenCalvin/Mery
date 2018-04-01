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

    <span class="tabs" @click.self.prevent="tabs = true" @mouseover="tabs = true" @mouseout="tabs = false">
      <span class="tab selected">
        <span class="tab-title">
          {{ selectedTab.title }}
        </span>
      </span>
      <span class="mouseDetect">
        <span class="hiddenTabs" v-if="tabs && web.tabs.length > 1">
          <span :class="{'selected' : index === web.selectedTab}" class="tab" v-for="(tab, index) in web.tabs" :key="tab.id" :value="index" @click="setSelectedTab(index)">
            <span class="tab-title">
              {{ tab.title }}
            </span>
            <span v-if="web.tabs.length > 1" class="text-white" @click.capture.stop="deleteWebTab(index)">
              <font-awesome-icon :icon="icons.cross"/>
            </span>
          </span>
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
        tabs: false,
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
        'web',
        'selectedTab',
        'control'
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

  .tabs {
    height: auto;
    align-items: center;
    justify-content: center;
    display: flex;
    width: 30%;
    height: 100%;
    flex-wrap: nowrap;
  }

  .mouseDetect {
    width: 30%;
    position: fixed;
    bottom: 0;
    padding-bottom: 3em;
  }

  .hiddenTabs {
    box-shadow: 0px 6px 37px 3px rgba(0,0,0,0.19);
    background: rgb(70, 70, 70);
    flex-direction: column;
    display: flex;
    align-items: center;
    padding: .5em 2em;
    border-radius: .3em;
    .tab {
      width: 100%;
      margin: .3em 0;
      background: rgba($color: white, $alpha: .05);
    }
  }

  .tab {
    font-size: 1.2em;
    padding: .3em 1em;
    cursor: pointer;
    display: flex;
    width: 60%;
    border-radius: .4em;
    .tab-title {
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-align: center;
    }
    .tab {
      border-bottom: 2px solid white;
    }
  }

  .selected {
    background: rgba($color: white, $alpha: .2) !important;
  }

  .bottom {
    position: absolute;
    bottom: 0;
  }
</style>
