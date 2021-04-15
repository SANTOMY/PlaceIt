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

<script>
import {getSpotTypeDict} from "../../share/SpotTypeFunction"
export default {
    data: function(){
        return {
            nowType:'reset',//スポット検索の種別
            types:["reset"], //spot種別一覧を格納するlist -> mountedでデータ追加
            featureIcons: getSpotTypeDict('icon'), // iconを格納するオブジェクト -> mountedでデータ追加
            typeNameList: getSpotTypeDict('type') //spot type object のkey配列作成 -> mountedで'reset'追加
        }
    },
    created(){
        this.changeSearchType
    },
    mounted(){
        this.types.push(... this.typeNameList ) // typesにtype name listを追加
        this.$set(this.featureIcons, 'reset', "mdi-map-marker-circle") // iconオブジェクトにreset icon追加
    },
    methods:{
        //選ばれたジャンルタイプをMapに送信
        changeSearchType(type){
            this.nowType = type;
            this.$emit('change-search-type',this.nowType);
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