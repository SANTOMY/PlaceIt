<template>
  <!-- 検索ダイアログ -->
  <v-dialog 
  v-model="dialog"
  width="500"
  >
  <template v-slot:activator="{ on,attrs }">
  <!--ダイアログ呼び出しのボタン-->
  <v-btn
  id="search-button"
  class="mx-15 my-5"
  fab
  v-bind="attrs"
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
    <v-container>
      <v-btn-toggle
        v-model="nowType"
        group
        mandatory
      >
        <!-- v-forとか使ってまとめたい(SATD) -->
        <v-btn
          v-for="type in types"
          :key="type" 
          :value="type" class="mx-auto" fab >
          <v-icon>
            {{featureIcons[type]}}
          </v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-container>
    <v-container>
    
    <!-- 大学別検索 -->
    <v-btn-toggle
      v-model="nowUniv"
      group
      mandatory
      >
        <v-btn value="false" class="mx-auto" fab >
          <v-icon>
            mdi-alpha-a-circle-outline
          </v-icon>
        </v-btn>
        <v-btn value="true" class="mx-auto" fab >
          <v-icon>
            mdi-account-cowboy-hat
          </v-icon>
        </v-btn>
    </v-btn-toggle>
    
    </v-container>
    <v-card-actions>
      <v-btn @click="Search(); dialog=false">
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
      typeNameList: getSpotTypeDict('type'), //spot type object のkey配列作成 -> mountedで'reset'追加
      nowUniv:false,//現在の大学
      myUniv:this.$store.state.userData.university,//所属大学
      dialog:false//検索ダイアログ表示管理
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
        //選ばれた検索条件をMapに送信
        var univFlag = (this.nowUniv=="true" ? true : false);
        this.$emit('search',this.nowType,univFlag);
      },
    }
    
}
</script>

<style>
#search-button{
  z-index: 1000;
}
</style>