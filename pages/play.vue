<template>
  <div class="container" v-if="playing">
    <div class="navigation">
      <div class="return">Escキーでタイトル</div>
      <div class="time">
        残り時間
        <br />
        {{ time }}秒
      </div>
    </div>
    <div class="word-box">
      <div class="word">{{newWords[index].word}}</div>
      <div class="word-jp">{{newWords[index].translation}}</div>
    </div>
    <div class="type-box">
      <div class="type">
        <span>{{ pressed }}</span>
        {{ word }}
      </div>
    </div>
    <div class="next-word-box">Next : {{ newWords[index + 1].word }}</div>
  </div>
</template>

<script>
import sound from '~/assets/sounds/wrong.mp3'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      index: 0,
      miss: 0,
      playing: false,
      correct: true,
      wrongChar: false,
      pressed: '',
      word: '',
      time: 10,
      chars: [],
      newWords: [],
      words: [
        {word: 'about', translation: '〜について'},
        {word: 'anyone', translation: '誰か'},
        {word: 'anything', translation: '何か'},
        {word: 'arrive', translation: '到着する'},
        {word: 'art', translation: '芸術'},
        {word: 'ask', translation: '尋ねる'},
        {word: 'aunt', translation: 'おば'},
        {word: 'back', translation: '後ろに'},
        {word: 'bad', translation: '悪い'},
        {word: 'beautiful', translation: '美しい'},
      ]
    }
  },
  async created() {
    this.playing = false;
    await this.startCountDown()
    this.playing = true;
    console.log('スタート')
    this.shuffle();
    // this.countDown();
    this.word = this.newWords[this.index].word;
    addEventListener('keydown', this.keyDown);
  },
  methods: {
    ...mapActions('word', ['pushAnsweredWord',]),
    ...mapActions('user', ['incrementScore',]),
    shuffle() {
      const words = this.words 
      for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[j], words[i]] = [words[i], words[j]];
      }
      this.newWords = words;
    },
    keyDown(e) {
        if (e.key === 'Escape') {
          removeEventListener('keydown', this.keyDown)
          this.$router.push('/');
          return;
        }
        if (e.key !== this.word[0]) {                    // 間違えた時の処理
          const wrong = new Audio(require("~/assets/sounds/wrong.mp3"));
          wrong.play();
          console.log(e.key, '間違えました')
          this.correct = false;
          this.wrongChar = true;
          return;
        }
        const collect = new Audio(require("~/assets/sounds/collect.mp3"));
        collect.play();
        console.log(e.key)
        this.chars.push({char: e.key, wrongChar: this.wrongChar});
        this.wrongChar = false;
        this.pressed += e.key;
        this.word = this.word.slice(1);
        if (this.word.length === 0) {                   // 文字を入力し終えたときの処理
          console.log('【pushAnsweredWord実行】');
          if (this.correct) {
            this.incrementScore();
          }
          this.pushAnsweredWord({
            answeredWord: this.pressed,
            correct: this.correct,
            chars: this.chars// : [{char: e.key, this.wrongChar: false}]
            });
          this.chars = [];
          this.correct = true;
          this.pressed = '';
          this.index++;
          this.word = this.newWords[this.index].word;
        }
    },
    countDown() {
      const id = setInterval(() => {
        this.time--;
        if (this.time <= 0) {
          removeEventListener('keydown', this.keyDown);
          clearInterval(id);
          console.log('result画面へ');
          this.$router.push('/result');
        }
      },1000) 
    },
    startCountDown() {
      let count = 3;
      return new Promise ((resolve) => {
        const id = setInterval(() => {
          count--
          console.log(count);
          if (count <= 0) {
            clearInterval(id);
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
</style>

