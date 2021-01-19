import jsonWords from '@/assets/json/words.json'

export const state = () => ({
  answeredWords: [],
  jsonWords
})

export const getters = {
  answeredWords: state => state.answeredWords,
  jsonWords: state => state.jsonWords
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
