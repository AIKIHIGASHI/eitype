<template>
  <div class="container" v-if="playing">
    <div class="navigation">
      <div class="return">Escキーでタイトル</div>
      <div class="time">
        残り時間
        <br >
        {{ time }}秒
      </div>
    </div>
    <div class="word-box">
      <div class="word">{{ newWords[index].name }}</div>
      <div class="word-jp">{{ newWords[index].description }}</div>
    </div>
    <div class="type-box">
      <div class="type">
        <span>{{ pressed }}<span style="color: white; opacity: 0.7;">{{ word }}</span></span>
      </div>
    </div>
    <div class="next-word-box">Next : {{ newWords[index + 1].name }}</div>
  </div>
  <div class="message" v-else>{{ message }}</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      id: null,
      index: 0,
      miss: 0,
      playing: false,
      correct: true,
      wrongChar: false,
      pressed: '',
      word: '',
      message: '開始！',
      time: 10,
      chars: [],
      newWords: [],
    }
  },
  async created() {
    this.playing = false
    await this.startCountDown()
    this.playing = true
    console.log('スタート')
    this.shuffle()
    this.countDown()
    this.word = this.newWords[this.index].name
    addEventListener('keydown', this.keyDown)
  },
  computed: {
    ...mapGetters('word', ['jsonWords'])
  },
  methods: {
    ...mapActions('word', ['pushAnsweredWord', ]),
    ...mapActions('score', ['incrementScore', ]),
    shuffle() {
      console.log(this.jsonWords)
      const words = this.jsonWords
      console.log(words)
      for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[j], words[i]] = [words[i], words[j]]
      }
      this.newWords = words
    },
    keyDown(e) {
      if (e.key === 'Escape') {
        console.log('エスケープ')
        removeEventListener('keydown', this.keyDown)
        clearInterval(this.id)
        this.$router.push('/')
        return
      }
      if (e.key !== this.word[0]) { // 間違えた時の処理
        const wrong = new Audio(require('~/assets/sounds/wrong.mp3'))
        wrong.play()
        wrong.volume = 0.2
        console.log(e.key, '間違えました')
        this.correct = false
        this.wrongChar = true
        return
      }
      const collect = new Audio(require('~/assets/sounds/collect.mp3'))
      collect.play()
      collect.volume = 0.3
      console.log(e.key)
      this.chars.push({char: e.key, wrongChar: this.wrongChar})
      this.wrongChar = false
      this.pressed += e.key
      this.word = this.word.slice(1)
      if (this.word.length === 0) { // 文字を入力し終えたときの処理
        console.log('【pushAnsweredWord実行】')
        if (this.correct) {
          this.incrementScore()
        }
        this.pushAnsweredWord({
          description: this.newWords[this.index].description,
          answeredWord: this.pressed,
          correct: this.correct,
          chars: this.chars// : [{char: e.key, this.wrongChar: false}]
        })
        this.chars = []
        this.correct = true
        this.pressed = ''
        this.index++
        this.word = this.newWords[this.index].name
      }
    },
    countDown() {
      this.id = setInterval(async () => {
        this.time--
        if (this.time <= 0) {
          clearInterval(this.id)
          this.$store.commit('audio/chime2Play')
          await this.endCountDown()
          console.log('result画面へ')
          this.$router.push('/result')
        }
      }, 1000)
    },
    startCountDown() {
      let count = 3
      return new Promise((resolve) => {
        const id = setInterval(() => {
          count--
          console.log(count)
          if (count <= 0) {
            clearInterval(id)
            resolve()
          }
        }, 1000)
      })
    },
    endCountDown() {
      this.playing = false
      this.message = '終了！'
      let count = 3
      return new Promise((resolve) => {
        const id = setInterval(() => {
          removeEventListener('keydown', this.keyDown)
          count--
          console.log(count)
          if (count <= 0) {
            clearInterval(id)
            resolve()
          }
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navigation {
  width: 100%;
  .return {
    float: left;
    padding: 0 40px;
  }
  .time {
    float: right;
    padding: 0 40px;
  }
}

.word-box {
  width: 100%;
  text-align: center;
  padding-top: 100px;
  .word {
    font-size: 100px;
  }
}

.type-box {
  width: 100%;
  padding-top: 150px;
  font-size: 50px;
  .type {
    margin: 0 250px;
    border-bottom: 2px solid white;
    opacity: 0.5;
    span {
      color: white;
    }
  }
}

.next-word-box {
  width: 100%;
  padding-top: 100px;
}

.message {
  font-size: 80px;
  margin-top: 250px;
}
</style>
