<template>
  <div class="bottom">
    <div class="columns control is-gapless">
      <div class="column is-8 no-drag tabs-parent">
        <div class="columns">
          <div class="tabs-scroller column is-12" @mousewheel.prevent="scroll($event)">
            <transition-group name="remove" tag="div" id="tabs" class="tabs start is-marginless">
              <div class="tab columns space-around is-gapless is-marginless" :class="{'selected': index === web.selectedTab, 'not-selected': index !== web.selectedTab}" v-for="(tab, index) in web.tabs" :key="tab.id" :value="index" @click="setSelectedTab(index)">
                <div class="column is-9 tab-title">
                  <transition name="scale">
                    <span v-if="!selectedTab.can.reload && index === web.selectedTab">
                      <clip-loader :color="'white'" :size="'1em'"></clip-loader>
                    </span>
                    <span v-else>
                      {{ tab.title }}
                    </span>
                  </transition>
                </div>
                <div class="column is-3">
                  <div @click.capture.stop="deleteTab(index)">
                    <font-awesome-icon :icon="icons.cross"/>
                  </div>
                </div>
              </div>
            </transition-group>
            <div id="scrollbar" class="scrollbar"></div>
          </div>
        </div>
      </div>

      <div class="column is-4">
        <div class="columns is-gapless end v-center text-center">
          <div class="column is-2">
            <tooltip-slider :min="0" :max="600" :interval=".1" :get="ball.radius" :set="setBallRadius" :icon="icons.dot"></tooltip-slider>
          </div>

          <div class="column is-2">
            <tooltip-slider :min=".1" :max="1" :interval=".01" :get="window.opacity" :set="setWindowOpacity" :icon="icons.opacity"></tooltip-slider>
          </div>

          <div class="column is-2" @click="toggleControlVisibility(win)">
            <div class="btn fa">
              <font-awesome-icon :icon="icons.eye"/>
            </div>
          </div>

          <div class="column is-2" @click="toggleWindowTop(win)">
            <div class="btn fa" :class="{'active': window.top}">
              <font-awesome-icon :icon="icons.windows"/>
            </div>
          </div>

          <div class="column is-2" @click="toggleWindowClick(win)">
            <div class="btn fa" :class="{'active': window.clickable}">
              <font-awesome-icon :icon="icons.click"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TooltipSlider from './TooltipSlider'
  import { ClipLoader } from 'vue-spinner/dist/vue-spinner.min.js'
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import VueSlider from 'vue-slider-component'
  import electron from '../scripts/imports/electron'
  import icons from '../scripts/imports/icons'
  import { mapGetters, mapActions } from 'vuex'
  import { ipcRenderer } from 'electron'

  const SCROLL = 10

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
        'toggleControlVisibility',
        'toggleWindowTop',
        'setBallRadius',
        'setWindowOpacity',
        'addWebTab',
        'setSelectedTab',
        'deleteWebTab'
      ]),
      scroll (event) {
        document.querySelector('#tabs').scrollLeft += (event.deltaY > 0 || event.deltaX > 0) ? SCROLL : -SCROLL
      },
      deleteTab (index) {
        this.deleteWebTab(index)
        if (this.web.tabs.length <= 0) {
          this.addWebTab()
        }
      }
    },
    computed: {
      ...mapGetters([
        'window',
        'ball',
        'web',
        'selectedTab',
        'control'
      ]),
      tabSelection: {
        get () { return this.web.selectedTab },
        set (val) { this.setSelectedTab(val) }
      }
    },
    mounted () {
      ipcRenderer.on('view', () => { this.toggleControlVisibility(this.win) })
      ipcRenderer.on('mouse', () => { this.toggleWindowClick(this.win) })
      ipcRenderer.on('top', () => { this.toggleControlVisibility(this.win) })
    },
    components: {
      VueSlider,
      FontAwesomeIcon,
      ClipLoader,
      TooltipSlider
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/global.scss';

  .tabs {
    border-radius: 8px;
    overflow: hidden;
  }

  .tabs-parent {
    overflow: hidden;
  }

  .tabs-scroller {
    overflow: hidden;
    position: relative;
    &:after {
      content: '';
      bottom: 0;
      right: 0;
      width: 50px;
      height: 100%;
      position: absolute;
      pointer-events: none;
      background: linear-gradient(to right, rgba(35,35,35,0) 0%, rgba(35,35,35,.8) 40%, rgba(35,35,35,1) 60%, rgba(35,35,35,1) 100%);
    }
  }

  .tab {
    transition: all .3s;
    font-size: 1.2em;
    padding: .4em 1em;
    cursor: pointer;
    min-width: 150px;
    .tab-title {
      margin-right: .5em;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-align: center;
    }
  }

  .selected {
    background: linear-gradient(135deg, #3d3d3d 0%,#4b4b4b 100%);
  }

  .bottom {
    bottom: 0;
  }
</style>
