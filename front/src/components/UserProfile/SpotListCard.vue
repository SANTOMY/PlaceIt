<template>
    <v-container>
    <!-- ローディング画面 -->
        <v-skeleton-loader
            v-if="isLoading"
            type="list-item-avatar-three-line, image"
            class="mx-auto"
        ></v-skeleton-loader>
        <!-- カードリストの大枠 -->
        <v-card
            v-if="!isLoading"
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
                                    {{ card.name }}
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
            <spot-detail :showDialog="showDialog" :spot_id="selectedSpotID" @close="closeDialog()"/>
        </v-card>  
    </v-container>
</template>
<script>
    import spotDetail from '../SpotDetail/SpotDetail';
    import {getSpot} from '../../routes/spotRequest';
    import {average} from '../../routes/reviewRequest';
    import {getReviewBySpotId, getReviewByUserId} from '../../routes/reviewRequest';
    import {getSpotImage} from "../../routes/imageRequest"
    export default {
        props: {
            color: String,
            user: Object// 自分のユーザー情報
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
            showDialog: false,
            selectedSpotID: "",
            showNoCard: false,
            isLoading: true,
            userId: "",
            university: ""
        }),
        mounted() {
            // カテゴリ（おすすめ，作成，いいね）毎のページ数計算
            this.userId = this.user.id;
            this.university = this.user.university;
            this.ChangeCategory( this.CategorySelect )
        },
        methods:  {

            getSpotByUserId: async function(user_id){ // 作成スポット取得関数
                getSpot('', '', '', user_id, '').then(result => {
                    if( result.spots == undefined ){
                        return
                    }
                    const spot_length = result.spots.length
                    this.num_page = Math.ceil(spot_length/this.num_per_page)
                    if(spot_length < this.end){
                        this.end = spot_length
                    }
                    var j = this.begin;
                    for(let i = this.begin; i < this.end; i++){
                        const spt = result.spots[i];
                        const spt_id = spt.spot_id;
                        const name = spt.spot_name;
                        // レビューの計算
                        getReviewBySpotId(spt_id).then(result => {
                            const scores = [];
                            for (var rev of result.review) {
                                scores.push(rev.score);
                            }

                            const good = Math.round(10 * average(scores)) / 10;
                            getSpotImage(spt_id).then((result) => {
                                if (result.success && result.data != undefined) {
                                    const src = "data:image/jpeg;base64," + result.data[0].image
                                    this.spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                                } else {
                                    const src = require("@/assets/noimage.png");
                                    this.spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                                }
                            }).catch((exception) => {
                                console.log("Error in getSpotImage: ", exception)
                                const src = require("@/assets/noimage.png");
                                this.spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                            }).finally(()=>{
                                j += 1;
                                if(j == this.end){
                                    this.sortSpotsByScore( this.spot ); 
                                    if(this.spot.length==0) {
                                        this.showNoCard = true;
                                    }else{
                                        this.showNoCard = false;
                                    }
                                    this.isLoading = false;
                                }
                            })
                        }).catch((exception) => {
                            console.log("Error in getReviewBySpotId: ", exception)
                        })
                    }
                }).catch((exception) => {
                    console.log( "Error in getSpotByUserId: ", exception );
                })
            },

            getSpotYouReviewed: async function( user_id ){ //レビューしたスポット取得関数
                getReviewByUserId( user_id ).then( result => {
                    if( result.review == undefined ){
                        return
                    }
                    var reviewed_spot_ids = []
                    for( let rev of result.review ){
                        if(!reviewed_spot_ids.includes(rev.spot_id)){
                            reviewed_spot_ids.push( rev.spot_id );
                        }
                    }
                    const spot_length = reviewed_spot_ids.length;
                    this.num_page = Math.ceil(spot_length/this.num_per_page);
                    if(spot_length < this.end){
                        this.end = spot_length;
                    }
                    var j = this.begin;
                    for(let i = this.begin; i < this.end; i++){
                        getSpot( reviewed_spot_ids[i], '', '', '', '' ).then( result => {
                            const spt = result.spots[0];
                            const spt_id = spt.spot_id;
                            const name = spt.spot_name;
            
                            // レビューの計算
                            getReviewBySpotId(spt_id).then(result => {
                                const scores = [];
                                for (var rev of result.review) {
                                    scores.push(rev.score);
                                }
                                const good = Math.round(10 * average(scores)) / 10;
                                getSpotImage(spt_id).then((result) => {
                                    if (result.success && result.data != undefined) {
                                        const src = "data:image/jpeg;base64," + result.data[0].image
                                        this.spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                                    } else {
                                        const src = require("@/assets/noimage.png");
                                        this.spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                                    }
                                }).catch((exception) => {
                                    console.log("Error in getSpotImage: ", exception)
                                    const src = require("@/assets/noimage.png");
                                    this.spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                                }).finally(()=>{
                                    j += 1;
                                    if(j == this.end){
                                        this.sortSpotsByScore( this.spot ); 
                                        if(this.spot.length==0) {
                                            this.showNoCard = true;
                                        }else{
                                            this.showNoCard = false;
                                        }
                                        this.isLoading = false;
                                    }
                                })
                            }).catch((exception => {
                                console.log("Error in getReviewBySpotId: ", exception);
                            }));
                        } ).catch((exception) => {
                            console.log( "Error in getSpot: ", exception );
                        })
                    }
                } ).catch((exception) => {
                    console.log( "Error in getReviewByUserId: ", exception );
                })
            },

            getRecommendedSpots: async function(){ // おすすめスポット取得関数
                getSpot('', '', '', '', this.university).then( result => {
                    if( result.spots == undefined ){
                        return
                    }
                    const spot_length = result.spots.length
                    this.num_page = Math.ceil(spot_length/this.num_per_page)
                    if(spot_length < this.end){
                        this.end = spot_length
                    }
                    var j = this.begin;
                    for(let i = this.begin; i < this.end; i++){
                        const spt = result.spots[i];

                        // レビューの計算
                        getReviewBySpotId(spt.spot_id).then(result => {
                            const scores = [];
                            for (var rev of result.review) {
                                scores.push(rev.score);
                            }
                            const good = Math.round(10 * average(scores)) / 10;
                            
                            getSpotImage(spt.spot_id).then((result) => {
                                if (result.success && result.data != undefined) {
                                    const src = "data:image/jpeg;base64," + result.data[0].image
                                    this.spot.push({ "spotId": spt.spot_id, "name": spt.spot_name, "src": src, "good": good });
                                } else {
                                    const src = require("@/assets/noimage.png");
                                    this.spot.push({ "spotId": spt.spot_id, "name": spt.spot_name, "src": src, "good": good });
                                }
                            }).catch((exception) => {
                                console.log("Error in getSpotImage: ", exception)
                                const src = require("@/assets/noimage.png");
                                this.spot.push({ "spotId": spt.spot_id, "name": spt.spot_name, "src": src, "good": good });
                            }).finally(()=>{
                                j += 1;
                                if(j == this.end){
                                    this.sortSpotsByScore( this.spot ); 
                                    if(this.spot.length==0) {
                                        this.showNoCard = true;
                                    }else{
                                        this.showNoCard = false;
                                    }
                                    this.isLoading = false;
                                }
                            })
                        }).catch((exception => {
                            console.log("Error in getReviewBySpotId: ", exception)
                        }));
                    }     
                })
            },

            getNumber: function(number){
                // < 1 2 ... 10 > ←このタイプのボタンから入力を受け取る
                this.jumpSpotPage(number)
            },
            ChangeCategory: function( i ) {
                // カテゴリ（おすすめ，作成，レビュー）や表示ページの変更に伴い，
                // 表示するスポットを更新する
                this.isLoading = true;
                if( i != this.CategorySelect ){
                    this.CategorySelect = i
                    this.now_page = 1
                    this.begin = ( this.now_page - 1 ) * this.num_per_page
                    this.end = this.begin + this.num_per_page
                }
                this.CategorySelect = i
                this.spot = [];
                this.output_spot = [];
                if(i==0){
                    this.getSpotYouReviewed(this.userId) // いいねしたスポット表示
                }else if(i==1){
                    this.getSpotByUserId(this.userId) // 作ったスポット表示
                }else if(i==2){
                    this.getRecommendedSpots(this.university) // おすすめスポット表示
                }
            },
            // TODO: 以下3つの関数は似た形なので、1つにまとめる
            CreatedSpotSort: function () { // 作ったスポットを表示する関数 
                for( let i = this.begin; i < this.end; i++ ){
                    this.spot[ i - this.begin ] = this.my_spot[ i ]
                }
            },
            GoodSpotSort: function () { // レビューしたスポットを表示する関数
                for( let i = this.begin; i < this.end; i++ ){
                    this.spot[ i - this.begin ] = this.good_spot[ i ]
                }
            },
            RecommendedSpotSort: function () { // おすすめスポットを表示する関数
                for( let i = this.begin; i < this.end; i++ ){
                    this.spot[ i - this.begin ] = this.spot_list[ i ]
                }
            },
            spotInformationPage: function(value) { 
                this.showDialog = true;
                this.selectedSpotID = this.spot[value].spotId;
            },
            closeDialog() {
                this.showDialog = false;
            },

            jumpSpotPage: function( pageToJump ){
                // < 1 2 ... 10 > ←このタイプのボタンが押された時にページを変える
                // console.log( "jumpSpotPage is called. pageToJump: ", pageToJump )
                this.isLoading = true;
                this.now_page = pageToJump
                this.begin = ( this.now_page - 1 ) * this.num_per_page
                this.end = this.begin + this.num_per_page
                this.ChangeCategory( this.CategorySelect )
            },
            spot_num: function(){
                // 現在のカテゴリにあるスポットの数を計算
                if( this.CategorySelect == 0 ){
                    return this.good_spot.length
                }else if( this.CategorySelect == 1 ){
                    return this.my_spot.length
                }else{
                    return this.spot_list.length
                }
            },
            page_num: function(){
                // 現在のカテゴリにあるスポットの数を計算
                if( this.CategorySelect == 0 ){
                    return Math.ceil(this.good_spot.length/this.num_per_page)
                }else if( this.CategorySelect == 1 ){
                    return Math.ceil(this.my_spot.length/this.num_per_page)
                }else{
                    return Math.ceil(this.spot.length/this.num_per_page)
                }
            },
            sortSpotsByScore: async function( array ){ // スポットをスコアの高い順にソートする関数
                array.sort( function( a, b ){
                    if( a.good > b.good ){
                        return -1
                    }else{
                        return 1
                    }
                } )
            },
            shuffleArray: async function( array ){ // 配列をシャッフルする関数
            var newArray = [];
            while ( array.length > 0 ) {
                var n = array.length;
                var k = Math.floor( Math.random() * n );

                newArray.push( array[ k ] );
                array.splice( k, 1 );
            }
            return newArray;
            // return newArray.slice( 0, 10 )
            // みたいにすると，おすすめが毎回変わって面白いかも
            },
        },
    };
</script>
