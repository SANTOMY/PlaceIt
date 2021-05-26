<template>
<!-- ローディング画面 -->
    <v-skeleton-loader
        v-if="isLoading"
        type="list-item-avatar-three-line, image"
        class="mx-auto"
    ></v-skeleton-loader>
    <div v-else>
        <user-profile-detail 
            :user="user"
            :otherUser="otherUser"
            :my_spot="my_spot"
            :good_spot="good_spot"
            :spot="spot"
        />
    </div>
</template>

<script>

import userProfileDetail from "@/components/UserProfile/UserProfileDetail.vue";
import {getProfileImage} from "../../routes/imageRequest"
import {SpotExampleData} from "../share/SpotExampleData";
// import {getProfileInformation} from './GetProfileInformation.js';
import {getSpotByUserId,getSpotYouReviewed} from './GetProfileInformation.js';

export default {

    components: {
        userProfileDetail
    },
    data() {
        return {
            otherUser: false, // other user profile judge
            user: { // ユーザー仮データ
                id: this.$store.state.userData.userId,
                username: this.$store.state.userData.userName,
                email: this.$store.state.userData.email,
                password: this.$store.state.userData.password,
                university: this.$store.state.userData.university,
                src: require('@/assets/default-icon.jpeg')
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
        // console.log('a:',this.user.id)
        // getUserImage( this.user.id ) 
        // this.isLoading = true; 
        // this.my_spot = []; // 作成スポット
        // this.good_spot = []; // レビューしたスポット
        // this.spot_to_show = []; // TODO: 表示するスポットの制限
        this.show_count = 0
        // console.log('user id:', user_id)
        getProfileImage( this.user.id )
            .then(result => {
                console.log('test, UserProfile getProfileImage success')
                if(!result.success) return;
                this.user.src = "data:image/jpeg;base64," + result.data.image;
                
                // this.showUserProfileDetail = true
                // console.log('b:',this.showUserProfileDetail)
            }) 

        getSpotByUserId( this.user.id )
            .then( result =>{
                // this.getLatestSpots( 0, 28 )
                this.show_count += 1
                // console.log('my_spot result',result)
                this.my_spot = result
        })

        getSpotYouReviewed( this.user.id )
            .then( result =>{
                this.show_count += 1
                // console.log('good_spot result',result)
                this.good_spot = result
                // console.log('good_spot length',this.good_spot.length)
            })
        
        // let spot_data = getProfileInformation( this.user.id )
        //     .then( () =>{
        //         console.log(spot_data)
        //         this.good_spot = spot_data.good_spot
        //         this.my_spot = spot_data.my_spot
        //         this.isLoading = spot_data.isLoading
        //     })

        // getProfileInformation( this.user.id )
        //     .then( result =>{
        //         console.log(result)
        //         this.good_spot = result.good_spot
        //         this.my_spot = result.my_spot
        //         this.isLoading = result.isLoading
        //     })

        // let spot_data = getProfileInformation( this.user.id )
        // console.log('spot_data',spot_data)
        // this.good_spot = spot_data.good_spot
        // this.my_spot = spot_data.my_spot
        // this.isLoading = spot_data.isLoading

    },
    watch:  {
        show_count: function() {
            console.log('my_spot',this.my_spot)
            console.log('good_spot',this.good_spot)

            if(this.show_count!=2) return;
            if(this.show_count==2) this.isLoading=false
        },
    },
    methods:  {
        // closeUserProfile(){
        //     // this.showUserProfileDetail = false;
        //     this.$router.push({ path: 'Map'})
        // }
    //     getUserImage: function(){
    //         getProfileImage( this.user.id )
    //             .then(result => {
    //                 console.log('test, UserProfile getProfileImage success')
    //                 if(!result.success) return;
    //                 this.user.src = "data:image/jpeg;base64," + result.data.image;
    //                 this.showUserProfileDetail = true
    //                 console.log('b:',this.showUserProfileDetail)
    //             })  
    //     }
    },
}
</script>
