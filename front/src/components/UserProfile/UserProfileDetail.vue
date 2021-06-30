<template>
    <v-container>
<!-----------------------ユーザー写真------------------------------------------------->        
        <v-row>
            <v-col>
                <v-layout justify-center>
                    <v-avatar size="200">
                        <img v-bind:src="user.src">
                    </v-avatar>
                </v-layout>
                <avatar-register v-if="!otherUser" @submit="editAvatarImage"/>
            </v-col>
<!-----------------------ユーザー名・所属大学と修正・削除ボタン------------------------->
            <v-col>
                <v-container>
                    <v-row justify="center">
                        <v-col>
                            <p class="font-italic">User Name</p>
                            <h1>{{ user.username }}</h1>
                            <v-spacer></v-spacer>
                            <p class="font-italic">University</p>
                            <h1>{{ user.university }}</h1>
                            <v-spacer></v-spacer>
                            <user-edit v-if="!otherUser" :user="user"/>
                            <user-delete v-if="!otherUser" />
                        </v-col>
                    </v-row>
                </v-container>
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

    methods:  {
        editAvatarImage: function(image) {
            this.user.src = image;
            const imageFile = ConvertToFileFromBase64(image, "hoge.jpeg"); //DB保存時に別の名前に変えられるから適当な名前にしてる
            uploadProfileImage(imageFile, this.$store.state.userData.userId)
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