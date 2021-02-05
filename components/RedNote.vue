<template>
  <div>
    <div
      :class="[
        'note',
        { slide: redNote },
        redNote ? classNames.noteTransitionB : classNames.noteTransitionA,
      ]">
      <span
        :class="[
          'cover',
          { open1: redNote },
          redNote ? classNames.pageTransitionB1 : classNames.pageTransitionA4,
        ]">
        <h1>{{ title }}</h1>
        <div />
        <div />
      </span>
      <span
        :class="[
          'cover-back',
          { open2: redNote },
          redNote ? classNames.pageTransitionB1 : classNames.pageTransitionA4,
        ]"/>
      <span
        :class="[
          'page1',
          { open3: redNote },
          redNote ? classNames.pageTransitionB2 : classNames.pageTransitionA3,
        ]">
        <InThePage />
      </span>
      <span
        :class="[
          'page2',
          { open4: redNote },
          redNote ? classNames.pageTransitionB3 : classNames.pageTransitionA2,
        ]">
        <InThePage />
      </span>
      <span
        :class="[
          'page3',
          { open5: redNote },
          redNote ? classNames.pageTransitionB4 : classNames.pageTransitionA1,
        ]">
        <InThePage />
      </span>
      <span
        :class="[
          'page4',
          { open6: redNote },
          redNote ? classNames.pageTransitionB4 : classNames.pageTransitionA1,
        ]">
        <div class="heading">遊び方</div>
        <div class="row">
          「
          <span class="red">英タイプ</span>」は英単語タイピングゲームです。
        </div>
        <div class="row" />
        <div class="row">
          ☆
          <span class="red">ルール</span>☆
        </div>
        <div class="row">spaceキーでゲームスタート。</div>
        <div class="row">始まったら画面中央に表示されている英単語を</div>
        <div class="row">キーボードで入力しましょう。</div>
        <div class="row" />
        <div class="row">
          ☆
          <span class="red">制限時間</span>☆
        </div>
        <div class="row">プレイ画面右上に制限時間が表示されています。</div>
        <div class="row">時間内にたくさん英単語を入力しましょう。</div>
        <div class="row" />
        <div class="row">
          ☆
          <span class="red">得点</span>☆
        </div>
        <div class="row">英単語を正しく入力できると10点の得点です。</div>
        <div class="row">１文字でも間違えると得点は無しなので、</div>
        <div class="row">落ち着いて入力しましょう。</div>
        <div class="row">ゲーム終了後に採点結果が表示されます。</div>
      </span>
      <span
        :class="[
          'rear-cover',
          { rearCoverAfter: redNote },
          redNote ? classNames.noteTransitionB : classNames.noteTransitionA,
        ]"/>
      <div :class="['note-index', { noteShadowInset: redNote }]">
        <div class="close" @click="redNoteOpen()">閉じる</div>
        <div class="heading">ログイン後</div>
        <div class="row">ログイン後、以下の機能を使用できます。</div>
        <div class="row" />
        <div class="row" />
        <div class="row">
          ☆
          <span class="red">単語帳</span>☆
        </div>
        <div class="row">今まで入力された英単語を単語帳に記録できます。</div>
        <div class="row">たくさんプレイして単語帳を完成させましょう。</div>
        <div class="row" />
        <div class="row" />
        <div class="row" />
        <div class="row">
          ☆
          <span class="red">ランキング</span>☆
        </div>
        <div class="row">各ユーザーの得点のランキングが表示されます。</div>
        <div class="row">高得点を狙ってランキング上位を目指しましょう。</div>
        <div class="row" />
        <div class="row" />
        <div class="row" />
        <div class="row" />
      </div>
      <div :class="['note-shadow']" />
      <div
        :class="[
          'note-shadow',
          { noteShadowSlide: redNote },
          redNote ? classNames.pageTransitionB2 : classNames.noteTransitionA,
        ]"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import InThePage from '~/components/InThePage.vue'
export default {
  components: {
    InThePage,
  },
  data() {
    return {
      title: '遊び方',
      classNames: {
        noteTransitionA: 'note-transitionA',
        noteTransitionB: 'note-transitionB',
        pageTransitionA1: 'page-transitionA1',
        pageTransitionA2: 'page-transitionA2',
        pageTransitionA3: 'page-transitionA3',
        pageTransitionA4: 'page-transitionA4',
        pageTransitionB1: 'page-transitionB1',
        pageTransitionB2: 'page-transitionB2',
        pageTransitionB3: 'page-transitionB3',
        pageTransitionB4: 'page-transitionB4',
      },
    }
  },
  computed: {
    ...mapGetters('note', [
      'redNote',
      'blueNote',
      'yellowNote',
      'greenNote',
      'purpleNote',
    ]),
  },
  methods: {
    ...mapActions('note', [
      'redNoteOpen',
      'blueNoteOpen',
      'yellowNoteOpen',
      'greenNoteOpen',
      'purpleNoteOpen',
    ]),
  },
}
</script>

<style lang="scss" scoped>
@mixin page($index) {
  height: calc(100% - 12px);
  background: rgb(255, 255, 255);
  transform: rotateY(0deg) translateZ($index);
  background: rgb(255, 255, 255);
  border: 1px solid gray;
  div {
    transform: rotateY(180deg);
    transform-origin: center center;
  }
}
@mixin cover($color, $index) {
  background: $color;
  transform: rotateY(0deg) translateZ($index);
}

$thickness: rgb(231, 231, 231);
$coverColor: #ff9b9b;
$backCoverColor: #ff5f5f;

.heading {
  font-size: 30px;
  font-weight: bold;
  border-bottom: 1px solid #93c5d8;
  margin: 30px 20px 15px;
  padding-bottom: 10px;
}

.row {
  font-size: 13px;
  border-bottom: 1px solid rgb(170, 170, 170);
  margin: 0 25px;
  height: 20px;
  line-height: 20px;
  text-align: left;
}

.red {
  color: red;
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
  }
  .close:hover {
    color: #93c5d8;
  }
}

// ーーーーーーノートの中の影の移動ーーーーーー
.noteShadowInset {
  box-shadow: 0 0 1px 0 rgb(223, 223, 223) inset;
}

// ーーーーーーノートの背表紙の移動ーーーーーー
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

// ーーーーーーノートのアニメーションーーーーーー

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

// ーーーーーーノートの内側の影ーーーーーー
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
