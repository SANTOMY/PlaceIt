<template>
    <v-container>
<!-- ローディング画面 -->
    <v-skeleton-loader
        v-if="isLoading"
        type="list-item-avatar-three-line, image"
        class="mx-auto"
    ></v-skeleton-loader>
        <v-toolbar
            v-if="!isLoading"
            flat
            color="transparent"
        >
            <v-icon>mdi-account</v-icon>
            <v-toolbar-title>ユーザープロファイル</v-toolbar-title>
        </v-toolbar>
<!-----------------------修正処理(修正ボタンを押すと起動)------------------------------------------------>
        <v-dialog v-if="!isLoading" v-model="dialogEdit" width=500>
            <UserEdit 
                @close="closeUserEdit"
                v-bind:user="user"
                ref="child"
            >
            </UserEdit>
        </v-dialog>
<!-----------------------ユーザー写真------------------------------------------------->        
        <v-row v-if="!isLoading">
            <v-col>
                <v-layout justify-center>
                    <v-avatar size="200">
                        <img v-bind:src="user.src">
                    </v-avatar>
                </v-layout>
                <avatar-register v-if="!otherUser" @submit="editAvatarImage"/>
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
                ユーザー情報修正
                </v-btn>

                <user-delete v-if="!otherUser" @submit="deleteUser"/>
            </v-col>
        </v-row>
<!----------------------スポットリストカード------------------------------------------------->
        <spot-list-card v-if="!isLoading" :user="user"  color="green"/>
    </v-container>
</template>

<script>

import {getProfileImage} from "../../routes/imageRequest"
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
            editer: false, // User profile edit UI ON/OFF(true/false)
            dialogEdit: false // user information edit UI
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
            alert("ERROR:読み込めませんでした。");
            return
        }
        this.show_count = 0
        getProfileImage( this.user.id )
            .then(result => {
                if(!result.success) return;
                this.user.src = "data:image/jpeg;base64," + result.data.image;
            })
        this.isLoading=false;
    },
    methods: {    

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
    }
}
</script>