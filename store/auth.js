
export const actions = {
  twitterLogin({ dispatch }) {
    const provider = new this.$firebase.auth.TwitterAuthProvider()
    this.$fireAuth.signInWithPopup(provider)
      .then((result) => {
        dispatch('note/loginAfterNoteClose', null, { root: true })
        dispatch('word/submitAnsweredWord', result.user.uid, { root: true })
      })
      .catch((e) => {
        console.log(e.message)
        console.log('twitterLogin失敗')
      })
  },
  googleLogin({ dispatch }) {
    console.log('test')
    const provider = new this.$firebase.auth.GoogleAuthProvider()
    this.$fireAuth.signInWithPopup(provider)
      .then((result) => {
        dispatch('note/loginAfterNoteClose', null, { root: true })
        dispatch('word/submitAnsweredWord', result.user.uid, { root: true })
      })
      .catch((e) => {
        console.log(e.message)
        console.log('googleLogin失敗')
      })
  },
  login({ dispatch }, user) {
    this.$fireAuth.signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        dispatch('error/deleteErrorMessage', null, { root: true })
        dispatch('note/loginAfterNoteClose', null, { root: true })
      })
      .catch((e) => {
        console.log('ログイン失敗', e.message)
        dispatch('error/errorMessage', e, { root: true })
      })
  },
  register({ dispatch }, user) {
    this.$fireAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        dispatch('note/loginAfterNoteClose', null, { root: true })
        dispatch('word/submitAnsweredWord', result.user.uid, { root: true })
        result.user.updateProfile({
          displayName: user.name,
        })
          .then(() => {
            dispatch('error/deleteErrorMessage', null, { root: true })
            dispatch('user/getUser', null, { root: true })
          })
          .catch((e) => {
            console.log('名前設定失敗', e.message)
            dispatch('error/errorMessage', e, { root: true })
          })
      })
      .catch((e) => {
        console.log('新規登録失敗', e.message)
        dispatch('error/errorMessage', e, { root: true })
      })
  },

}
