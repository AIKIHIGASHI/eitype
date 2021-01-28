import jsonWords from '@/assets/json/words.json'

export const state = () => ({
  answeredWords: [],
  myWords: [],
  sortMyWords: [],
  myWordsBefore: [],
  myWordsAfter: [],
  jsonWords,
  page1: 0,
  page2: 10,
  page3: 20,
  sort: true,
  fusenn: [
    {bool: true},
    {bool: false},
    {bool: false},
    {bool: false},
    {bool: false},
    {bool: false},
    {bool: false},
    {bool: false},
    {bool: false},
    {bool: false},
    {bool: false},
    {bool: false},
    {bool: false},
    {bool: false},
    {bool: false},
  ],
})

export const getters = {
  answeredWords: state => state.answeredWords,
  myWords: state => state.myWords,
  myWordsBefore: state => state.sort ? state.myWords.slice(state.page1, state.page2) : state.sortMyWords.slice(state.page1, state.page2),
  myWordsAfter: state => state.sort ? state.myWords.slice(state.page2, state.page3) : state.sortMyWords.slice(state.page2, state.page3),
  fusenn: state => state.fusenn,
  jsonWords: state => state.jsonWords,
  sort: state => state.sort
}

export const mutations = {
  pushAnsweredWord(state, answeredWord) {
    state.answeredWords.push(answeredWord)
  },
  deleteAnsweredWord(state) {
    state.answeredWords = []
  },
  getMyWords(state, words) {
    console.log('【2】【mutationsget】MyWords', words)
    state.myWords = words
  },
  deleteMyWords() {
    state.myWordsBefore = []
    state.myWordsAfter = []
    state.myWords = []
    console.log('deleteMyWords', state.myWords)
  },
  fusennClick(state, n) {
    state.fusenn[n - 1].bool = true
    switch (n) {
    case 1:
      state.page1 = 0
      state.page2 = 10
      state.page3 = 20
      break
    case 2:
      state.page1 = 20
      state.page2 = 30
      state.page3 = 40
      break
    case 3:
      state.page1 = 40
      state.page2 = 50
      state.page3 = 60
      break
    case 4:
      state.page1 = 60
      state.page2 = 70
      state.page3 = 80
      break
    case 5:
      state.page1 = 80
      state.page2 = 90
      state.page3 = 100
      break
    case 6:
      state.page1 = 100
      state.page2 = 110
      state.page3 = 120
      break
    case 7:
      state.page1 = 120
      state.page2 = 130
      state.page3 = 140
      break
    case 8:
      state.page1 = 140
      state.page2 = 150
      state.page3 = 160
      break
    case 9:
      state.page1 = 160
      state.page2 = 170
      state.page3 = 180
      break
    case 10:
      state.page1 = 180
      state.page2 = 190
      state.page3 = 200
      break
    case 11:
      state.page1 = 200
      state.page2 = 210
      state.page3 = 220
      break
    case 12:
      state.page1 = 220
      state.page2 = 230
      state.page3 = 240
      break
    case 13:
      state.page1 = 240
      state.page2 = 250
      state.page3 = 260
      break
    case 14:
      state.page1 = 260
      state.page2 = 270
      state.page3 = 280
      break
    case 15:
      state.page1 = 280
      state.page2 = 290
      state.page3 = 300
      break
    }
  },
  fusennReset(state) {
    for (let i = 0; i < state.fusenn.length; i++) {
      state.fusenn[i].bool = false
    }
  },
  sortMyWords(state) {
    const words = state.myWords.slice().sort(function(a, b){
      if (a.word < b.word) { return -1 }
      if (a.word > b.word) { return 1 }
      return 0
    })
    state.sortMyWords = words
    console.log(words)
  },
  sortToggle(state) {
    state.sort = !state.sort
  }
}

export const actions = {
  pushAnsweredWord({ commit }, answeredWord) {
    commit('pushAnsweredWord', answeredWord)
  },
  deleteAnsweredWord({ commit }) {
    commit('deleteAnsweredWord')
  },
  getMyWords({ commit, dispatch }, uid) {
    this.$firestore.collection('words').doc(uid).get()
      .then((docs) => {
        // if (!docs.exists) return
        console.log('【1】getMyWords成功', docs.data())
        const words = []
        for (let i = 0; i < 300 + 1; i++) {
          if (docs.data().words[i] === undefined) {
            words.push({name: '???', description: '???'})
          } else {
            words.push(docs.data().words[i])
          }
        }
        commit('getMyWords', words)
        dispatch('sortMyWords')
      })
      .catch((e) => {
        console.log('getMyWords失敗', e.message)
      })
  },
  deleteMyWords({ commit }) {
    commit('deleteMyWords')
  },
  submitAnsweredWord({ commit, getters }, uid) {
    if (!uid) {
      console.log('ログインしていないのでワードを送信しません')
      return
    }
    console.log('submitAnsweredWord')
    console.log()
    const answeredWords = getters.answeredWords
    const words = []
    answeredWords.forEach((word) => {
      words.push({
        word: word.answeredWord,
        description: word.description,
        created: word.created
      })
    })
    console.log(words)
    this.$firestore.collection('words').doc(uid).set({words: this.$firebase.firestore.FieldValue.arrayUnion(...words)}, { merge: true })
      .then(() => {
        console.log('submitAnsweredWord成功')
      })
      .catch((e) => {
        console.log(e.message)
      })
  },
  fusennClick({ commit }, n) {
    commit('fusennReset')
    commit('fusennClick', n)
  },
  sortMyWords({ commit }) {
    commit('sortMyWords')
  },
  sortToggle({ commit }) {
    commit('sortToggle')
  }
}
