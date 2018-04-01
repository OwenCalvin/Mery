const HEIGHT = 40
const MARGIN = 3
const URL = 'https://daven.io'
const URL_TEST = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/

let tabId = 0

function getNewTab (id) {
  return {
    can: {
      back: false,
      forward: false,
      reload: false
    },
    id: id,
    title: '...',
    text: URL,
    url: URL,
    webview: null
  }
}

const state = {
  // State of the window
  window: {
    opacity: 0.9,
    clickable: true,
    top: true
  },
  // Top and bottom state
  control: {
    visible: true,
    height: HEIGHT,
    margin: MARGIN,
    totalHeight: HEIGHT + MARGIN
  },
  // State of the ball
  ball: {
    radius: 200,
    pos: {
      x: 0,
      y: 0
    }
  },
  // State of the Viewer (Browser)
  web: {
    selectedTab: 0,
    tabs: [ getNewTab(tabId) ]
  }
}

const getters = {
  global: state => state,
  window: state => state.window,
  control: state => state.control,
  ball: state => state.ball,
  web: state => state.web,
  selectedTab: state => state.web.tabs[state.web.selectedTab]
}

const mutations = {
  // Web
  setWebUrl (state, params) {
    let http = 'http://'
    let cond = params.url.substring(0, 7) === http || params.url.substring(0, 8) === 'https://'
    let httpURL = (cond ? '' : http) + params.url
    state.web.tabs[params.index].url = (URL_TEST.test(httpURL) ? httpURL : 'https://www.google.com/search?q=' + params.url)
  },
  setWebTitle (state, params) {
    state.web.tabs[params.index].title = params.title
  },
  setWebText (state, params) {
    state.web.tabs[params.index].text = params.text
  },
  setWebview (state, params) {
    state.web.tabs[params.index].webview = params.webview
  },
  setWebCan (state, params) {
    state.web.tabs[params.index].can = params.can
  },
  setSelectedTab (state, index) {
    if (index !== state.web.selectedTab) {
      state.web.selectedTab = parseInt(index)
    }
  },
  addWebTab (state) {
    tabId++
    state.web.tabs.push(getNewTab(tabId))
    state.web.selectedTab = state.web.tabs.length - 1
  },
  deleteWebTab (state, index) {
    let tab = state.web.tabs[index]
    if (tab.webview.isDevToolsOpened()) {
      tab.webview.closeDevTools()
    }
    tab.webview.stop()
    state.web.tabs.splice(index, 1)
    state.web.selectedTab = 0
  },
  // Window
  toggleControlVisibility (state, window) {
    state.control.visible = !state.control.visible
    window.setResizable(state.control.visible)
  },
  toggleWindowClick (state, window) {
    state.window.clickable = !state.window.clickable
  },
  toggleWindowTop (state, window) {
    state.window.top = !state.window.top
    window.setAlwaysOnTop(state.window.top)
  },
  setWindowOpacity (state, opacity) {
    state.window.opacity = opacity
  },
  // Ball
  setBallPos (state, newPos) {
    state.ball.pos = newPos
  },
  setBallRadius (state, radius) {
    state.ball.radius = radius
  }
}

const actions = {
  // Web
  setWebUrl ({ commit }, params) { commit('setWebUrl', params) },
  setWebTitle ({ commit }, params) { commit('setWebTitle', params) },
  setWebText ({ commit }, params) { commit('setWebText', params) },
  setWebview ({ commit }, params) { commit('setWebview', params) },
  setWebCan ({ commit }, params) { commit('setWebCan', params) },
  setSelectedTab ({ commit }, index) { commit('setSelectedTab', index) },
  addWebTab ({ commit }, number) { commit('addWebTab', number) },
  deleteWebTab ({ commit }, index) { commit('deleteWebTab', index) },
  // Window
  toggleControlVisibility ({ commit }, window) { commit('toggleControlVisibility', window) },
  toggleWindowTop ({ commit }, window) { commit('toggleWindowTop', window) },
  toggleWindowClick ({ commit }, window) { commit('toggleWindowClick', window) },
  setWindowOpacity ({ commit }, opacity) { commit('setWindowOpacity', opacity) },
  // Ball
  setBallPos ({ commit }, newPos) { commit('setBallPos', newPos) },
  setBallRadius ({ commit }, radius) { commit('setBallRadius', radius) }

}

export default {
  state,
  getters,
  mutations,
  actions
}
