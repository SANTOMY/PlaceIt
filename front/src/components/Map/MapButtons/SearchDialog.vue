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
    <v-card id="search-dialog">
    <!-- closeボタン -->
    <v-btn 
        id="close" 
        @click="dialog=false" 
        right 
        fixed
        text>
        <v-icon> mdi-close </v-icon>
    </v-btn>
    <!-- スポットタイプ検索 -->
    <v-container>
        <v-btn-toggle
            v-model="nowType"
            group
            mandatory>
            <v-btn
                v-for="type in types"
                :key="type" 
                :value="type" class="mx-auto" fab >
                <v-tooltip bottom :disabled="type=='reset'">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            v-bind="attrs"
                            v-on="on">
                            {{featureIcons[type]}}
                        </v-icon>
                    </template>
                    <span>{{ spotJpNames[type] }}</span>
                </v-tooltip> 
            </v-btn>
        </v-btn-toggle>
    </v-container>

    <!-- tag検索 -->
    <v-container>
        <v-autocomplete
            v-model="selectedTags"
            :items="filterdTags"
            item-text="jp"
            item-value="type"
            label="タグ"
            multiple
            single-line
            clearable
            deletable-chips
            prepend-icon="mdi-tag-multiple-outline"
        >
            <template v-slot:selection="{ item }">
                <v-chip
                    label
                    color="grey lighten-4"
                    @click="remove(item)"
                >
                    <tag-type-icon :type="item.type" :isLarge="false" toolTip/>
                    <!--
                    <h4>{{ item }}</h4>
                    -->
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

        <v-container>
        <v-card-actions>
            <!-- より詳細な検索条件の設定 -->
            <v-tooltip bottom>
                <template v-slot:activator="{on, attrs}">
                    <v-btn 
                    text
                    v-if="userLogin!=null"
                    @click="moreDetail=!moreDetail"
                    v-bind="attrs"
                    v-on="on"
                    >
                        <v-icon v-if="!moreDetail" small>
                            mdi-details
                        </v-icon>
                        <v-icon v-if="moreDetail" x-small>
                            mdi-triangle-outline
                        </v-icon>
                    </v-btn>
                </template>
                <span v-if="!moreDetail">より詳細な検索</span>
                <span v-if="moreDetail">詳細検索を閉じる</span>
            </v-tooltip>
        </v-card-actions>
        </v-container>


        <!-- 詳細検索設定 -->
        <v-expand-transition>
            <v-card
                v-if="moreDetail"
                class="transition-fast-in-fast-out v-card--moreDetail"
                style="height: 100%;"
                outlined>
                <!-- TODO : fileter by rating -->
                <!-- <v-container>
                    評価の下限
                    <star-rating 
                    v-model="rating"
                    v-bind:increment="0.1"
                    small />
                </v-container> -->

                <!-- 大学別検索 -->
                <v-container>
                    <v-btn-toggle
                    v-if="userLogin!=null"
                    v-model="nowUniv"
                    group
                    mandatory
                    >
                        <v-btn :value="false" class="mx-auto" fab>
                            <v-tooltip bottom>
                            <template v-slot:activator="{on, attrs}">
                                <v-icon v-bind="attrs" v-on="on">
                                    mdi-alpha-a-circle-outline
                                </v-icon>
                            </template>
                            <span>全ての所属大学のスポットを表示</span>
                            </v-tooltip>
                        </v-btn>
                        
                        <v-btn :value="true" class="mx-auto" fab >
                            <v-tooltip bottom>
                            <template v-slot:activator="{on, attrs}">
                                <v-icon v-bind="attrs" v-on="on">
                                    mdi-account-cowboy-hat
                                </v-icon>
                            </template>
                            <span>あなたの所属大学のスポットを表示</span>
                            </v-tooltip>
                        </v-btn>
                    </v-btn-toggle>
                
                </v-container>
            </v-card>
        </v-expand-transition>

        <v-container>
            <!-- 検索ボタン -->
            <v-btn @click="Search(); dialog=false">
                <v-icon>
                mdi-card-search
                </v-icon>
            </v-btn> 
            <v-tooltip bottom>
                <template v-slot:activator="{on, attrs}">
                    <v-btn @click="Clear();" class="mx-10" v-bind="attrs" v-on="on">
                        <v-icon> mdi-file-refresh </v-icon>
                    </v-btn> 
                </template>
                <span> 入力をクリア </span>
            </v-tooltip>
        </v-container>
    </v-card>
    </v-dialog>
</template>

<script>
import {getSpotTypeDict} from "../../share/SpotTypeFunction"
import {getTagTypeDict} from "../../share/TagTypeFunction"
import tagTypeIcon from "../../share/TagTypeIcon"
// import StarRating from 'vue-star-rating'

export default {
  data: function(){
    return {
      flag:true,
      nowType:'reset',//スポット検索の種別
      featureIcons: getSpotTypeDict('icon'), // iconを格納するオブジェクト -> mountedでデータ追加
      types:["reset"], //spot種別一覧を格納するlist -> mountedでデータ追加
      typeNameList: getSpotTypeDict('type'), //spot type object のkey配列作成 -> mountedで'reset'追加
      spotJpNames: getSpotTypeDict('jp'),
      nowUniv:false,//現在の大学
      dialog:false,//検索ダイアログ表示管理
      tagTypes: getTagTypeDict("all"),
      filterdTags: [],
      selectedTags: [],
      keyword:"",//検索キーワード
      moreDetail:false,//詳細検索フォームの表示管理フラグ
      rating:0,//評価の閾値
      userLogin: null,
    }
  },
  components: {
    //typeButton
    tagTypeIcon
    // StarRating
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
            this.$emit('search',this.nowType,this.nowUniv,this.keyword == undefined ? "" : this.keyword,this.rating,this.selectedTags);
        },
        remove :function(item) {
            const index = this.selectedTags.indexOf(item.getType());
            if (index >= 0) this.selectedTags.splice(index, 1);
        },
        Clear(){
            this.nowType='reset';
            this.selectedTags=[];
            this.keyword="";
            this.nowUniv=false;
            this.moreDetail=false;

        }
    },
    watch: {
        'nowType': function(){ // spot type を変えた時の処理
            this.selectedTags = []
            let spotType = this.nowType
            this.filterdTags = this.tagTypes.filter(function(tag) {
                return tag.getSpotTypes().indexOf(spotType) != -1;
            });
            if (spotType == "reset")
                this.filterdTags = [];
        },
        'dialog': function(){ // dialogが開いたときの処理
            this.userLogin = this.$store.state.userData;
        },
    },
    
}
</script>

<style>
#dialog-container{
    z-index: 1000;
}
#search-button{
    z-index: 1000;
    position: relative;
}
#close{
    z-index: 2000;
    position: absolute;
    text-align: right;
    margin:0;
}
#search-dialog{
    z-index: 1000;
    position: relative;
}
</style>