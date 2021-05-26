<template>
    <!-- <v-container> -->
    <v-dialog
      v-model="showUserDialog"
      width="1000"
      height="500"
      persistent
    >
        <v-skeleton-loader
            v-if="isLoading"
            type="list-item-avatar-three-line, image"
            class="mx-auto"
        ></v-skeleton-loader>
        <v-card height="900" v-else>
            <UserProfileDetail
                :user="user"
                :otherUser="otherUser"
                :my_spot="my_spot"
                :good_spot="good_spot"
                :spot="spot"
                @closeProfile="closeUserDialog"
            />
        </v-card>
    </v-dialog>
    <!-- </v-container> -->
</template>

<script>

// import userProfileDetail from "../UserProfile/UserProfileDetail.vue";
import UserProfileDetail from "@/components/UserProfile/UserProfileDetail.vue";
import {SpotExampleData} from "../share/SpotExampleData";
// import {getProfileInformation} from '../UserProfile/GetProfileInformation2.js';
import {getSpotByUserId,getSpotYouReviewed} from '../UserProfile/GetProfileInformation.js';


export default {

    components: {
        UserProfileDetail
    },
    props:{
        user: null,
        showUserDialog: Boolean,
    },
    // mounted: function(){
    //     console.log('UserProfileDialog.vue loaded')
    // },
    data: function() {
        return{
            otherUser: true, // other user profile view
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
    watch:  {
        showUserDialog: function() {    //ダイアログが開いた(閉じた)時に実行するメソッド
            if(!this.showUserDialog) return;
            // var SPOT_DATA = getProfileInformation( this.user.id )
            // this.my_spot = SPOT_DATA.my_spot
            // this.good_spot = SPOT_DATA.good_spot
            // this.isLoading = SPOT_DATA.isLoading
                // .then(result => {
                //     this.my_spot = result.my_spot
                //     this.good_spot = result.good_spot
                //     this.isLoading = result.isLoading
                // })

            this.show_count=0
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
        },
        show_count: function() {
            console.log('my_spot',this.my_spot)
            console.log('good_spot',this.good_spot)

            if(this.show_count!=2) return;
            if(this.show_count==2) this.isLoading=false
        },
    },
    methods: {
        closeUserDialog(){
            // this.showUserProfileDetail = false;
            this.$emit('closeUserDialog')
        }
    }
};
</script>