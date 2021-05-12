<template>
    <v-dialog
      v-model="showDialog"
      width="1000"
      height="500"
      persistent
    >
        <v-card height="900">
            <v-skeleton-loader
                v-if="isLoading"
                type="image, article, article"
                class="mx-auto"
            ></v-skeleton-loader>
            <v-container v-if="!isLoading">
                <v-toolbar
                flat
                color="transparent"
                >
                    <v-icon>mdi-account</v-icon>
                    <v-toolbar-title>ユーザープロファイル</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        @click="closeDialog()"
                    >
                        <v-icon>mdi-close-circle-outline</v-icon>
                    </v-btn>
                </v-toolbar>
                

        <!-----------------------ユーザー写真------------------------------------------------->        
            <v-row>
                <v-col>
                    <v-layout justify-center>
                        <v-avatar size="200">
                            <img v-bind:src="user.src">
                        </v-avatar>
                    </v-layout>
                </v-col>
        <!-----------------------ユーザー名とプロフィール修正ボタン------------------------->
                    <v-col>
                        ユーザー名
                        <h1>{{ user.username }}</h1>
                    </v-col>
                </v-row>
        <!----------------------スポットリストカード------------------------------------------------->
                <SpotListCard 
                    v-bind:spot_list="spot"
                    v-bind:user_list="user"
                    v-bind:my_spot_list="my_spot"
                    v-bind:good_spot_list="good_spot"
                    color="green"
                ></SpotListCard>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>

import SpotListCard from "../UserProfile/SpotListCard.vue";
import {getSpot} from '../../routes/spotRequest'
import {getProfileImage} from "../../routes/imageRequest"
import {average} from '../../routes/reviewRequest';
import {getReviewByUserId} from '../../routes/reviewRequest';
import {SpotExampleData} from "./SpotExampleData";

export default {

    components: {
        SpotListCard,
    },
    props:{
        user: null,
        showDialog: Boolean,
    },
    data() {
        return {
            // user : null,
            isLoading: true,
            spot: SpotExampleData(),
            my_spot: [
                // 自分の作成したスポット
                // required attribute: name, src, good
            ],
            spot_to_show: [
                // my_spotのうち表示するスポット
                // いまはまだ必要ないけど，スポット投稿数が多くなると必要かも
            ],
            good_spot: [
                // 自分が評価したスポット
            ],
            show_count: 0,
        }
    },

    methods:  {
        getSpotByUserId: async function(user_id){
            return getSpot('', '', '', user_id, '').then(result => {
                // console.log( "result of getSpot: ", result );
                for( var spt of result.spots ){
                    var name = spt.spot_name;
                    // TODO: to get images from DB
                    var src = require( "@/assets/Mac.jpg" );
                    if( Math.random() >= 0.5 ){
                        src = require('@/assets/mos.png');
                    }
                    // レビューの計算
                    var scores = [];
                    for( var rev of result.review ){
                        if( spt.spot_id == rev.spot_id ){
                            scores.push( rev.score );
                        }
                    }
                    var good = Math.round( 10 * average( scores ) ) / 10;
                    this.my_spot.push( { "name": name, "src": src, "good": good } );
                }
                return true   
            }).catch((exception) => {
                console.log( "Error in getSpotByUserId: ", exception );
            })
        },
        getSpotYouReviewed: async function( user_id ){
            return getReviewByUserId( user_id ).then( result => {
                // console.log( 'result of getReviewByUserId: ', result );
                var reviewd_spot_ids = new Set()
                for( let rev of result.review ){
                    reviewd_spot_ids.add( rev.spot_id );
                }
                // console.log( 'reviewed_spot_ids: ', reviewd_spot_ids )
                for( let reviewd_spot_id of reviewd_spot_ids ){
                    getSpot( reviewd_spot_id, '', '', '', '' ).then( result => {
                        // console.log( 'results of getSpot', result )
                        var spt = result.spots[ 0 ];
                        var name = spt.spot_name;
                        // TODO: to get images from DB
                        var src = require( "@/assets/Mac.jpg" );
                        if( Math.random() >= 0.5 ){
                            src = require('@/assets/mos.png');
                        }
                        // レビューの計算
                        var scores = [];
                        for( var rev of result.review ){
                            if( spt.spot_id == rev.spot_id ){
                                scores.push( rev.score );
                            }
                        }
                        var good = Math.round( 10 * average( scores ) ) / 10;
                        this.good_spot.push( { "name": name, "src": src, "good": good } );
                    } ).catch((exception) => {
                        console.log( "Error in getReviewByUserId: ", exception );
                    })
                }
                return true
            } ).catch((exception) => {
                console.log( "Error in getSpotYouReviewed: ", exception );
            })
        },
        getLatestSpots: function( left = 0, right ){
            console.log( "latestSpots", ( this.my_spot ).slice( left, right ) )
            this.spot_to_show = ( this.my_spot ).slice( left, right )
        },
        closeDialog: function() {
            this.$emit("close");
        },

    },
    watch: {
        show_count: function() {
            if(this.show_count!=2) return;
            if(this.show_count==2) this.isLoading=false
        },
        showDialog: function() {    //ダイアログが開いた(閉じた)時に実行するメソッド
            if(!this.showDialog) return;
            this.isLoading = true; 
            // this.user = {"username": this.username,"user_id": this.id, "src":require('@/assets/default-icon.jpeg') };
            this.my_spot = []; // 作成スポット
            this.good_spot = []; // レビューしたスポット
            this.spot_to_show = []; // TODO: 表示するスポットの制限
            this.show_count = 0 // 読み込みが終わり次第ロード画面非表示 

            this.getSpotByUserId( this.user.id )
                .then( () =>{
                    this.getLatestSpots( 0, 28 )
                    this.show_count += 1
                    console.log('my_spot length',this.my_spot.length)
            })

            this.getSpotYouReviewed( this.user.id )
                .then( () =>{
                    this.show_count += 1
                    console.log('good_spot length',this.good_spot.length)
                })
            if(this.user.src==undefined){
            getProfileImage( this.user.user_id )
                .then(result => {
                    if(!result.success) return;
                    // console.log(result.data.image);
                    this.user.src = "data:image/jpeg;base64," + result.data.image;
                })
            }
        }
    }
};
</script>