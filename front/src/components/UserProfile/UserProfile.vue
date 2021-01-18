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
            color="green"
        ></SpotListCard>
    </v-container>
</template>

<script>

import SpotListCard from "./SpotListCard.vue";
import UserEdit from "./UserEdit.vue";
import {getUser} from '../../routes/userRequest'
import {getSpot} from '../../routes/spotRequest'

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
            console.log( "typeof user_id: ", typeof user_id, user_id )
            return getSpot('', '', '', user_id).then(result => {
                console.log( result );
                for( var s in result.spots ){
                    var name = result.spots[ s ].spot_name;
                    // TODO: to get images from DB
                    var src = require( "@/assets/Mac.jpg" );
                    if( Math.random() >= 0.5 ){
                        src = require('@/assets/mos.png');
                    }
                    var good = 1024;
                    this.my_spot.push( { "name": name, "src": src, "good": good } );
                }
                return true   
            })
        },
        getLatestSpots: function( left = 0, right ){
            console.log( "latestSpots", ( this.my_spot ).slice( left, right ) )
            this.spot_to_show = ( this.my_spot ).slice( left, right )
        }
    }
};
</script>
