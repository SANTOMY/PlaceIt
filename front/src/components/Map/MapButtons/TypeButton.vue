<template>
<!-- spot種別検索メニュー -->
<v-menu
      id='feature-menu'
      class="mx-15 my-5"
      bottom
      offset-x
    >
    <!-- クリックするとメニューが表示する -->
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        id='feature-button'
        class="mx-15 my-5"
        left
        fab
        v-bind="attrs"
        v-on="on"
      >

      <!-- 現在の検索種別のアイコンを表示 -->
      <v-icon
      class="px-5"
      large
      >
      {{featureIcons[nowType]}}
     </v-icon>
      </v-btn>
      <!-- 検索メニュー -->
      </template>
        <v-list 
        id='feature-list' 
        absolute
        >
        <v-list-item
          v-for="(type,index) in types"
          :key="index"
          link
        >
          <v-list-item-title
          v-on:click="changeSearchType(type.title)"
          >{{ type.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
</v-menu>
</template>

<script>
export default {
    data: function(){
        return {
        nowType:'reset',//スポット検索の種別
        types: [  {title:"reset"},
                  {title:"restaurant"},
                  {title:"travel"},
                  {title:"shopping"},
                ],//spot種別一覧
        featureIcons: {
          restaurant: "mdi-silverware-fork-knife",
          travel: "mdi-bag-suitcase",
          shopping: "mdi-cart",
          reset:"mdi-map-marker-circle"
        },//iconたち
        }
    },
    methods:{
        changeSearchType: async function(type){
            this.nowType = type;
        },
    }
}
</script>

<style>
#v-list-item,
#feature-menu,
#feature-button,
#feature-list{
  z-index: 1000;
}
</style>