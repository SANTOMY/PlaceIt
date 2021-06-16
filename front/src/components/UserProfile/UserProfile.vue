<template>
<!-- ローディング画面 -->
    <v-skeleton-loader
        v-if="isLoading"
        type="list-item-avatar-three-line, image"
        class="mx-auto"
    ></v-skeleton-loader>
    <user-profile-detail 
        v-else
        :user="user"
        :otherUser="otherUser"
        :my_spot="my_spot"
        :good_spot="good_spot"
        :spot="spot"
    />
</template>

<script>

import userProfileDetail from "./UserProfileDetail.vue";
import {getProfileImage} from "../../routes/imageRequest"
import {getSpot} from '../../routes/spotRequest';
import {average} from '../../routes/reviewRequest';
import {getReviewBySpotId, getReviewByUserId} from '../../routes/reviewRequest';
import {getSpotImage} from "../../routes/imageRequest"
// import {SpotExampleData} from "../share/SpotExampleData";
// import {getSpotByUserId,getSpotYouReviewed,getRecommendedSpots} from '../share/GetProfileInformation.js';

export default {

    components: {
        userProfileDetail
    },
    data() {
        return {
            otherUser: this.$store.state.otherUser, // other user profile judge
            user: { 
                // ユーザー仮データ
            },
            isLoading: true,
            spot: [],
            my_spot: [
                // 自分の作成したスポット
                // required attribute: name, src, good
            ],
            // spot_to_show: [
            //     // my_spotのうち表示するスポット
            //     // いまはまだ必要ないけど，スポット投稿数が多くなると必要かも
            // ],
            good_spot: [
                // 自分が評価したスポット
            ],
            show_count: 0
        }
    },
    mounted() {
        if(this.otherUser==true){
            this.user= { 
                id: this.$store.state.otherUserData.userId,
                username: this.$store.state.otherUserData.userName,
                email: null,
                password: null,
                university: this.$store.state.otherUserData.university,
                src: require('@/assets/default-icon.jpeg')
            }
            // this.otherUser = true
        }else if(this.otherUser==false){
            this.user= { 
                id: this.$store.state.userData.userId,
                username: this.$store.state.userData.userName,
                email: this.$store.state.userData.email,
                password: this.$store.state.userData.password,
                university: this.$store.state.userData.university,
                src: require('@/assets/default-icon.jpeg')
            }
        }else{
            alert("URLが間違っており、読み込めませんでした。");
            return
        }
        
        getProfileImage( this.user.id )
            .then(result => {
                if(!result.success) return;
                this.user.src = "data:image/jpeg;base64," + result.data.image;
            })
        
        this.getSpotByUserId( this.user.id )
        this.getSpotYouReviewed( this.user.id )
        this.getRecommendedSpots( this.user.university )
    },
    methods: {    
        getSpotByUserId: async function(user_id){ // 作成スポット取得関数
            getSpot('', '', '', user_id, '').then(result => {
                const spot_length = result.spots.length
                var i = 0;
                for( var spt of result.spots ){
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
                                this.my_spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                            } else {
                                const src = require("@/assets/noimage.png");
                                this.my_spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                            }
                        }).catch((exception) => {
                            console.log("Error in getSpotImage: ", exception)
                            const src = require("@/assets/noimage.png");
                            this.my_spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                        }).finally(()=>{
                            i += 1;
                            this.sortSpotsByScore( this.my_spot )
                            if (i==spot_length){
                                this.show_count +=1;
                                console.log('success getSpotByUserId')
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
                var reviewd_spot_ids = new Set()
                for( let rev of result.review ){
                    reviewd_spot_ids.add( rev.spot_id );
                }
                const spot_length = reviewd_spot_ids.size
                var i = 0;
                for( let reviewd_spot_id of reviewd_spot_ids ){
                    getSpot( reviewd_spot_id, '', '', '', '' ).then( result => {
                        const spt = result.spots[ 0 ];
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
                                    this.good_spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                                } else {
                                    const src = require("@/assets/noimage.png");
                                    this.good_spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                                }
                            }).catch((exception) => {
                                console.log("Error in getSpotImage: ", exception)
                                const src = require("@/assets/noimage.png");
                                this.good_spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                            }).finally(()=>{
                                i += 1;
                                this.sortSpotsByScore( this.good_spot )
                                if (i==spot_length){
                                    this.show_count +=1;
                                    console.log("success getSpotYouReviewed ")
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

        getLatestSpots: function( left = 0, right ,spot){ //スポットが多すぎるときの処理。
            // TODO: 他のスポットにも対応
            console.log( "latestSpots", ( spot ).slice( left, right ) )
            return ( spot ).slice( left, right )
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

        sortSpotsByScore: async function( array ){ // スポットをスコアの高い順にソートする関数
            array.sort( function( a, b ){
                if( a.good > b.good ){
                    return -1
                }else{
                    return 1
                }
            } )
        },

        getRecommendedSpots: async function(user_univ){ // おすすめスポット取得関数
            getSpot('', '', '', '', user_univ).then( result => {
                this.shuffleArray( result.spots ).then(result =>{
                    const spot_length = result.length
                    var i = 0;
                    for( var spt of result ){
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
                                i += 1;
                                this.sortSpotsByScore( this.spot )
                                this.spot = this.spot.slice( 0, 6 ) // 上位6件に限定
                                if (i==spot_length){
                                    console.log("success getRecommendedSpots ")
                                    this.show_count +=1;
                                }
                            })
                        }).catch((exception => {
                            console.log("Error in getReviewBySpotId: ", exception)
                        }));
                    }        
                })
            }).catch((exception) => {
                console.log( "Error in getSpot: ", exception );
            })
        },
    },
    watch:  {
        show_count: function() {
            if(this.show_count!=3) {
                return
            }else{
                this.isLoading=false
            }
        },
    },
}
</script>
