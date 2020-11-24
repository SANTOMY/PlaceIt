<template>
<!-- 通常モードとスポット登録モードの切り替えボタン -->
<v-btn 
      id='map-reg'
      class="mx-4 my-5"
      absolute
      right
      fab
    >
    <!-- 通常モードアイコン -->
     <v-icon
      v-if="!regFlag"
      class="px-5"
      large
      >
        mdi-earth
     </v-icon>
      <!-- 登録モードアイコン -->
     <v-icon
      v-if="regFlag"
      class="px-5"
      color="#CC1651"
      large
      >
        mdi-map-marker-plus
     </v-icon>
</v-btn>
</template>

<script>

export default {
    components: {
    },

    props: ['regFlag']
    
}
</script>

<style>
#map-reg{
  z-index: 1000;
}
</style>