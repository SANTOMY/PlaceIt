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
                <span v-if="!moreDetail">Set more search details for filtering.</span>
                <span v-if="moreDetail">Finish to set search details for filtering.</span>
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
                <v-container>
                    評価の下限
                    <star-rating 
                    v-model="rating"
                    v-bind:increment="0.1"
                    small />
                </v-container>

                <!-- 大学別検索 -->
                <v-container>
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
            </v-card>
        </v-expand-transition>
        
        <!-- 検索ボタン -->
        <v-btn @click="Search(); dialog=false">
            <v-icon>
            mdi-card-search
            </v-icon>
        </v-btn> 
    </v-card>
    </v-dialog>
</template>

<script>
import {getSpotTypeDict} from "../../share/SpotTypeFunction"
import StarRating from 'vue-star-rating'

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
      keyword:"",//検索キーワード
      moreDetail:false,//詳細検索フォームの表示管理フラグ
      rating:0,//評価の閾値
    }
  },
  components: {
    StarRating
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
        this.$emit('search',this.nowType,univFlag,this.keyword,this.rating);
      },
    }
    
}
</script>

<style>
#search-button{
  z-index: 1000;
}
</style>