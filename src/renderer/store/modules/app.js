const state = {
  src: 'www.youtube.com'
}

const mutations = {
  setSRC (state, val) {
    state.src = val
  }
}

const actions = {
  setSRC ({ commit }) {
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
