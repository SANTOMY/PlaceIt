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
                <avatar-register @submit="editAvatarImage"/>
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
import {uploadProfileImage} from "../../routes/imageRequest"
import AvatarRegister from "./AvatarRegister.vue"

export default {

    components: {
        SpotListCard,
        UserEdit,
        AvatarRegister
    },
    data() {
        return {
            editer: false,
            dialogEdit: false,
            user: { // ユーザー仮データ
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
        editAvatarImage: function(image) {
            this.user.src = image;
            const imageFile = this.createImageFile(image, "hoge.jpeg"); //あとで別の名前に変化されるから適当な名前で
            uploadProfileImage(imageFile, 12345)
                .then(result => {
                    console.log(result)
                })
        },

        createImageFile: function(base64image, name) {
            var bin = atob(base64image.replace(/^.*,/, ''));
            var buffer = new Uint8Array(bin.length);
            for (var i = 0; i < bin.length; i++) {
                buffer[i] = bin.charCodeAt(i);
            }
        return new File([buffer.buffer], name, {type: "image/jpeg"});
        },
    }
};
</script>
