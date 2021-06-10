<template>
    <v-container>
        <v-toolbar
            flat
            color="transparent"
        >
            <v-icon>mdi-account</v-icon>
            <v-toolbar-title>ユーザープロファイル</v-toolbar-title>
        </v-toolbar>
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
                <avatar-register v-if="!otherUser" @submit="editAvatarImage"/>
                <user-delete v-if="!otherUser" @submit="deleteUser"/>
            </v-col>
<!-----------------------ユーザー名とプロフィール修正ボタン------------------------->
            <v-col>
                ユーザー名
                <h1>{{ user.username }}</h1>
                
                <v-spacer></v-spacer>
                大学名
                <h1>{{ user.university }}</h1>
                <v-spacer></v-spacer>
                <v-btn
                    v-model="editer"
                    @click="editProfile"
                    v-if="!otherUser"
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
import {uploadProfileImage} from "../../routes/imageRequest"
import AvatarRegister from "./AvatarRegister.vue"
import {ConvertToFileFromBase64} from '../share/ConvertImageFunctions';
import UserDelete from "./UserDelete.vue";

export default {

    components: {
        SpotListCard,
        UserEdit,
        AvatarRegister,
        UserDelete,
    },
    props: {
        otherUser: Boolean,
        user: null,
        my_spot: null,
        good_spot: null,
        spot: null,
    },
    data() {
        return {
            editer: false, // User profile edit UI ON/OFF(true/false)
            dialogEdit: false, // user information edit UI
        }
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
            const imageFile = ConvertToFileFromBase64(image, "hoge.jpeg"); //DB保存時に別の名前に変えられるから適当な名前にしてる
            uploadProfileImage(imageFile, this.$store.state.userData.userId)
        },

        deleteUser: function(){
        },

        createImageFile: function(base64image, name) {
            var bin = atob(base64image.replace(/^.*,/, ''));
            var buffer = new Uint8Array(bin.length);
            for (var i = 0; i < bin.length; i++) {
                buffer[i] = bin.charCodeAt(i);
            }
            return new File([buffer.buffer], name, {type: "image/jpeg"});
        },

    },

};
</script>