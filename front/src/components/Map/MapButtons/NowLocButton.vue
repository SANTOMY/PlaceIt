<template>
        
  <!-- 現在地ボタン -->
  <v-btn
    id='now-loc'
    absolute
    class="mx-4 my-15"
    right
    bottom
    fab
    >
    <v-icon
      color="#5D8C99"
      class="px-5"
      large 
      >
      mdi-crosshairs-gps
    </v-icon>
  </v-btn>

</template>

<style>

#now-loc{
  z-index: 1000;
}

</style>