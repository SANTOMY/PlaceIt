<template>
    <v-container>
        <h1>ユーザープロファイル</h1>
<!-----------------------修正処理(修正ボタンを押すと起動)------------------------------------------------>
        <v-dialog v-model="dialogEdit" width=500>
            <UserEdit 
                @close="closeUserEdit"
                v-bind:user="user"
                ref="child"
            >
            </UserEdit>
        </v-dialog>
<!-----------------------ユーザー写真------------------------------------------------->        
        <v-row>
            <v-col>
                <v-layout justify-center>
                    <v-avatar size="200">
                        <img v-bind:src="user.src">
                    </v-avatar>
                </v-layout>
            </v-col>
<!-----------------------特定のユーザーが投稿したスポットを取得するテスト------------->
            <!-- <v-col>
                スポットの取得テスト1
                <h1>{{ user.username }}</h1>
                
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="getSpotByUserId( 'aaa' )"
                    >
                    スポットの取得テスト2
                    </v-btn> 
            </v-col> -->
<!-----------------------ユーザー名とプロフィール修正ボタン------------------------->
            <v-col>
                ユーザー名
                <h1>{{ user.username }}</h1>
                
                    <v-spacer></v-spacer>
                    <v-btn
                        v-model="editer"
                        @click="editProfile"
                    ><!-------editerのtrue/false変更され、editProfile()が起動するボタン----->
                    edit
                    </v-btn> 
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
</template>

<script>

import SpotListCard from "./SpotListCard.vue";
import UserEdit from "./UserEdit.vue";
import {getUser} from '../../routes/userRequest'
import {getSpot} from '../../routes/spotRequest'
import { average } from '../../routes/reviewRequest';
import {getReviewByUserId} from '../../routes/reviewRequest'

export default {

    components: {
        SpotListCard,
        UserEdit
    },
    data() {
        return {
            editer: false,
            dialogEdit: false,
            user: { // ユーザー仮データ
                user_id: 'default_id',
                username: this.$store.state.userData.userName,
                email: this.$store.state.userData.email,
                password: this.$store.state.userData.password,
                src: require('@/assets/pose_kuyashii_man.png')
            },
            spot: [ // spot仮データ
                {
                    name: 'マクドナルド',
                    spotId: '000000',
                    type: 'restaurant',
                    user_id: '2bedc185-298d-49c4-b1e7-20897646dd92',
                    username: 'asada',
                    good: 123,
                    src: require("@/assets/Mac.jpg"),
                    review:[
                        { user_id:'000000' },
                        { user_id:'000001' }
                    ]
                },
                {
                    name: 'モスバーガー',
                    spotId: '000001',
                    type: 'restaurant',
                    username: 'takata',
                    user_id: '000001',
                    good: 150,
                    src: require('@/assets/mos.png'),
                    review:[
                        { user_id:'000001' },
                        { user_id:'000002' }
                    ]
                },      
                {
                    name: 'KFC',
                    spotId: '000002',
                    type: 'restaurant',
                    user_id: '000002',
                    username: 'matsuo',
                    good: 121,
                    src: require('@/assets/KFC.jpg'), 
                    review:[
                        { user_id:'000002' },
                        { user_id:'000000' }
                    ]
                },
                {
                    name: 'Lotteria',
                    spotId: '000003',
                    type: 'restaurant',
                    user_id: '000003',
                    username: 'nakamura',
                    good: 99,
                    src: require('@/assets/lotteria.png'), 
                    review:[
                        { user_id:'000002' },
                        { user_id:'000000' }
                    ]
                } 
            ],
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
            ]
        }
    },
    mounted: function(){
        // call getUser(email) from .vue file:
        getUser(this.user.email)
            .then(result => {
                console.log(result[0])
                console.log(result[0].username)
                this.user.username = result[0].username
                this.user.user_id = result[0].id
                this.getSpotByUserId( this.user.user_id )
                    .then( () =>{
                        this.getLatestSpots( 0, 28 )
                })
                this.getSpotYouReviewed( this.user.user_id )
                    .then( () =>{
                        return
                    } )
        })
    },
    methods:  {
        editProfile: function() {
            this.dialogEdit = true
        },
        closeUserEdit: function(){          
            this.dialogEdit = false
        },
        getSpotByUserId: async function(user_id){
            return getSpot('', '', '', user_id, '').then(result => {
                console.log( "result of getSpot: ", result );
                for( var s in result.spots ){
                    var name = result.spots[ s ].spot_name;
                    // TODO: to get images from DB
                    var src = require( "@/assets/Mac.jpg" );
                    if( Math.random() >= 0.5 ){
                        src = require('@/assets/mos.png');
                    }
                    var scores = [];
                    for( var r in result.review ){
                        if( result.spots[ s ].spot_id == result.review[ r ].spot_id ){
                            scores.push( result.review[ r ].score );
                        }
                    }
                    var good = average( scores );
                    this.my_spot.push( { "name": name, "src": src, "good": good } );
                }
                return true   
            }).catch((exception) => {
                console.log( "Error in getSpotByUserId: ", exception );
            })
        },
        getSpotYouReviewed: async function( user_id ){
            return getReviewByUserId( user_id ).then( result => {
                console.log( 'result of getReviewByUserId: ', result );
                var reviewd_spot_ids = new Set()
                for( let r of result.review ){
                    reviewd_spot_ids.add( r.spot_id );
                }
                console.log( 'reviewed_spot_ids: ', reviewd_spot_ids )
                for( let reviewd_spot_id of reviewd_spot_ids ){
                    getSpot( reviewd_spot_id, '', '', '', '' ).then( result => {
                        console.log( 'results of getSpot', result )
                        var s = result.spots[ 0 ];
                        var name = s.spot_name;
                        // TODO: to get images from DB
                        var src = require( "@/assets/Mac.jpg" );
                        if( Math.random() >= 0.5 ){
                            src = require('@/assets/mos.png');
                        }
                        var scores = [];
                        for( var re in result.review ){
                            if( s.spot_id == result.review[ re ].spot_id ){
                                scores.push( result.review[ re ].score );
                            }
                        }
                        var good = average( scores );
                        this.good_spot.push( { "name": name, "src": src, "good": good } );
                    } ).catch((exception) => {
                        console.log( "Error in getSpotByUserId: ", exception );
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
        }
    }
};
</script>
