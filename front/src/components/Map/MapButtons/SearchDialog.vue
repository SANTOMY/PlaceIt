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

    <!-- tag検索 -->
    <v-container>
        <v-autocomplete
            v-model="selectedTags"
            :items="filterdTags"
            label="タグ"
            multiple
            single-line
            prepend-icon="mdi-school"
        >
            <template v-slot:selection="{ item }">
                <v-chip
                    label
                    color="grey lighten-4"
                >
                    <tag-type-icon :type="item" :isLarge="false"/>
                    <h4>{{ item }}</h4>
                </v-chip>
            </template>
        </v-autocomplete>
    </v-container>

    <!-- キーワード検索 -->
    <v-container>
    <v-autocomplete
        label="検索ワード"
        clearable
        single-line
        v-model="keyword"
        prepend-icon="mdi-alpha-a"
        item-text="spot_name"
        :items="spotNameList">
      </v-autocomplete>

    </v-container>

    <v-card-actions>
      <v-btn @click="Search(); dialog=false">
        <v-icon>
        mdi-card-search
        </v-icon>
      </v-btn> 
    </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {getSpotTypeDict} from "../../share/SpotTypeFunction"
import {getTagTypeDict} from "../../share/TagTypeFunction"
import tagTypeIcon from "../../share/TagTypeIcon"

export default {
  data: function(){
    return {
      flag:true,
      nowType:'reset',//スポット検索の種別
      featureIcons: getSpotTypeDict('icon'), // iconを格納するオブジェクト -> mountedでデータ追加
      types:["reset"], //spot種別一覧を格納するlist -> mountedでデータ追加
      typeNameList: getSpotTypeDict('type'), //spot type object のkey配列作成 -> mountedで'reset'追加
      nowUniv:false,//現在の大学
      dialog:false,//検索ダイアログ表示管理
      keyword:"",
      tagNameList: getTagTypeDict('type'),
      filterdTags: [],
      selectedTags: []
    }
  },
  components: {
    //typeButton
    tagTypeIcon
    },
  props:['spotNameList'],//スポット一覧

    created(){
      this.changeSearchType
    },
    mounted(){
        this.types.push(... this.typeNameList ) // typesにtype name listを追加
        this.$set(this.featureIcons, 'reset', "mdi-map-marker-circle") // iconオブジェクトにreset icon追加
    },
    methods:{
        Search(){
            //選ばれた検索条件をMapに送信
            var univFlag = (this.nowUniv=="true" ? true : false);
            this.$emit('search',this.nowType,univFlag,this.keyword);
        },
        filterTags: function() {
            return this.tagNameList.filter(function(tag){
                return getTagTypeDict("stype")[tag].includes(this.nowType);
            });
        }
    },
    watch: {
        'nowType': function(){ // spot type を変えた時の処理
            this.selectedTags = []
            let spotType = this.nowType
            this.filterdTags = this.tagNameList.filter(function(tag){
                return getTagTypeDict("stype")[tag.toString()].indexOf(spotType) != -1;
            });
        },
    },
    
}
</script>

<style>
#search-button{
  z-index: 1000;
}
</style>