<template>
  <div class="container">
    <section>〜結果発表〜</section>
    <div class="result-box">
      <div class="left-box">
        <div class="retry">&nbsp;&nbsp;&nbsp;&nbsp;リトライ : Spaceキー</div>
        <div class="esc">タイトル : Escキー</div>
        <span class="tweet">tweet</span>
      </div>
      <div class="right-box">
        <div class="answer-sheet">
          <div>解答用紙</div>
          <div class="name-box">
            <div style="width:20%;">氏名</div>
            <div style="width:55%;"></div>
            <div style="width:20%;">得点</div>
            <div style="width:25%;"></div>
          </div>
          <div class="answers">
            <table border="1" v-for="n in 50" :key="n">
              <thead>
                <tr>
                  <th>({{n}})</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>about</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<style scoped>
  section {
    font-size: 50px;
  }

  .result-box {
    display: flex;
  }

  .left-box {
    width: 100%;
    height: 600px;
  }

  .retry {
    padding-top: 200px;
  }

  .esc {
    padding-top: 20px;
  }

  .tweet {
    padding-top: 90px;
    display: inline-block;
    color: rgba(135, 207, 235, 0.705);
    border-bottom: 2px solid
  }

  .right-box {
    width: 100%;
    height: 600px;
  }

  .answer-sheet {
    font-family: "游明朝体", "";
    width: 440px;
    height: 540px;
    margin-top: 20px;
    background: rgb(255, 255, 255);
    color: black;
    padding: 10px
  }

  .answers {
    height: 420px;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    border-color: black;
    width: 24.98%;
    margin-bottom: 20px;
  }

  tr {
    
  }

  th {
    font-size: 12px;
    
  }

  td {
    font-size: 15px;
    padding: 10px;
  }

  .name-box {
    border: 2px solid black;
    margin: 5px 0px 20px;
    font-size:15px;
    display: flex;
  }

  .name-box > div {
    border-right: 1px solid ;
    border-left: 1px solid ;
  }

</style>