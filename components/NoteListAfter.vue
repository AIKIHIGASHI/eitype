<template>
  <div class="mini-note-list">
    <div class="mini-note-box" style="padding: 0 350px">
      <div
        :class="[
          'mini-note',
          { upMiniNote: purpleNote },
          purpleNote ? '' : classNames.downMiniNote,
        ]"
        @click="purpleNoteOpen()">
        <img src="~/assets/images/ノート紫.jpg" >
        <p style="font-size: 21px">ランキング&nbsp;</p>
      </div>
      <div
        :class="[
          'mini-note',
          { upMiniNote: greenNote },
          greenNote ? '' : classNames.downMiniNote,
        ]"
        @click="greenNoteOpen()">
        <img src="~/assets/images/ノート緑.jpg" >
        <p>&nbsp;単語帳</p>
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
