<template>
<!-- mapレイヤのような形で生成される -->
  <div id='map'>
    <!-- spot種別検索メニュー -->
    <type-button @update-type="updateType"/>
    <!-- 通常モードとスポット登録モードの切り替えボタン -->
    <spot-reg-button :regFlag="regFlag" v-on:click.native="changeMode()"/>
    <!-- 現在地ボタン -->
    <now-loc-button v-on:click.native="setNowLocation()"/>
  </div>
</template>

<script lang='js' src='./Map.js' />

<style scoped>
/* むやみにいじると地図表示が消えるので注意*/
html,
body,
#map { 
  height: 100%; 
  width: 100%;
  z-index: 0;
  }
body {
  margin: 0;
  height: 100%;
}
  /* 各オブジェクトのstyleでz-indexを0以上に設定する 
  基本は1000でOK*/

</style>