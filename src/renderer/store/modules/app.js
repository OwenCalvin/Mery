const HEIGHT = 40
const MARGIN = 3
const URL = 'https://daven.io'
const URL_TEST = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/

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
}

const getters = {
  global: state => state,
  window: state => state.window,
  control: state => state.control,
  ball: state => state.ball,
  web: state => state.web
}

const mutations = {
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
  setBallPos (state, newPos) {
    state.ball.pos = newPos
  },
  setWebUrl (state, url) {
    let http = 'http://'
    let cond = url.substring(0, 7) === http || url.substring(0, 8) === 'https://'
    let httpURL = (cond ? '' : http) + url
    state.web.url = (URL_TEST.test(httpURL) ? httpURL : 'https://www.google.com/search?q=' + url)
  },
  setWebTitle (state, title) {
    state.web.title = title
  },
  setWebText (state, text) {
    state.web.text = text
  },
  setBallRadius (state, radius) {
    state.ball.radius = radius
  },
  setWindowOpacity (state, opacity) {
    state.window.opacity = opacity
  },
  setWebview (state, webview) {
    state.web.webview = webview
  },
  setWebCan (state, can) {
    state.web.can = can
  }
}

const actions = {
  toggleControlVisibility ({ commit }, window) { commit('toggleControlVisibility', window) },
  toggleWindowTop ({ commit }, window) { commit('toggleWindowTop', window) },
  toggleWindowClick ({ commit }, window) { commit('toggleWindowClick', window) },
  setBallPos ({ commit }, newPos) { commit('setBallPos', newPos) },
  setWebUrl ({ commit }, url) { commit('setWebUrl', url) },
  setWebTitle ({ commit }, url, title) { commit('setWebTitle', url, title) },
  setWebText ({ commit }, url, text) { commit('setWebText', url, text) },
  setBallRadius ({ commit }, radius) { commit('setBallRadius', radius) },
  setWindowOpacity ({ commit }, opacity) { commit('setWindowOpacity', opacity) },
  setWebview ({ commit }, webview) { commit('setWebview', webview) },
  setWebCan ({ commit }, can) { commit('setWebCan', can) }
}

export default {
  state,
  getters,
  mutations,
  actions
}
