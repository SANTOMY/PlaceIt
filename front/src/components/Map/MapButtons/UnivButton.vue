<template>
<!-- 通常モードとスポット登録モードの切り替えボタン -->
  <v-btn 
    id='univ-button'
    class="mx-10 my-15"
    absolute
    left
    bottom
    fab
    >
    <!-- 通常モードアイコン -->
    <v-icon
      v-if="!univFlag"
      class="px-5"
      large
      >
        mdi-alpha-a-circle-outline
    </v-icon>
    <!-- 登録モードアイコン -->
    <v-icon
      v-if="univFlag"
      class="px-5"
      large
      >
        mdi-account-cowboy-hat
    </v-icon>
  </v-btn>
</template>

<script>
export default {
    props: ['univFlag'],
    created(){
        this.changeUnivFlag;
    },
    methods:{
        //選ばれたジャンルタイプをMapに送信
        changeUnivFlag(){
            console.log("changeUnivFlag")
        },
        
    }
}
</script>

<style>

#univ-button{
  z-index: 1000;
}
</style>