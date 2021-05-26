<template>
    <!-- <v-container> -->
    <v-dialog
      v-model="showUserDialog"
      width="1000"
      height="500"
      persistent
    >
        <v-card height="900">
            <v-btn fixed top right dark fab rounded class="z-top mt-6 mr-8"
                v-show="showUserDialog" @click="closeUserDialog()"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-skeleton-loader
                v-if="isLoading"
                type="list-item-avatar-three-line, image"
                class="mx-auto"
            ></v-skeleton-loader>

            <!-- 原因不明のエラーのためコメントアウトしています -->
            <!-- <user-profile-detail
                v-else
                :user="user"
                :otherUser="otherUser"
                :my_spot="my_spot"
                :good_spot="good_spot"
                :spot="spot"
                @closeProfile="closeUserDialog"
            /> -->
        </v-card>
    </v-dialog>

    <!-- </v-container> -->
</template>

<script>

// import userProfileDetail from "@/components/UserProfile/UserProfileDetail.vue";
// import userProfileDetail from "../UserProfile/UserProfileDetail.vue";
import {SpotExampleData} from "../share/SpotExampleData";
import {getSpotByUserId,getSpotYouReviewed} from '../UserProfile/GetProfileInformation.js';


export default {

    components: {
        // userProfileDetail
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
            this.show_count=0
            getSpotByUserId( this.user.id )
                .then( result =>{
                    // this.getLatestSpots( 0, 28 )
                    this.show_count += 1
                    this.my_spot = result
                })

            getSpotYouReviewed( this.user.id )
                .then( result =>{
                    this.show_count += 1
                    this.good_spot = result
                })
        },
        show_count: function() {
            console.log('my_spot',this.my_spot)
            console.log('good_spot',this.good_spot)
            console.log('user',this.user)
            console.log('otherUser',this.otherUser)
            if(this.show_count!=2) return;
            if(this.show_count==2) this.isLoading=false
        },
    },
    methods: {
        closeUserDialog(){
            this.$emit('closeDialog')
        }
    }
};
</script>