<template>
  <div class="container">
    <div class="navigation">
      <div class="return">Escキーでタイトル</div>
      <div class="time">残り時間<br>2:49</div>
    </div>
    <div class="word-box">
      <div class="word">about</div>
      <div class="word-jp">...について</div>
    </div>
    <div class="type-box">
      <div class="type">about</div>
    </div>
    <div class="next-word-box">
      Next : become
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>


.navigation {
  width: 100%;

}

.return {
  float: left;
  padding: 0 40px;
}

.time {
  float: right;
  padding: 0 40px;
}

.word-box {
  width: 100%;
  text-align: center;
  padding-top: 100px;
}

.word {
  font-size: 100px;
}

.word-js {

}

.type-box {
  width: 100%;
  padding-top: 150px;
  font-size: 50px;
}

.type {
  margin: 0 250px;
  border-bottom: 2px solid white;
}

.next-word-box {

  width: 100%;
  padding-top: 100px;
}

</style>