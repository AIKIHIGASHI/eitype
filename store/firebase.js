export const actions = {
  submit({ commit }) {
    console.log('送信')
    const db = this.$firestore
    db.collection('user').add({ name: 'hoge' })
      .then(() => {
        console.log('成功')
      })
      .catch((e) => {
        console.log('失敗')
        console.log(e.message)
      })
  },
}
