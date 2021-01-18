<template>
    <!-- カードリストの大枠 -->
    <v-card
        :class="color + ' lighten-4'" 
        height="500px"
    >
    
        <!-- カードのヘッダー部分 -->
        <v-toolbar
            :color="color"
            dark
        >

            <v-app-bar-nav-icon @click="drawer = true">
            </v-app-bar-nav-icon>

            <v-toolbar-title>{{items[select].title}}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-toolbar>

        <!-- サイドバー作成 -->
        <v-navigation-drawer
            v-model="drawer"
            absolute
            temporary
            height="145px"
        >
            <v-list
                nav
                dense
            >
                <v-list-item-group
                
                    active-class="deep-purple--text text--accent-4" 
                >
                    <v-list-item
                        v-for="(item, index) in items"
                        :key="index"
                        @click="ChangeCategory(index)"
                        v-model="drawer"
                    >
                    
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                    
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    
                    </v-list-item>

                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <!-- スポット表示 -->
        <v-container fluid>
            <v-row dense justify="center">
                <v-col
                    v-for="(card, index) in spot"
                    :key="index"
                >

                    <!-- サブカード -->
                    <v-card max-width="400" 
                        @click="spotInformationPage(index)"
                    >
                        <!-- カード画像 -->
                        <v-img
                            :src="card.src"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="300px"
                        >
                        </v-img>
            
                        <v-card-actions>
              
                            <v-toolbar-title
                                class="px-2"
                            >
                                {{ card.name }}
                            </v-toolbar-title>
              
                        <v-spacer></v-spacer>

                        <v-icon class="mr-1">mdi-heart</v-icon>

                        <span class="subheading mr-2">{{card.good}}</span>

                        </v-card-actions>
                    </v-card>
        
                </v-col> 
            </v-row>
            <!-- スポットのページ送り -->
            <v-card-actions>
                <v-row class="mt-1">
                    <v-icon
                        class="ml-8"
                        large
                        @click="changeSpotPage( 3, ahead = false )"
                    >
                        mdi-chevron-left
                    </v-icon>
                    <v-icon
                        class="ml-6"
                        large
                        @click="changeSpotPage( 3 )"
                    >
                        mdi-chevron-right
                    </v-icon>
                </v-row>
            </v-card-actions>

            <!-- スポットのページ変更 -->
            <v-col>
                <v-row justify="center">
                    <v-col cols="8">
                        <v-container class="max-width">
                            <v-pagination                                
                                @input="getNumber"
                                v-model="now_page"
                                :length="num_page"
                                :total-visible="7"
                            ></v-pagination>
                        </v-container>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="5">
                    </v-col>
                </v-row>
            </v-col>

        </v-container>
  
    </v-card>  

</template>
<script>

    export default {
    
        props: {
            color: String,
            spot_list: null, // おすすめスポット
            my_spot_list: null, // 自分の作成したスポット
            user_list: null // 自分のユーザー情報
        },

        data: () => ({
            spot: [],
            select: 2, //The default is a recommended spot.
            drawer: false,
            items: [
                { title: 'いいね！したスポット', icon: 'mdi-home-city' },
                { title: '作成スポット', icon: 'mdi-account' },
                { title: 'おすすめスポット', icon: 'mdi-account-group-outline' },
            ],
            begin: 0, 
            end: 3,
            now_page: 0,
            num_per_page: 3,
            num_page: 10,
            num_page_array: [ 10, 10, 10 ]
        }),
        mounted() {
            this.spot = this.spot_list
            this.user = this.user_list
            this.ChangeCategory( this.select )
        },
        methods:  {
            getNumber: function(number){
                // < 1 2 ... 10 > ←このタイプのボタンから入力を受け取る
                console.log(number)
                this.jumpSpotPage(number)
            },
            ChangeCategory: function( i ) {
                // カテゴリ（おすすめ，作成，いいね）や表示ページの変更に伴い，
                // 表示するスポットを更新する
                console.log( "ChangeCategory is called. ( begin, end ): ", this.begin, this.end )
                if( i != this.select ){
                    this.select = i
                    this.jumpSpotPage( 1 )
                    console.log( "begin, end, now_page: ", this.begin, this.end, this.now_page )
                }
                this.select = i
                this.num_page = this.num_page_array[ this.select ]
                this.spot = [];
                if(i==0){
                    this.GoodSpotSort()
                }else if(i==1){
                    this.CreatedSpotSort()
                }else if(i==2){
                    this.RecommendedSpotSort()
                }
            },
            CreatedSpotSort: function () { // 作ったスポットを表示する関数 
                for( let i = this.begin; i < this.end; i++ ){
                    this.spot[ i - this.begin ] = this.my_spot_list[ i ]
                }
            },
            GoodSpotSort: function () { // いいね！したスポットを表示する関数
                let j = 0
                for (let i = 0; i < this.spot_list.length; i++){
                    for (let k = 0; k < this.spot_list[i].review.length; k++){
                        if (this.spot_list[i].review[k].user_id==this.user.user_id){
                            this.spot[j] = this.spot_list[i]
                            j++;
                            continue;
                        }
                    }
                }
            },
            RecommendedSpotSort: function () { // おすすめスポットを表示する関数
                for( let i = this.begin; i < this.end; i++ ){
                    this.spot[ i - this.begin ] = this.spot_list[ i ]
                }
            },
            spotInformationPage: function(value) { // spotのカードをクリックしたときに動く関数
                console.log(this.spot_list[value].spotId) // Debug
                this.$router.push({ path: 'spot', query: { "spotId": this.spot_list[value].spotId } })
            },
            changeSpotPage: function( diff, ahead = true ){
                // < > ←このタイプのボタンが押された時にページ送りする
                let spot_num
                if( this.select == 0 ){
                    spot_num = this.spot_list.length
                }else if( this.select == 1 ){
                    spot_num = this.my_spot_list.length
                }else{
                    spot_num = this.spot_list.length
                }

                if( ahead == true ){
                    if( this.end + diff <= spot_num ){
                        this.begin = this.begin + diff
                        this.end = this.end + diff
                    }else{
                        this.begin = spot_num - ( this.end - this.begin )
                        this.end = spot_num
                    }
                }else{
                    if( this.begin - diff >= 0 ){
                        this.begin = this.begin - diff
                        this.end = this.end - diff
                    }else{
                        this.end = this.end - this.begin
                        this.begin = 0
                    }
                }
                this.ChangeCategory( this.select )
            },
            jumpSpotPage: function( pageToJump ){
                // < 1 2 ... 10 > ←このタイプのボタンが押された時にページを変える
                console.log( "jumpSpotPage is called. pageToJump: ", pageToJump )
                this.now_page = pageToJump
                this.begin = ( this.now_page - 1 ) * this.num_per_page
                this.end = this.begin + this.num_per_page
                if( this.end > this.spot_num() ){
                    this.end = this.spot_num()
                }
                this.ChangeCategory( this.select )
            },
            spot_num: function(){
                // 現在のカテゴリにあるスポットの数を計算
                if( this.select == 0 ){
                    return this.spot_list.length
                }else if( this.select == 1 ){
                    return this.my_spot_list.length
                }else{
                    return this.spot_list.length
                }
            }
        }
    };
</script>