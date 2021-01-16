export const state = () => ({
  answeredWords: []
})

export const getters = {
  answeredWords: state => state.answeredWords
}

export const mutations = {
  pushAnsweredWord(state, answeredWord) {
    state.answeredWords.push(answeredWord)
  },
  deleteAnsweredWord(state) {
    state.answeredWords = []
  }
}

export const actions = {
  pushAnsweredWord({ commit }, answeredWord) {
    commit('pushAnsweredWord', answeredWord)
  },
  deleteAnsweredWord({ commit }) {
    commit('deleteAnsweredWord')
  }
}
