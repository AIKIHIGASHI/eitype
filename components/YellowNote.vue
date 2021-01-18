<template>
  <div>
    <div
      :class="['note', {slide: yellowNote}, yellowNote ? className.noteTransitionB : className.noteTransitionA]">
      <span
        :class="['cover', {open1: yellowNote}, yellowNote ? className.pageTransitionB1 : className.pageTransitionA4]">
        <h1>{{ title }}</h1>
        <div/>
        <div/>
      </span>
      <span
        :class="['cover-back', {open2: yellowNote}, yellowNote ? className.pageTransitionB1 : className.pageTransitionA4]"/>
      <span
        :class="['page1', {open3: yellowNote}, yellowNote ? className.pageTransitionB2 : className.pageTransitionA3]">
        <InThePage/>
      </span>
      <span
        :class="['page2', {open4: yellowNote}, yellowNote ? className.pageTransitionB3 : className.pageTransitionA2]">
        <InThePage/>
      </span>
      <span
        :class="['page3', {open5: yellowNote}, yellowNote ? className.pageTransitionB4 : className.pageTransitionA1]">
        <InThePage/>
      </span>
      <span
        :class="['page4' ,{open6: yellowNote}, yellowNote ? className.pageTransitionB4 : className.pageTransitionA1]">
        <div class="heading">{{ title }}</div>

        <form @submit="submit()">
          <div class="form-box">
            <div class="form">
              <div><font-awesome-icon icon = "user" /> ユーザー名</div>
              <input type="text" v-model="userName">
            </div>
            <div class="form">
              <div><font-awesome-icon icon = "envelope" /> E-mail</div>
              <input type="text" v-model="email">
            </div>
            <div class="form">
              <div><font-awesome-icon icon = "lock" /> パスワード</div>
              <input type="text" v-model="password">
            </div>
            <button type="submit">{{ title }}</button>
          </div>
        </form>
      </span>
      <span
        :class="['rear-cover', {rearCoverAfter: yellowNote}, yellowNote ? className.noteTransitionB : className.noteTransitionA]"/>
      <div :class="['note-index', {noteShadowInset: yellowNote}]">
        <div class="close" @click="yellowNoteOpen()">閉じる</div>
        <div class="heading">&nbsp;</div>
        <span class="shadow1" v-if="hover1"/>
        <div class="twitter" @mouseover="hover1 = false" @mouseleave="hover1 = true" @click="twitterLogin()">
          <div>Twitterアカウントで</div>
          <div>{{ title }}</div>
        </div>
        <span class="shadow2" v-if="hover2"/>
        <div class="google" @mouseover="hover2 = false" @mouseleave="hover2 = true" @click="googleLogin()">
          <div>Googleアカウントで</div>
          <div>{{ title }}</div>
        </div>
      </div>
      <div :class="['note-shadow']"/>
      <div
        :class="['note-shadow', {noteShadowSlide: yellowNote}, yellowNote ? className.pageTransitionB2 : className.noteTransitionA]"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import InThePage from '~/components/InThePage.vue'
export default {
  components: {
    InThePage
  },
  data() {
    return {
      title: '新規登録',
      hover1: true,
      hover2: true,
      userName: '',
      email: '',
      password: '',
      className: {
        noteTransitionA: 'note-transitionA',
        noteTransitionB: 'note-transitionB',
        pageTransitionA1: 'page-transitionA1',
        pageTransitionA2: 'page-transitionA2',
        pageTransitionA3: 'page-transitionA3',
        pageTransitionA4: 'page-transitionA4',
        pageTransitionB1: 'page-transitionB1',
        pageTransitionB2: 'page-transitionB2',
        pageTransitionB3: 'page-transitionB3',
        pageTransitionB4: 'page-transitionB4'
      }
    }
  },
  computed: {
    ...mapGetters('note', [
      'redNote',
      'blueNote',
      'yellowNote',
      'greenNote',
      'purpleNote'
    ]),
  },
  methods: {
    ...mapActions('note', [
      'redNoteOpen',
      'blueNoteOpen',
      'yellowNoteOpen',
      'greenNoteOpen',
      'purpleNoteOpen'
    ]),
    ...mapActions('auth', [
      'twitterLogin',
      'googleLogin',
      'register',
    ]),
    submit() {
      event.preventDefault()
      this.register({name: this.userName, email: this.email, password: this.password})
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin page($index) {
  height: calc(100% - 12px);
  background: rgb(255, 255, 255);
  transform: rotateY(0deg) translateZ($index);
  background: rgb(255, 255, 255);
  border: 1px solid gray;
  > div {
    transform: rotateY(180deg);
    transform-origin: center center;
  }
}
@mixin cover($color, $index) {
  background: $color;
  transform: rotateY(0deg) translateZ($index);
}

$thickness: rgb(231, 231, 231);
$coverColor: #FFD77C;
$backCoverColor: #FFA700;

.heading {
  font-size: 30px;
  font-weight: bold;
  border-bottom: 1px solid #93c5d8;
  margin: 30px 20px 15px;
  padding-bottom: 10px;
}

.note,
.note-shadow {
  color: black;
  position: relative;
  margin: 0 auto;
  width: 372px;
  height: 475px;
  background: $thickness;
  perspective: 2000px;
  perspective-origin: 0 -50%;
  transform-style: preserve-3d;
  z-index: 0;
  border-left: 10px solid $backCoverColor;
  border-top: 5px solid $backCoverColor;
  transform: translateX(-10px);
  .cover,
  .cover-back,
  .page1,
  .page2,
  .page3,
  .page4 {
    display: inline-block;
    width: 100%;
    height: calc(100% - 10px);
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    transform-origin: 0 0;
  }
  .cover {
    @include cover($coverColor, 5px);
    width: calc(100% - 30px);
    border-left: 30px solid $backCoverColor;
    h1 {
      font-size: 70px;
      color: black;
      margin-bottom: 80px;
    }
    div {
      width: calc(100% - 100px);
      height: 80px;
      border-bottom: 1px solid gray;
      float: right;
    }
  }
  .cover-back {
    @include cover(white, 4px);
  }
  .page1 {
    @include page(3px);
  }
  .page2 {
    @include page(2px);
  }
  .page3 {
    @include page(1px);
  }
  .page4 {
    @include page(0px);
  }
  // ーーーーーーページを閉じる速度ーーーーーーーーーーーーー
  .page-transitionA1 {
    transition: all 0.5s ease;
  }
  .page-transitionA2 {
    transition: all 1s ease;
  }
  .page-transitionA3 {
    transition: all 1.5s ease;
  }
  .page-transitionA4 {
    transition: all 2s ease;
  }
  // ーーーーーーページを開く速度ーーーーーーーーーーーーー
  .page-transitionB1 {
    transition: all 1s ease 1s;
  }
  .page-transitionB2 {
    transition: all 2s ease 1s;
  }
  .page-transitionB3 {
    transition: all 3s ease 1s;
  }
  .page-transitionB4 {
    transition: all 4s ease 1s;
  }
  .open1 {
    transform: rotateY(-180deg) translateZ(5px);
    box-shadow: 0px -9px $thickness;
  }
  .open2 {
    transform: rotateY(-180deg) translateZ(4px);
  }
  .open3 {
    transform: rotateY(-180deg) translateZ(3px);
  }
  .open4 {
    transform: rotateY(-180deg) translateZ(2px);
  }
  .open5 {
    transform: rotateY(-180deg) translateZ(1px);
  }
  .open6 {
    transform: rotateY(-180deg) translateZ(0px);
  }
  .form-box {
    transform: rotateY(180deg);
    transform-origin: center center;
    margin: 30px 30px 0;
    font-size: 20px;
    color: gray;
    .form {
      border-bottom: 1px solid #93c5d8;
      padding: 10px 0;
    }
    input {
      border: none;
      width: 100%;
      text-align: center;
      padding: 5px;
      margin-top: 5px;
      font-size: 18px;
      outline: none;
    }
    button {
      font-family: "Wawati SC";
      color: gray;
      font-size: 15px;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid #93c5d8;
      width: 80px;
      margin-top: 30px;
      cursor: pointer;
      outline: none;
      padding: 0;
      &:hover {
        color: #93c5d8;
      }
    }
  }
}

// ーーーーーー本がスライドする速度ーーーーーーーーーーー

.note-transitionA {
  transition: all 1s ease 0s;
}

.note-transitionB {
  transition: all 1.5s ease 1s;
}

.note-index {
  width: 100%;
  height: calc(100% - 12px);
  background: rgb(255, 255, 255);
  position: absolute;
  bottom: 0;
  border: 1px solid gray;
  box-shadow: 372px 0 1px 0 rgb(223, 223, 223) inset;
  transition: all 2s ease 1.5s;
  .close {
    color: gray;
    font-size: 15px;
    position: absolute;
    top: 20px;
    right: 20px;
    border-bottom: 1px solid #93c5d8;
    width: 80px;
    cursor: pointer;
    &:hover {
      color: #93c5d8;
    }
  }
  .shadow1 {
      width: 215px;
      height: 70px;
      background: rgb(255, 255, 255);
      position: absolute;
      top: 158px;
      right: 62px;
      box-shadow: 0 5px 5px #555;
      transform: rotate(1deg);
      z-index: 1px;
    }
  .twitter {
    width: 250px;
    height: 80px;
    margin: 70px auto;
    background-color: skyblue;
    position: relative;
    box-shadow: 30px 0 0 0 rgb(0, 110, 255) inset;
    z-index: 2px;
    cursor: pointer;
    div {
      font-size: 20px;
      color: rgb(0, 110, 255);
      padding: 8px 0 0 20px;
      font-weight: bold;
    }
  }
  .shadow2 {
      width: 210px;
      height: 70px;
      background: rgb(255, 255, 255);
      position: absolute;
      top: 308px;
      right: 62px;
      box-shadow: 0 5px 5px #555;
      transform: rotate(1deg);
      z-index: 1px;

    }
  .google {
    margin: 0 auto;
    width: 250px;
    height: 80px;
    background: #ff9b9b;
    box-shadow: 30px 0 0 0 red inset;
    position: relative;
    z-index: 2px;
    cursor: pointer;
    div {
      font-size: 20px;
      color: red;
      padding: 8px 0 0 20px;
      font-weight: bold;
    }
  }
}

// ノートの中の影の移動
.noteShadowInset {
  box-shadow: 0 0 1px 0 rgb(223, 223, 223) inset;
}

// ノートの背表紙の移動
.rear-cover {
  display: inline-block;
  width: calc(100% - 30px);
  height: 5px;
  background: $coverColor;
  position: absolute;
  top: -5px;
  right: 0;
  // transition: all 1.5s ease 1s;
}

// .noteのアニメーション

.rearCoverAfter {
  top: 0;
  opacity: 0;
}

.slide {
  transform: translateX(50%);
  // box-shadow: none;
  border-top: 0px solid rgba(255, 0, 0, 0);
  border-left: 0px solid rgba(255, 0, 0, 0);
}

// ノートの内側の影
.note-shadow {
  border: none;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 20px;
  right: -20px;
  z-index: 0px;
  transform: rotateY(-180deg) translateZ(8px);
}

.noteShadowSlide {
  transform-origin: 0 0;
}
</style>
