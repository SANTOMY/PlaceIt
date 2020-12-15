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
            color="green"
        ></SpotListCard>
    </v-container>
</template>

<script>

import SpotListCard from "./SpotListCard.vue";
import UserEdit from "./UserEdit.vue";
import {getUser} from '../../routes/userRequest'

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
                username: this.$store.state.userData.email,
                email: this.$store.state.userData.email,
                password: 'takatakeisuke',
                src: require('@/assets/pose_kuyashii_man.png')
            },
            spot: [ // spot仮データ
                {
                    name: 'マクドナルド',
                    spotId: '000000',
                    type: 'restaurant',
                    user_id: '000000',
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
                // this.user.password = result[0].password
        })  
    },
    methods:  {
        editProfile: function() {
            this.dialogEdit = true
        },
        closeUserEdit: function(){          
            this.dialogEdit = false
        },
    }
};
</script>
