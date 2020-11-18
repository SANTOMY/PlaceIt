<template>
  <div>
   <v-btn 
      id='btn1'
      absolute
      class="mx-2"
      dark
      large
      right
      color="primary"
      >
      sample button
      </v-btn>
  <!-- ボタンなどのオブジェクトはこれより上に作成する -->
  <mapview>
  </mapview>
  </div>
</template>

<script>
import mapview from './MapView'

export default {
  //コンポーネント名
    name: "Map",
  //MapViewのマップレイヤーを利用
    components:{
    mapview,
  }, 
    }
</script>

<style scoped>
div{
  width: 100%;
  height: 100%;
}
#btn1{
  /* 各オブジェクトのstyleでz-indexを0以上に設定する 
  基本は1000でOK*/
  z-index: 1000;
}
</style>