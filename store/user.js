export const state = () => ({
  id: '',
  name: '',
  score: 0
})

export const getters = {
  name: state => state.name,
  score: state => state.score
}

export const mutations = {
  incrementScore(state) {
    state.score += 10
  },
  resetScore(state) {
    state.score = 0
  },
  getUser(state, { uid, displayName }) {
    console.log(uid)
    console.log(displayName)
    state.id = uid
    state.name = displayName
  }
}

export const actions = {
  incrementScore({ commit }) {
    commit('incrementScore')
  },
  resetScore({ commit }) {
    commit('resetScore')
  },
  getUser({ commit }) {
    this.$fireAuth.onAuthStateChanged((user) => {
      console.log('getUser', user)
      commit('getUser', user)
    })
  }
}
