<template>
  <div class="mini-note-list">
    <div class="mini-note-box">
      <div
        class="mini-note"
        :class="[
          'mini-note',
          { upMiniNote: blueNote },
          blueNote ? '' : classNames.downMiniNote,
        ]"
        @click="blueNoteOpen()">
        <img src="~/assets/images/ノート青.jpg" >
        <p>ログイン</p>
      </div>
      <div
        class="mini-note"
        :class="[
          'mini-note',
          { upMiniNote: redNote },
          redNote ? '' : classNames.downMiniNote,
        ]"
        @click="redNoteOpen()">
        <img src="~/assets/images/ノート赤.jpg" >
        <p>&nbsp;遊び方</p>
      </div>
      <div
        class="mini-note"
        :class="[
          'mini-note',
          { upMiniNote: yellowNote },
          yellowNote ? '' : classNames.downMiniNote,
        ]"
        @click="yellowNoteOpen()">
        <img src="~/assets/images/ノート黃.jpg" >
        <p>新規登録</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      classNames: {
        downMiniNote: 'down-mini-note-transition',
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
.mini-note-list {
  width: 100%;
  position: absolute;
  z-index: 11px;
  bottom: 35px;
  .mini-note-box {
    display: flex;
    justify-content: space-between;
    padding: 0 300px;
    .mini-note {
      position: relative;
      top: 0;
      transition: all 0.3s ease 0s;
      cursor: pointer;
      p {
        color: black;
        font-weight: bold;
        position: absolute;
        top: 0;
        left: 25px;
      }
    }
    .mini-note:hover {
      top: -30px;
    }
    .upMiniNote {
      transform: translateY(-200px);
      opacity: 0;
    }
    .upMiniNote:hover {
      transform: translateY(-200px);
      opacity: 0;
    }
    .down-mini-note-transition {
      transition: transform 0.3s ease 2.2s, opacity 0.3s ease 2.2s;
    }
  }
}
</style>
