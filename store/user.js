export const state = () => ({
  user: null,
  score: 0
})

export const getters = {
  user: state => state.user,
  id: state => state.user ? state.user.uid : null,
  name: state => state.user ? state.user.displayName : 'ゲスト',
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
    state.user = { uid, displayName }

  },
  deleteUser(state) {
    state.user = null
  }
}

export const actions = {
  incrementScore({ commit }) {
    commit('incrementScore')
  },
  resetScore({ commit }) {
    commit('resetScore')
  },
  getUser({ commit, dispatch }) {
    this.$fireAuth.onAuthStateChanged((user) => {
      if (!user) return
      commit('getUser', user)
      dispatch('word/getMyWords', user.uid, { root: true })
    })
  },
  logout({ commit }) {
    this.$fireAuth.signOut()
      .then(() => {
        commit('deleteUser')
      })
      .catch((e) => {
        console.log('ログアウト失敗', e.message)
      })
  }
}
