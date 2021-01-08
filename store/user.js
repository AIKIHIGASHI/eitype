export const state = () => ({
  name: 'ゲスト',
  score: 0
})

export const getters = {
  name: state => state.name,
  score: state => state.score
}

export const mutations = {
  incrementScore(state) {
    state.score += 10;
  },
  resetScore(state) {
    state.score = 0
  }
}

export const actions = {
  incrementScore({ commit }) {
    commit('incrementScore');
  },
  resetScore({ commit }) {
    commit('resetScore');
  }
}