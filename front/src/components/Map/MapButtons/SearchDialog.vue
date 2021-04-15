<template>
<!-- 検索メニュー表示 -->
    <v-menu
    v-model="menu"
    id="search-dialog"
    bottom
    offset-x
    >
    <!-- 検索ボタン-->
    <template v-slot:activator="{ on, attrs }">
        <v-btn
          id = "dialog-button"
          class="mx-10 my-5"
          v-bind="attrs"
          fab
          v-on="on"
        >
        <v-icon
        v-if="!regFlag"
        class="px-5"
        large
        >
        mdi-card-search-outline
        </v-icon>
        </v-btn>
      </template>
      <!-- ボタンの中身 -->
        <template>
          <!-- スポットタイプ検索 -->
          <v-menu
            id='feature-menu'
            >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                id='feature-button'
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
            </template>
            <!-- 検索メニュー -->
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
                    v-on:click="changeSearchType(type)"
                  >{{ type }}</v-list-item-title>
                </v-list-item>
            </v-list>
          </v-menu>
        </template>

     </v-menu>
</template>

<script>
//import typeButton from './TypeButton.vue'
import {getSpotTypeDict} from "../../share/SpotTypeFunction"

export default {
  data: function(){
    return {
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
      changeSearchType(type){
        //選ばれたジャンルタイプをMapに送信
        this.nowType = type;
        this.$emit('update-type',type);
      },
    }
    
}
</script>

<style>
#v-list-item,
#feature-menu,
#feature-button,
#feature-list,
#dialog-button,
#search-dialog{
  z-index: 1000;
}
</style>