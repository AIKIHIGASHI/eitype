<template>
  <div class="container">
    <section>〜結果発表〜</section>
    <div class="result-box">
      <div class="left-box">
        <div class="retry">&nbsp;&nbsp;&nbsp;&nbsp;リトライ : Enterキー</div>
        <div class="esc">タイトル : Escキー</div>
        <a
          class="tweet"
          :href="tweet "
          target="_blank"><font-awesome-icon :icon="['fab', 'twitter']" />
          結果をツイートする</a>
      </div>
      <div class="right-box">
        <div class="answer-sheet">
          <div>解答用紙</div>
          <div class="name-box">
            <div style="width: 20%">氏名</div>
            <div style="width: 55%" class="name">{{ name.slice(0, 6) }}</div>
            <div style="width: 20%">得点</div>
            <div style="width: 25%">
              <span class="score">{{ score }}</span>
            </div>
          </div>
          <div class="answers">
            <table
              border="1"
              v-for="(word, index) in answeredWords"
              :key="word.id">
              <thead>
                <tr>
                  <th>({{ index + 1 }})</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span class="circle" v-if="word.correct" /><span
                      v-for="char in word.chars"
                      :key="char.id"><span :class="{ wrong: char.wrongChar }">{{
                        char.char
                      }}</span></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      chime2: new Audio(require('~/assets/sounds/chime2.mp3')),
    }
  },
  created() {
    this.submitScore({ name: this.name, score: this.score })
    this.submitAnsweredWord(this.id)
    addEventListener('keydown', this.command)
  },
  computed: {
    ...mapGetters('word', ['answeredWords']),
    ...mapGetters('user', ['name', 'id']),
    ...mapGetters('score', ['score']),
    tweet() {
      return 'https://twitter.com/intent/tweet?text='+
      encodeURIComponent(
        '今回の点数は' + this.score + '点でした！お疲れさまです！' + '\nhttps://eitype-dc9f3.web.app/\n'
      ) + '&hashtags=英タイプ'
    }
  },
  methods: {
    ...mapActions('word', ['deleteAnsweredWord', 'submitAnsweredWord']),
    ...mapActions('score', ['resetScore', 'submitScore']),
    command(e) {
      if (e.key === 'Enter') {
        this.deleteAnsweredWord()
        this.resetScore()
        this.$store.commit('audio/chime2Stop')
        this.$store.commit('audio/chime1Play')
        this.retry()
      }
      if (e.key === 'Escape') {
        this.$store.commit('audio/chime2Stop')
        this.deleteAnsweredWord()
        this.resetScore()
        this.title()
      }
    },
    retry() {
      removeEventListener('keydown', this.command)
      this.$router.push('/play')
    },
    title() {
      removeEventListener('keydown', this.command)
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
section {
  font-size: 50px;
}

.result-box {
  display: flex;
  .left-box {
    width: 100%;
    height: 600px;
    .retry {
      padding-top: 200px;
    }
    .esc {
      padding-top: 20px;
    }
    .tweet {
      margin-top: 90px;
      display: inline-block;
      color: rgba(135, 207, 235, 0.705);
      border-bottom: 0px solid;
      text-decoration: none;
      opacity: 0.7;
      &:hover {
        opacity: 1;
        border-bottom: 2px solid;
      }
    }
  }
  .right-box {
    width: 100%;
    height: 600px;
    .answer-sheet {
      font-family: "游明朝体", "";
      width: 440px;
      height: 540px;
      margin-top: 20px;
      background: rgb(255, 255, 255);
      color: black;
      padding: 10px;
      box-shadow: 20px 20px rgba(0, 0, 0, 0.63);
      .name-box {
        border: 2px solid black;
        margin: 5px 0px 20px;
        font-size: 15px;
        display: flex;
        position: relative;
        .name {
          font-family: "Wawati SC";
          color: gray;
        }
        .score {
          font-size: 40px;
          font-weight: bold;
          position: absolute;
          color: red;
          top: -20px;
          right: 20px;
          transform: rotate(10deg);
        }
        div {
          border-right: 1px solid;
          border-left: 1px solid;
        }
      }
      .answers {
        height: 420px;
        overflow-y: scroll;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        table {
          border-collapse: collapse;
          border-spacing: 0;
          border-color: black;
          width: 24.98%;
          margin-bottom: 20px;
        }
        th {
          font-size: 12px;
        }
        td {
          font-family: "Wawati SC";
          color: gray;
          font-size: 15px;
          padding: 10px;
          position: relative;
          .circle {
            border: 5px solid red;
            display: inline-block;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            position: absolute;
            top: 0;
            left: 0;
          }
          .wrong {
            color: red;
          }
        }
      }
    }
  }
}
</style>
