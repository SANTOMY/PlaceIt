<template>
    <v-card
        class="mb-2 mr-2"
        color="grey lighten-4"
        flat
    >
        <v-container>
            <v-row 
                class="mx-1"
                align="center"
            >
                <!-- いつかavaterに変えたい -->
                
                <v-avatar
                    class="mr-5"
                >
                    <img :src="reviewer_data.user.src">
                </v-avatar>
               
                <!-- <v-icon 
                    class="mr-5"
                    large
                >
                    mdi-account-circle
                </v-icon> -->
                <v-btn @click="usernameClickEvent()"> {{ reviewer_data.user.username }} </v-btn>
            </v-row>
            <v-row class="mx-5 mt-2">
                {{ reviewer_data.content.comment }}
            </v-row>
            <v-row class="mx-3 mt-1">
                <v-spacer />
                <v-icon class="mr-1">
                    mdi-star-outline
                </v-icon>
                {{ reviewer_data.content.score }}
            </v-row>
        </v-container>
        <user-profile-dialog :showDialog="showUserDialog" :user="reviewer_data.user" @close="closeDialog()"/>
    </v-card>
    
</template>

<script>
import UserProfileDialog from '../share/UserProfileDialog.vue'
// import {getProfileImage} from "../../routes/imageRequest"

export default {
    components: {
        UserProfileDialog
    },
                    //     :user_name="review.user.username"
                    // :comment="review.content.comment"
                    // :score="review.content.score"
                    // :user_id="review.user.id"
                    // :user_src="review.user.src"
    props: {
        reviewer_data: null,
        // user_name: String,
        // comment: String,
        // score: Number, // 警告文解消
        // user_id: String,
        nowPage: Number,
        // user_src: String,
    },
    data: function() {
        return {
            // user_data: null,// ユーザー仮データ
            showUserDialog: false,
        }
    },
    methods:{
        closeDialog() {
            this.showUserDialog = false;
        },
        usernameClickEvent() {
            this.showUserDialog = true;
        },
    },
    // watch: {
    //     showUserDialog: function(){
    //         user_data = {
    //             user_id: this.user_id,
    //             username: this.user_name,
    //             src: require('@/assets/default-icon.jpeg')                
    //         }
    //     }
    // },
    // watch: {
    //     nowPage: function(){
    //         this.user_data = {"username": this.user_name,"user_id": this.user_id, "src":require('@/assets/default-icon.jpeg') };
    //         getProfileImage( this.user_id )
    //             .then(result => {
    //                 if(!result.success) return;
    //                 // console.log(result.data.image);
    //                 this.user_data.src = "data:image/jpeg;base64," + result.data.image;
                    
    //             })
    //     }
    // },
}
</script>