<template>
  <div class="container">
    <Nuxt />
    <div class="side-box">
      <div>{{ new Date().getMonth() + 1}}月</div>
      <div>{{ new Date().getDate()}}日</div>
      <h1/>
      <div>日直</div>
      <div class="name">&nbsp;{{ name }}</div>
    </div>
    <div class="container-bottom"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('user', ['name']),
    userName() {
      return this.name ? this.name : 'ゲスト'
    }
  },
}
</script>

<style lang="scss" >
html {
  font-family: "MS Pゴシック", "Wawati SC", "Comic Sans MS", "Source Sans Pro",
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  background-color: black;
  color: rgba(255, 255, 255, 0.6);
  font-size: 25px;
}

.container {
  background-image: url("~assets/images/黒板A.png");
  height: 720px;
  width: 1080px;
  margin: 0 auto;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  .side-box {
    font-size: 30px;
    width: 40px;
    height: 600px;
    position: absolute;
    top: 0;
    right: 10px;
    padding-top: 130px;
    text-align: center;
    .name {
      writing-mode: vertical-rl;
    }
  }
  .container-bottom {
    background-image: url("~assets/images/黒板B.png");
    height: 45px;
    width: 100%;
    background-color: pink;
    position: absolute;
    bottom: 0;
  }
}
</style>
