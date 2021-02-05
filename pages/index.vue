<template>
  <div class="container">
    <div class="logout" v-if="user" @click="logout()">ログアウト</div>
    <div
      v-for="(image, index) in shuffle"
      :key="image.id"
      :class="['img' + index]">
      <div class="img-text">
        <span :style="{ color: image.color }">{{ image.char
          }}<span style="color: white; opacity: 0.7">{{
            image.text
          }}</span></span>
      </div>
      <img class="img" :src="image.src" >
    </div>
    <div class="logo">
      <img src="~/assets/images/英タイプロゴ.png" >
    </div>
    <div class="start-message">Enterでゲームスタート</div>
    <div
      class="note-component"
      :class="[
        { showNote: redNote },
        redNote ? '' : classNames.downNoteTransition,
      ]">
      <RedNote />
    </div>
    <div
      class="note-component"
      :class="[
        { showNote: blueNote },
        blueNote ? '' : classNames.downNoteTransition,
      ]">
      <BlueNote />
    </div>
    <div
      class="note-component"
      :class="[
        { showNote: yellowNote },
        yellowNote ? '' : classNames.downNoteTransition,
      ]">
      <YellowNote />
    </div>
    <div
      class="note-component"
      :class="[
        { showNote: greenNote },
        greenNote ? '' : classNames.downNoteTransition,
      ]">
      <greenNote />
    </div>
    <div
      class="note-component"
      :class="[
        { showNote: purpleNote },
        purpleNote ? '' : classNames.downNoteTransition,
      ]">
      <purpleNote />
    </div>
    <NoteListAfter v-if="user" />
    <NoteListBefore v-else />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { images } from '~/mixins/images.js'
import { mapNote } from '~/mixins/mapNote.js'
import RedNote from '~/components/RedNote.vue'
import BlueNote from '~/components/BlueNote.vue'
import YellowNote from '~/components/YellowNote.vue'
import GreenNote from '~/components/GreenNote.vue'
import PurpleNote from '~/components/PurpleNote.vue'
import NoteListBefore from '~/components/NoteListBefore.vue'
import NoteListAfter from '~/components/NoteListAfter.vue'
export default {
  mixins: [images, mapNote],
  components: {
    RedNote,
    BlueNote,
    YellowNote,
    GreenNote,
    PurpleNote,
    NoteListBefore,
    NoteListAfter,
  },
  data() {
    return {
      a: 'a'
    }
  },
  created() {
    this.deleteAnsweredWord()
    this.resetScore()
    this.deleteScores()
    this.deleteMyWords()
    this.getScore()
    this.getUser()
    addEventListener('keydown', this.play)
  },
  computed: {
    ...mapGetters('user', ['user']),
    shuffle() {
      const images = this.images
      for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[j], images[i]] = [images[i], images[j]]
      }
      return images.slice(0, 3)
    },
  },
  methods: {
    ...mapActions('user', ['getUser', 'logout']),
    ...mapActions('score', ['getScore', 'deleteScores', 'resetScore']),
    ...mapActions('word', [
      'getMyWords',
      'deleteMyWords',
      'deleteAnsweredWord',
    ]),
    play(e) {
      if (
        this.redNote ||
        this.blueNote ||
        this.yellowNote ||
        this.greenNote ||
        this.purpleNote
      )
        return
      if (e.key === 'Enter') {
        this.$store.commit('audio/chime1Play')
        removeEventListener('keydown', this.play)
        this.$router.push('/play')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.logout {
  position: absolute;
  top: 20px;
  right: 30px;
  border-bottom: 1px solid;
  opacity: 0.7;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
}

.img {
  width: 130px;
  height: 130px;
  opacity: 0.5;
  cursor: pointer;
}

.img-text {
  font-size: 40px;
}

.img0 {
  position: absolute;
  z-index: 10;
  top: 50px;
  left: 50px;
  .img {
    transform: rotate(-30deg);
  }
  .img-text {
    transform: rotate(10deg);
  }
}

.img1 {
  position: absolute;
  z-index: 10;
  bottom: 70px;
  left: 50px;
  .img {
    transform: rotate(30deg);
  }
  .img-text {
    transform: rotate(-10deg);
  }
}

.img2 {
  position: absolute;
  z-index: 10;
  top: 250px;
  right: 100px;
  .img {
    transform: rotate(30deg);
  }
  .img-text {
    transform: rotate(-10deg);
  }
}

.logo {
  padding: 50px;
  img {
    width: 400px;
    height: 200px;
  }
}

.start-message {
  font-size: 35px;
  border-bottom: 2px solid;
  margin: 0 300px;
}

.note-component {
  position: absolute;
  top: 800px;
  left: 0;
  right: 0;
  z-index: 10;
  margin: auto;
  transition: all 0.5s ease 0.1s;
  height: 800px;
}

.down-note-transition {
  transition: all 0.5s ease 2s;
}

.showNote {
  top: 80px;
}

.mini-note-list2 {
  width: 100%;
  position: absolute;
  z-index: 1px;
  bottom: 35px;
  .mini-note-box2 {
    display: flex;
    justify-content: space-between;
    padding: 0 300px;
    .mini-note2 {
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
    .mini-note2:hover {
      top: -30px;
    }
    .upMiniNote2 {
      transform: translateY(-200px);
      opacity: 0;
    }
    .upMiniNote2:hover {
      transform: translateY(-200px);
      opacity: 0;
    }
    .down-mini-note-transition2 {
      transition: transform 0.3s ease 2.2s, opacity 0.3s ease 2.2s;
    }
  }
}
</style>
