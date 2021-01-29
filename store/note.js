export const state = () => ({
  redNote: false,
  blueNote: false,
  yellowNote: false,
  greenNote: false,
  purpleNote: false,
})

export const getters = {
  redNote: state => state.redNote,
  blueNote: state => state.blueNote,
  yellowNote: state => state.yellowNote,
  greenNote: state => state.greenNote,
  purpleNote: state => state.purpleNote,
}

export const mutations = {
  redNoteOpen(state) {
    state.redNote = !state.redNote
  },
  blueNoteOpen(state) {
    state.blueNote = !state.blueNote
  },
  yellowNoteOpen(state) {
    state.yellowNote = !state.yellowNote
  },
  greenNoteOpen(state) {
    state.greenNote = !state.greenNote
  },
  purpleNoteOpen(state) {
    state.purpleNote = !state.purpleNote
  },
  loginAfterNoteClose(state) {
    state.redNote = false
    state.blueNote = false
    state.yellowNote = false
  }
}

export const actions = {
  redNoteOpen({ commit }) {
    commit('redNoteOpen')
  },
  blueNoteOpen({ commit, dispatch }) {
    commit('blueNoteOpen')
    dispatch('error/deleteErrorMessage', null, { root: true })
  },
  yellowNoteOpen({ commit }) {
    commit('yellowNoteOpen')
    dispatch('error/deleteErrorMessage', null, { root: true })
  },
  greenNoteOpen({ commit }) {
    commit('greenNoteOpen')
  },
  purpleNoteOpen({ commit }) {
    commit('purpleNoteOpen')
  },
  loginAfterNoteClose({ commit }) {
    commit('loginAfterNoteClose')
  },
}
