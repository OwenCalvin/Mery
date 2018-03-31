const HEIGHT = 40
const MARGIN = 3
const URL = 'https://daven.io'
const URL_TEST = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/
const DEFAULT_TAB = {
  can: {
    back: false,
    forward: false,
    reload: false
  },
  title: null,
  text: URL,
  url: URL,
  webview: null
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
    tabs: [ DEFAULT_TAB ]
  }
}

const getters = {
  global: state => state,
  window: state => state.window,
  control: state => state.control,
  ball: state => state.ball,
  web: state => state.web,
  selectedTab: State => state.web.tabs[state.web.selectedTab]
}

const mutations = {
  // Web
  setWebUrl (state, url, tab = state.web.selectedTab) {
    let http = 'http://'
    let cond = url.substring(0, 7) === http || url.substring(0, 8) === 'https://'
    let httpURL = (cond ? '' : http) + url
    state.web.tabs[tab].url = (URL_TEST.test(httpURL) ? httpURL : 'https://www.google.com/search?q=' + url)
  },
  setWebTitle (state, title, tab = state.web.selectedTab) {
    state.web.tabs[tab].title = title
  },
  setWebText (state, text, tab = state.web.selectedTab) {
    state.web.tabs[tab].text = text
  },
  setWebview (state, webview, tab = state.web.selectedTab) {
    state.web.tabs[tab].webview = webview
  },
  setWebCan (state, can, tab = state.web.selectedTab) {
    state.web.tabs[tab].can = can
  },
  addWebTab (state, number = 1) {
    for (let i = 0; i <= number; i++) {
      state.web.tabs.push(DEFAULT_TAB)
    }
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
  setWebUrl ({ commit }, tab, url) { commit('setWebUrl', tab, url) },
  setWebTitle ({ commit }, tab, title) { commit('setWebTitle', tab, title) },
  setWebText ({ commit }, tab, text) { commit('setWebText', tab, text) },
  setWebview ({ commit }, tab, webview) { commit('setWebview', tab, webview) },
  setWebCan ({ commit }, tab, can) { commit('setWebCan', tab, can) },
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
