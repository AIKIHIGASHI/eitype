<template>
  <div class="container">
    <div class="logout" v-if="user" @click="logout()">ログアウト</div>
    <div
      v-for="(image, index) in shuffle"
      :key="image.id"
      :class="['img' + index]">
      <div class="img-text">
        <span :style="{ color: image.color }">{{ image.char }}</span>
        {{ image.text }}
      </div>
      <img class="img" :src="image.src" >
    </div>
    <div class="logo">
      <img src="~/assets/images/英タイプロゴ.png">
    </div>
    <div class="start-message">Spaceでゲームスタート</div>
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
    <div class="mini-note-list"  v-if="!this.user">
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
    <div class="mini-note-list" v-else>
      <div class="mini-note-box" style="padding: 0 350px;">
        <div
          class="mini-note"
          :class="[
            'mini-note',
            { upMiniNote: blueNote },
            blueNote ? '' : classNames.downMiniNote,
          ]"
          @click="blueNoteOpen()">
          <img src="~/assets/images/ノート緑.jpg" >
          <p>&nbsp;単語帳</p>
        </div>
        <div
          class="mini-note"
          :class="[
            'mini-note',
            { upMiniNote: yellowNote },
            yellowNote ? '' : classNames.downMiniNote,
          ]"
          @click="yellowNoteOpen()">
          <img src="~/assets/images/ノート紫.jpg" >
          <p style="font-size: 21px">ランキング&nbsp;</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RedNote from '~/components/RedNote.vue'
import BlueNote from '~/components/BlueNote.vue'
import YellowNote from '~/components/YellowNote.vue'
export default {
  components: {
    RedNote,
    BlueNote,
    YellowNote,
  },
  data() {
    return {
      images: [
        {
          src: require('~/assets/images/apple.png'),
          char: 'a',
          text: 'pple',
          color: '#FF9595',
        },
        {
          src: require('~/assets/images/dog.png'),
          char: 'd',
          text: 'og',
          color: '#FF7622',
        },
        {
          src: require('~/assets/images/hospital.png'),
          char: 'h',
          text: 'ospital',
          color: 'skyblue',
        },
        {
          src: require('~/assets/images/boy.png'),
          char: 'b',
          text: 'oy',
          color: 'skyblue',
        },
        {
          src: require('~/assets/images/girl.png'),
          char: 'g',
          text: 'irl',
          color: '#FF9595',
        },
        {
          src: require('~/assets/images/cat.png'),
          char: 'c',
          text: 'at',
          color: '#FF7622',
        },
        {
          src: require('~/assets/images/turtle.png'),
          char: 't',
          text: 'urtle',
          color: 'lightgreen',
        },
        {
          src: require('~/assets/images/coffee.png'),
          char: 'c',
          text: 'offee',
          color: '#FF7622',
        },
        {
          src: require('~/assets/images/banana.png'),
          char: 'b',
          text: 'anana',
          color: 'yellow',
        },
        {
          src: require('~/assets/images/chair.png'),
          char: 'c',
          text: 'hair',
          color: 'yellow',
        },
      ],
      classNames: {
        downNoteTransition: 'down-note-transition',
        downMiniNote: 'down-mini-note-transition',
      },
    }
  },
  created() {
    this.getUser()
    this.play()
  },
  computed: {
    ...mapGetters('note', [
      'redNote',
      'blueNote',
      'yellowNote',
      'greenNote',
      'purpleNote',
    ]),
    ...mapGetters('user', [
      'user'
    ]),
    shuffle() {
      const images = this.images
      for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[j], images[i]] = [images[i], images[j]]
      }
      return images.slice(0, 3)
    }
  },
  methods: {
    ...mapActions('note', [
      'redNoteOpen',
      'blueNoteOpen',
      'yellowNoteOpen',
      'greenNoteOpen',
      'purpleNoteOpen',
    ]),
    ...mapActions('user', [
      'getUser',
      'logout'
    ]),
    play() {
      addEventListener('keydown', (e) => {
        if (e.key === ' ') {
          this.$router.push('/play')
        }
      })
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

.img:active {
  width: 140px;
  height: 140px;
}

.logo {
  padding: 80px;
}

.start-message {
  font-size: 40px;
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

.mini-note-list {
  width: 100%;
  position: absolute;
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
