export const state = () => ({
  score: 0,
  beforeScores: [],
  afterScores: [],
})

export const getters = {
  score: state => state.score,
  beforeScores: state => state.beforeScores,
  afterScores: state => state.afterScores
}

export const mutations = {
  incrementScore(state) {
    state.score += 10
  },
  resetScore(state) {
    state.score = 0
  },
  getScore(state, scores) {
    // 各ユーザーのスコア上位20までにする
    // ランク同率時の処理
    let rank = 1
    let count = 0
    for (let i = 0; i < 20; i++) {
      count++
      scores[i].rank = rank
      if (scores[i].score !== scores[i + 1].score) {
        rank += count
        count = 0
      }
    }
    console.log(scores)
    for (let i = 0; i < 10; i++) {
      state.beforeScores.push(scores[i])
    }
    for (let i = 10; i < 20; i++) {
      state.afterScores.push(scores[i])
    }
  },
  deleteScores(state) {
    state.beforeScores = []
    state.afterScores = []
  }
}

export const actions = {
  // ゲーム終了後にスコアを10プラスする
  incrementScore({ commit }) {
    commit('incrementScore')
  },
  // スコアをリセットする
  resetScore({ commit }) {
    commit('resetScore')
  },
  // 合計スコアをfirestoreに保存する
  submitScore({ commit }, score) {
    console.log('submitScore')
    this.$firestore.collection('score').add({ name: score.name, score: score.score})
      .then(() => {
        console.log('submitScore成功')
      })
      .catch((e) => {
        console.log('submitScore失敗', e.message)
      })
  },
  // 各ユーザーのスコアを取得する(ランキング用)
  getScore({ commit }) {
    console.log('getScore')
    this.$firestore.collection('score').orderBy('score', 'desc').get()
      .then((docs) => {
        console.log('getScore', docs)
        const scores = []
        docs.forEach((doc) => {
          scores.push(doc.data())
        })
        commit('getScore', scores)
      })
      .catch((e) => {
        console.log('getScore失敗', e.message)
      })
  },
  // ランキングを初期化する
  deleteScores({ commit }) {
    commit('deleteScores')
  }
}
