<template>
  <div>
    <div
      :class="[
        'note',
        { slide: greenNote },
        greenNote ? classNames.noteTransitionB : classNames.noteTransitionA,
      ]">
      <span
        :class="[
          'cover',
          { open1: greenNote },
          greenNote ? classNames.pageTransitionB1 : classNames.pageTransitionA4,
        ]">
        <h1>{{ title }}</h1>
        <div />
        <div />
      </span>
      <span
        :class="[
          'cover-back',
          { open2: greenNote },
          greenNote ? classNames.pageTransitionB1 : classNames.pageTransitionA4,
        ]"/>
      <span
        :class="[
          'page1',
          { open3: greenNote },
          greenNote ? classNames.pageTransitionB2 : classNames.pageTransitionA3,
        ]">
        <InThePage />
      </span>
      <span
        :class="[
          'page2',
          { open4: greenNote },
          greenNote ? classNames.pageTransitionB3 : classNames.pageTransitionA2,
        ]">
        <InThePage />
      </span>
      <span
        :class="[
          'page3',
          { open5: greenNote },
          greenNote ? classNames.pageTransitionB4 : classNames.pageTransitionA1,
        ]">
        <InThePage />
      </span>
      <span
        :class="[
          'page4',
          { open6: greenNote },
          greenNote ? classNames.pageTransitionB4 : classNames.pageTransitionA1,
        ]">
        <div class="heading">{{ title }}</div>
        <div class="table-box">
          <table v-if="myWordsBefore">
            <tr v-for="myWord in myWordsBefore" :key="myWord.id">
              <td align="center">{{ myWord.word }}</td>
              <td align="center" style="font-size: 13px">
                {{ myWord.description }}
              </td>
            </tr>
          </table>
        </div>
      </span>
      <span
        :class="[
          'rear-cover',
          { rearCoverAfter: greenNote },
          greenNote ? classNames.noteTransitionB : classNames.noteTransitionA,
        ]"/>
      <div :class="['note-index', { noteShadowInset: greenNote }]">
        <div class="close" @click="greenNoteOpen()">閉じる</div>
        <div
          class="close sort"
          @click="sortToggle()"
          style="width: 120px"
          v-if="sort">
          アルファベット順
        </div>
        <div class="close sort" @click="sortToggle()" v-else>登録順</div>
        <div class="heading">&nbsp;</div>
        <div class="table-box">
          <table>
            <tr v-for="myWord in myWordsAfter" :key="myWord.id">
              <td align="center">{{ myWord.word }}</td>
              <td align="center" style="font-size: 13px">
                {{ myWord.description }}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="fusenn-box">
        <div
          v-for="n in 15"
          :key="n"
          :class="['fusenn' + n, { width: fusenn[n - 1].bool }]"
          @click="fusennClick(n)"/>
      </div>
      <div :class="['note-shadow']" />
      <div
        :class="[
          'note-shadow',
          { noteShadowSlide: greenNote },
          greenNote ? classNames.pageTransitionB2 : classNames.noteTransitionA,
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
      title: '単語帳',
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
    ...mapGetters('word', [
      'jsonWords',
      'myWords',
      'myWordsBefore',
      'myWordsAfter',
      'fusenn',
      'sort',
    ]),
    ...mapGetters('note', [
      'redNote',
      'blueNote',
      'yellowNote',
      'greenNote',
      'purpleNote',
    ]),
  },
  methods: {
    ...mapActions('word', ['fusennClick', 'sortToggle']),
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

@mixin fusenn($color) {
  width: 39px;
  height: 24px;
  margin-bottom: 1px;
  opacity: 0.7;
  background: $color;
  transform: rotateY(180deg);
  transform-origin: right;
  &:hover {
    opacity: 0.9;
  }
}

$thickness: rgb(231, 231, 231);
$coverColor: #9bffae;
$backCoverColor: #39e073;

.fusenn-box {
  width: 90px;
  position: absolute;
  top: 90px;
  z-index: -10px;
  right: -40px;
}

.fusenn1 {
  @include fusenn(red);
}
.fusenn2 {
  @include fusenn(rgb(255, 0, 212));
}
.fusenn3 {
  @include fusenn(rgb(195, 0, 255));
}
.fusenn4 {
  @include fusenn(rgb(111, 0, 255));
}
.fusenn5 {
  @include fusenn(rgb(55, 0, 255));
}
.fusenn6 {
  @include fusenn(rgb(0, 60, 255));
}
.fusenn7 {
  @include fusenn(rgb(0, 153, 255));
}
.fusenn8 {
  @include fusenn(rgb(0, 255, 157));
}
.fusenn9 {
  @include fusenn(rgb(0, 216, 72));
}
.fusenn10 {
  @include fusenn(rgb(0, 114, 19));
}
.fusenn11 {
  @include fusenn(rgb(251, 253, 145));
}
.fusenn12 {
  @include fusenn(rgb(229, 255, 0));
}
.fusenn13 {
  @include fusenn(rgb(255, 136, 0));
}
.fusenn14 {
  @include fusenn(rgb(148, 91, 91));
}
.fusenn15 {
  @include fusenn(rgb(66, 66, 66));
}

.width {
  width: 90px;
  transform: rotateY(0deg);
}

.heading {
  font-size: 30px;
  font-weight: bold;
  border-bottom: 1px solid #93c5d8;
  margin: 30px 20px 15px;
  padding-bottom: 10px;
}

.table-box {
  padding: 0 25px;
  color: gray;
  table {
    font-size: 17px;
    border-collapse: collapse;
    width: 100%;
    line-height: 20px;
    text-align: left;
    tr {
      height: 30px;
      border-bottom: 1px solid rgb(170, 170, 170);
      td {
        padding: 6px 0px;
      }
    }
  }
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
  .sort {
    top: 45px;
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
