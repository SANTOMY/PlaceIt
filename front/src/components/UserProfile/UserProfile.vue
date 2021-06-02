<template>
<!-- ローディング画面 -->
    <v-skeleton-loader
        v-if="isLoading"
        type="list-item-avatar-three-line, image"
        class="mx-auto"
    ></v-skeleton-loader>
    <user-profile-detail 
        v-else
        :user="user"
        :otherUser="otherUser"
        :my_spot="my_spot"
        :good_spot="good_spot"
        :spot="spot"
    />
</template>

<script>

import userProfileDetail from "./UserProfileDetail.vue";
import {getProfileImage} from "../../routes/imageRequest"
import {SpotExampleData} from "../share/SpotExampleData";
import {getSpotByUserId,getSpotYouReviewed} from '../share/GetProfileInformation.js';

export default {

    components: {
        userProfileDetail
    },
    data() {
        return {
            otherUser: this.$store.state.otherUser, // other user profile judge
            user: { 
                // ユーザー仮データ
            },
            isLoading: true,
            spot: SpotExampleData(),
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
            show_count: 0
        }
    },
    mounted() {
        // console.log('query:',this.otherUser)
        if(this.otherUser==true){
            this.user= { 
                id: this.$store.state.otherUserData.userId,
                username: this.$store.state.otherUserData.userName,
                email: null,
                password: null,
                university: this.$store.state.otherUserData.university,
                src: require('@/assets/default-icon.jpeg')
            }
            // this.otherUser = true
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
            alert("URLが間違っており、読み込めませんでした。");
            return
        }
        
        this.show_count = 0
        getProfileImage( this.user.id )
            .then(result => {
                // console.log('test, UserProfile getProfileImage success')
                if(!result.success) return;
                this.user.src = "data:image/jpeg;base64," + result.data.image;
            }) 

        getSpotByUserId( this.user.id )
            .then( result =>{
                this.show_count += 1
                this.my_spot = result
        })

        getSpotYouReviewed( this.user.id )
            .then( result =>{
                this.show_count += 1
                this.good_spot = result
            })
    },
    watch:  {
        show_count: function() {
            if(this.show_count!=2) return;
            if(this.show_count==2) {
                this.isLoading=false
                // console.log('=========finish loading===========')
                // console.log('my_spot',this.my_spot)
                // console.log('good_spot',this.good_spot)
                // console.log('user',this.user)
                // console.log('otherUser',this.otherUser)
            }
        },
    },
}
</script>
