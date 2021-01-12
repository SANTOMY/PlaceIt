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
            color="green"
        ></SpotListCard>
    </v-container>
</template>

<script>

import SpotListCard from "./SpotListCard.vue";
import UserEdit from "./UserEdit.vue";
import {getUser} from '../../routes/userRequest'
// import {getSpot} from '../../routes/spotRequest'

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
                username: this.$store.state.userData.name,
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
                }      
            ],
            my_spot: [
                // required attribute: name, src, good
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
        })
        // this.getSpotByUserId( "aaa" ) // ToDo userIDからspot情報を取得
    },
    methods:  {
        editProfile: function() {
            this.dialogEdit = true
        },
        closeUserEdit: function(){          
            this.dialogEdit = false
        },
        // ToDo userIDからspot情報を取得する関数
        // getSpotByUserId: function(user_id){
        //     getSpot('', '', '', user_id).then(result => {
        //         console.log( result );
        //         for( var s in result.spots ){
        //             var name = result.spots[ s ].spot_name;
        //             var src = require( "@/assets/Mac.jpg" );
        //             var good = 1024;
        //             this.my_spot.push( { "name": name, "src": src, "good": good } );
        //         }    
        //     })
        // }
    }
};
</script>
