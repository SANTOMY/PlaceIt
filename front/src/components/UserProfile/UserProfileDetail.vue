<template>
    <v-container>
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
                v-if="otherUser"
            >
                <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
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
                <avatar-register @submit="editAvatarImage"/>
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

export default {

    components: {
        SpotListCard,
        UserEdit,
        AvatarRegister
    },
    prop: {
        otherUser: Boolean,
        // showUserProfileDetail: Boolean,
        user: null,
        my_spot: null,
        good_spot: null,
        spot: null,
    },
    data() {
        return {
            editer: false, // User profile edit UI ON/OFF(true/false)
            dialogEdit: false, // user information edit UI
            // otherUser: false, // other user profile judge
            // spot: SpotExampleData(),
            // my_spot: [
            //     // 自分の作成したスポット
            //     // required attribute: name, src, good
            // ],
            // spot_to_show: [
            //     // my_spotのうち表示するスポット
            //     // いまはまだ必要ないけど，スポット投稿数が多くなると必要かも
            // ],
            // good_spot: [
            //     // 自分が評価したスポット
            // ],
            // isLoading: true, // profile loading
            // show_count: 0,
        }
    },

    // mounted: function(){
    //     console.log(this.otherUser)
    //     if (this.otherUser==false){
    //         console.log('showUserProfileDetail changed')
    //         this.getProfileInformation( this.$store.state.userData.userId )
    //     }
    // },

    methods:  {
        // getProfileInformation: function( user_id ) {
        //     this.isLoading = true; 
        //     this.my_spot = []; // 作成スポット
        //     this.good_spot = []; // レビューしたスポット
        //     this.spot_to_show = []; // TODO: 表示するスポットの制限
        //     this.show_count = 0
        //     console.log('user id:', user_id)
        //     this.getSpotByUserId( user_id )
        //         .then( () =>{
        //             this.getLatestSpots( 0, 28 )
        //             this.show_count += 1
        //             console.log('my_spot length',this.my_spot.length)
        //     })

        //     this.getSpotYouReviewed( user_id )
        //         .then( () =>{
        //             this.show_count += 1
        //             console.log('good_spot length',this.good_spot.length)
        //         })

        //     // getProfileImage( user_id )
        //     //     .then(result => {
        //     //         if(!result.success) return;
        //     //         // console.log(result.data.image);
        //     //         this.user.src = "data:image/jpeg;base64," + result.data.image;
        //     //     })
        // },
        editProfile: function() {
            this.dialogEdit = true
        },
        closeUserEdit: function(){          
            this.dialogEdit = false
        },
        editAvatarImage: function(image) {
            this.user.src = image;
            const imageFile = this.createImageFile(image, "hoge.jpeg"); //DB保存時に別の名前に変えられるから適当な名前にしてる
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
        // getSpotByUserId: async function(user_id){
        //     return getSpot('', '', '', user_id, '').then(result => {
        //         for( var spt of result.spots ){
        //             var spt_id = spt.spot_id;
        //             var name = spt.spot_name;
        //             // TODO: to get images from DB
        //             var src = require( "@/assets/Mac.jpg" );
        //             if( Math.random() >= 0.5 ){
        //                 src = require('@/assets/mos.png');
        //             }
        //             // レビューの計算
        //             var scores = [];
        //             for( var rev of result.review ){
        //                 if( spt.spot_id == rev.spot_id ){
        //                     scores.push( rev.score );
        //                 }
        //             }
        //             var good = Math.round( 10 * average( scores ) ) / 10;
        //             this.my_spot.push( { "spotId": spt_id, "name": name, "src": src, "good": good } );
        //         }
        //         return true   
        //     }).catch((exception) => {
        //         console.log( "Error in getSpotByUserId: ", exception );
        //     })
        // },
        // getSpotYouReviewed: async function( user_id ){
        //     return getReviewByUserId( user_id ).then( result => {
        //         var reviewd_spot_ids = new Set()
        //         for( let rev of result.review ){
        //             reviewd_spot_ids.add( rev.spot_id );
        //         }
        //         for( let reviewd_spot_id of reviewd_spot_ids ){
        //             getSpot( reviewd_spot_id, '', '', '', '' ).then( result => {
        //                 var spt = result.spots[ 0 ];
        //                 var spt_id = spt.spot_id;
        //                 var name = spt.spot_name;
        //                 // TODO: to get images from DB
        //                 var src = require( "@/assets/Mac.jpg" );
        //                 if( Math.random() >= 0.5 ){
        //                     src = require('@/assets/mos.png');
        //                 }
        //                 // レビューの計算
        //                 var scores = [];
        //                 for( var rev of result.review ){
        //                     if( spt.spot_id == rev.spot_id ){
        //                         scores.push( rev.score );
        //                     }
        //                 }
        //                 var good = Math.round( 10 * average( scores ) ) / 10;
        //                 this.good_spot.push( { "spotId": spt_id, "name": name, "src": src, "good": good } );
        //             } ).catch((exception) => {
        //                 console.log( "Error in getReviewByUserId: ", exception );
        //             })
        //         }
        //         return true
        //     } ).catch((exception) => {
        //         console.log( "Error in getSpotYouReviewed: ", exception );
        //     })
        // },

        // 今後実装予定 //
        // getLatestSpots: function( left = 0, right ){ //スポットが多すぎるときの処理。
        //     // TODO: 他のスポットにも対応
        //     console.log( "latestSpots", ( this.my_spot ).slice( left, right ) )
        //     this.spot_to_show = ( this.my_spot ).slice( left, right )
        // },

        closeDialog: function() {
            this.$emit('closeProfile')
        }
    },
    // watch:  {
    //     show_count: function() {
    //         if(this.show_count!=2) return;
    //         if(this.show_count==2) this.isLoading=false
    //     },

    //     showUserProfileDetail: function() {    //ダイアログが開いた(閉じた)時に実行するメソッド
    //         console.log('showUserProfileDetail changed')
    //         if(!this.showUserProfileDetail) return;

    //         this.getProfileInformation( this.user.id )
    //     },
    // }
};
</script>
