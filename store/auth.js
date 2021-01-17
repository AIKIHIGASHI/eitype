export const state = () => ({
  redNote: false,
})

export const getters = {
  redNote: state => state.redNote,
}

export const mutations = {
  redNoteOpen(state) {
    state.redNote = !state.redNote
  },
}

export const actions = {
  twitterLogin({ commit }) {
    const provider = new this.$firebase.auth.TwitterAuthProvider()
    this.$fireAuth.signInWithPopup(provider)
      .then((result) => {
        console.log(result)
        console.log('成功')
        location.reload()
      })
      .catch((error) => {
        console.log(error.message)
        console.log('失敗')
      })
  },
  googleLogin({ commit }) {
    console.log('test')
    const provider = new this.$firebase.auth.GoogleAuthProvider()
    this.$fireAuth.signInWithPopup(provider)
      .then((result) => {
        console.log(result)
        console.log('成功')
        location.reload()
      })
      .catch((error) => {
        console.log(error.message)
        console.log('失敗')
      })
  },
  login({ commit }) {
    console.log('mailLogin')
  },
  register({ commit }) {
    console.log('twitterRegister')
  },

}
