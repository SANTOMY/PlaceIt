<template>
  <!-- 検索ダイアログ -->
  <v-dialog 
  v-model="dialog"
  >
  <template v-slot:activator="{ on }">
  <!--ダイアログ呼び出しのボタン-->
  <v-btn
  id="search-button"
  class="mx-15 my-5"
  fab
  v-on="on"
  >
    <v-icon
      class="px-5"
      large
      >
      mdi-card-search-outline
    </v-icon>
  </v-btn>
  </template>
  <!-- ダイアログの中身 -->
  <v-card>
    <!-- スポットタイプ検索 -->
    <v-btn-toggle
      v-model="nowType"
      group
      mandatory
      >
        <!-- v-forとか使ってまとめたい(SATD) -->
        <v-btn value="reset" class="mx-auto" fab >
          <v-icon>
            {{featureIcons["reset"]}}
          </v-icon>
        </v-btn>
        <v-btn value="travel" class="mx-auto" fab>
          <v-icon>
            {{featureIcons["travel"]}}
          </v-icon>
        </v-btn>
        <v-btn value="shopping" class="mx-auto" fab>
          <v-icon>
            {{featureIcons["shopping"]}}
          </v-icon>
        </v-btn>
        <v-btn value="restaurant" class="mx-auto" fab>
          <v-icon>
            {{featureIcons["restaurant"]}}
          </v-icon>
        </v-btn>
      <!--
      <v-btn
      v-for="(type,index) in types"
      :key="index"
      value=""
      class="mx-auto"
      >
        <v-icon>
          {{featureIcons[type]}}
        </v-icon>
      </v-btn>
      -->
    </v-btn-toggle>
    <v-card-actions>
      <v-btn @click="Search()">
        Search
      </v-btn>
    </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
//import typeButton from './TypeButton.vue'
import {getSpotTypeDict} from "../../share/SpotTypeFunction"

export default {
  data: function(){
    return {
      flag:true,
      nowType:'reset',//スポット検索の種別
      featureIcons: getSpotTypeDict('icon'), // iconを格納するオブジェクト -> mountedでデータ追加
      types:["reset"], //spot種別一覧を格納するlist -> mountedでデータ追加
      typeNameList: getSpotTypeDict('type') //spot type object のkey配列作成 -> mountedで'reset'追加
    }
  },
  components: {
    //typeButton
    },

    created(){
      this.changeSearchType
    },
    mounted(){
        this.types.push(... this.typeNameList ) // typesにtype name listを追加
        this.$set(this.featureIcons, 'reset', "mdi-map-marker-circle") // iconオブジェクトにreset icon追加
    },

    //props: ['regFlag']
    methods:{
      Search(){
        //選ばれたジャンルタイプをMapに送信
        this.$emit('update-type',this.nowType);
      },
    }
    
}
</script>

<style>
#search-button{
  z-index: 1000;
}
</style>