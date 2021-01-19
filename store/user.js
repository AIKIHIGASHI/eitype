export const state = () => ({
  user: null,
  score: 0
})

export const getters = {
  user: state => state.user,
  id: state => state.user.id,
  name: state => state.user ? state.user.displayName.substr(0, 6) : 'ゲスト',
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
    console.log('deleteUser')
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
  getUser({ commit }) {
    this.$fireAuth.onAuthStateChanged((user) => {
      if (!user) {
        console.log('userはいません')
        return
      }
      console.log('getUser', user)
      commit('getUser', user)
    })
  },
  logout({ commit }) {
    console.log('logout')
    this.$fireAuth.signOut()
      .then(() => {
        console.log('ログアウト成功')
        commit('deleteUser')
      })
      .catch((e) => {
        console.log('ログアウト失敗', e.message)
      })
  }
}
