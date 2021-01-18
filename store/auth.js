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
  twitterLogin({ commit, dispatch }) {
    const provider = new this.$firebase.auth.TwitterAuthProvider()
    this.$fireAuth.signInWithPopup(provider)
      .then((result) => {
        console.log(result)
        console.log('twitterLogin成功')
        dispatch('note/loginAfterNoteClose', null, { root: true })
      })
      .catch((e) => {
        console.log(e.message)
        console.log('twitterLogin失敗')
      })
  },
  googleLogin({ commit, dispatch }) {
    console.log('test')
    const provider = new this.$firebase.auth.GoogleAuthProvider()
    this.$fireAuth.signInWithPopup(provider)
      .then((result) => {
        console.log(result)
        console.log('googleLogin成功')
        dispatch('note/loginAfterNoteClose', null, { root: true })
      })
      .catch((e) => {
        console.log(e.message)
        console.log('googleLogin失敗')
      })
  },
  login({ commit, dispatch }, user) {
    console.log('login')
    this.$fireAuth.signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        console.log('ログイン成功', result)
        dispatch('note/loginAfterNoteClose', null, { root: true })
      })
      .catch((e) => {
        console.log('ログイン失敗', e.message)
      })
  },
  register({ commit, dispatch }, user) {
    console.log('Register', user)
    this.$fireAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        console.log('新規登録成功', result)
        dispatch('note/loginAfterNoteClose', null, { root: true })
        console.log('updateProfile')
        result.user.updateProfile({
          displayName: user.name,
        })
          .then((result) => {
            console.log('名前設定完了', result)
            dispatch('user/getUser', null, { root: true })
          })
          .catch((e) => {
            console.log('名前設定失敗', e.message)
          })
      })
      .catch((e) => {
        console.log('新規登録失敗', e.message)
      })
  },

}
