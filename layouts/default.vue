<template>
  <div class="container">
    <Nuxt />
    <div class="container-bottom"></div>
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
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
}

.container {
  background-image: url("~assets/黒板A.png");
  height: 720px;
  width: 1080px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}

.container-bottom {
  background-image: url("~assets/黒板B.png");
  height: 45px;
  width: 1080px;
  background-color: pink;
  position: absolute;
  bottom: 0;
}
</style>
