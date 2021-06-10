<template>
    <!-- カードリストの大枠 -->
    <v-card
        :class="color + ' lighten-4'" 
        height="450px"
    >
    
        <!-- カードのヘッダー部分 -->
        <v-toolbar
            :color="color"
            dark
        >
            <v-app-bar-nav-icon @click="drawer = true">
            </v-app-bar-nav-icon>

            <v-toolbar-title>{{SpotCategories[CategorySelect].title}}</v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- TODO: 検索ボタン -->
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
                        v-for="(item, index) in SpotCategories"
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
            <v-card v-if="showNoCard" height="350">
                <v-card-text>
                    <p class="display-1 text--primary">
                        選択されたスポットは存在しません。
                    </p>
                </v-card-text>
            </v-card>
            <v-row dense justify="center" v-if="!showNoCard">
                <v-col
                    v-for="(card, index) in spot"
                    :key="index"
                    :cols="4"
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
                                {{ card.spotName }}
                            </v-toolbar-title>
              
                        <v-spacer></v-spacer>

                        <v-icon class="mr-1">mdi-star</v-icon>

                        <span class="subheading mr-2">{{card.good}}</span>

                        </v-card-actions>
                    </v-card>
        
                </v-col> 
            </v-row>
            <!-- スポットのページ送り -->
            <v-card-actions>
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
                </v-col>
            </v-card-actions>

        </v-container>
        <spot-detail :showDialog="showDialog" :spot_id="selectedSpotID" :spot_name="selectedSpotName" :spot_type="selectedSpotType" :user_id="selectedUserID" @close="closeDialog()"/>
    </v-card>  
</template>
<script>
    import spotDetail from '../SpotDetail/SpotDetail';
    export default {
        props: {
            color: String,
            spot_list: null, // おすすめスポット
            good_spot_list: null, // 自分の評価したスポット
            my_spot_list: null, // 自分の作成したスポット
            user_list: null // 自分のユーザー情報
        },

        components: {
            spotDetail
        },

        data: () => ({
            spot: [],
            CategorySelect: 2, //Spot list select. The default is a recommended spot.
            drawer: false,
            SpotCategories: [
                { title: 'レビューしたスポット', icon: 'mdi-home-city'},
                { title: '作成スポット', icon: 'mdi-account'},
                { title: 'おすすめスポット', icon: 'mdi-account-group-outline'},
            ],
            begin: 0, // show spots from (begin)th to (end)th
            end: 3,
            now_page: 0, // 初期ページ
            num_per_page: 3, // 1ページの表示スポット数
            num_page: 1, // ページ数
            num_page_array: [ 10, 10, 10 ],
            showNoCard: false,
            //以下spotDetailへのprops渡し用変数
            showDialog: false,
            selectedSpotID: "",
            selectedSpotName:"",
            selectedSpotType:"",
            selectedUserID:"",
        }),
        mounted() {
            this.spot = this.spot_list
            console.log(this.spot)//debug
            // カテゴリ（おすすめ，作成，いいね）毎のページ数計算
            this.ChangeCategory( this.CategorySelect )
        },
        methods:  {
            getNumber: function(number){
                // < 1 2 ... 10 > ←このタイプのボタンから入力を受け取る
                this.jumpSpotPage(number)
            },
            ChangeCategory: function( i ) {
                // カテゴリ（おすすめ，作成，レビュー）や表示ページの変更に伴い，
                // 表示するスポットを更新する
                // console.log( "ChangeCategory is called. ( begin, end ): ", this.begin, this.end )
                if( i != this.CategorySelect ){
                    this.CategorySelect = i
                    this.jumpSpotPage( 1 )
                    // console.log( "begin, end, now_page: ", this.begin, this.end, this.now_page )
                }
                this.CategorySelect = i
                this.num_page = this.page_num()
                this.spot = [];
                if(i==0){
                    this.GoodSpotSort() // いいねしたスポット表示
                }else if(i==1){
                    this.CreatedSpotSort() // 作ったスポット表示
                }else if(i==2){
                    this.RecommendedSpotSort() // おすすめスポット表示
                }

                if(this.spot.length==0) {
                    this.showNoCard = true;
                }else{
                    this.showNoCard = false;
                }
            },
            // TODO: 以下3つの関数は似た形なので、1つにまとめる
            CreatedSpotSort: function () { // 作ったスポットを表示する関数 
                for( let i = this.begin; i < this.end; i++ ){
                    this.spot[ i - this.begin ] = this.my_spot_list[ i ]
                }
            },
            GoodSpotSort: function () { // レビューしたスポットを表示する関数
                for( let i = this.begin; i < this.end; i++ ){
                    this.spot[ i - this.begin ] = this.good_spot_list[ i ]
                }
            },
            RecommendedSpotSort: function () { // おすすめスポットを表示する関数
                for( let i = this.begin; i < this.end; i++ ){
                    this.spot[ i - this.begin ] = this.spot_list[ i ]
                }
            },
            spotInformationPage: function(value) { // spotのカードをクリックしたときに動く関数
                // console.log("spotInformationPage: ", this.spot[value]) // Debug
                this.showDialog = true;
                this.selectedSpotID = this.spot[value].spotId;
                this.selectedSpotName = this.spot[value].spotName;
                this.selectedSpotType = this.spot[value].spotType;
                this.selectedUserID = this.spot[value].userId;
            },
            // spotInformationPage: function(value) { // TODO: spotのカードをクリックしたときに動く関数
            //     console.log(this.spot_list[value].spotId) // Debug
            //     this.$router.push({ path: 'spot', query: { "spotId": this.spot_list[value].spotId } })
            closeDialog() {
                this.showDialog = false;
            },

            jumpSpotPage: function( pageToJump ){
                // < 1 2 ... 10 > ←このタイプのボタンが押された時にページを変える
                // console.log( "jumpSpotPage is called. pageToJump: ", pageToJump )
                this.now_page = pageToJump
                this.begin = ( this.now_page - 1 ) * this.num_per_page
                this.end = this.begin + this.num_per_page
                if( this.end > this.spot_num() ){ 
                    // 最終ページがnum_per_pageで割り切れない数だった時の処理
                    this.end = this.spot_num()
                }
                this.ChangeCategory( this.CategorySelect )
            },
            spot_num: function(){
                // 現在のカテゴリにあるスポットの数を計算
                if( this.CategorySelect == 0 ){
                    return this.good_spot_list.length
                }else if( this.CategorySelect == 1 ){
                    return this.my_spot_list.length
                }else{
                    return this.spot_list.length
                }
            },
            page_num: function(){
                // 現在のカテゴリにあるスポットの数を計算
                if( this.CategorySelect == 0 ){
                    return Math.ceil(this.good_spot_list.length/this.num_per_page)
                }else if( this.CategorySelect == 1 ){
                    return Math.ceil(this.my_spot_list.length/this.num_per_page)
                }else{
                    return Math.ceil(this.spot_list.length/this.num_per_page)
                }
            },
        }
    };
</script>
