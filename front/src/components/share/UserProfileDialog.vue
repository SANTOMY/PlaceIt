<template>
    <!-- <v-container> -->
    <v-dialog
      v-model="showUserDialog"
      width="1000"
      height="500"
      persistent
    >
        <v-card height="900">
            <user-profile-detail
                :user="user"
                :otherUser="otherUser"
                :showUserProfileDetail="showUserProfileDetail"
                @closeProfile="closeUserDialog"
            />
        </v-card>
    </v-dialog>
    <!-- </v-container> -->
</template>

<script>

// import userProfileDetail from "../UserProfile/UserProfileDetail.vue";
import userProfileDetail from "@/components/UserProfile/UserProfileDetail.vue";

export default {

    components: {
        userProfileDetail
    },
    props:{
        user: null,
        showUserDialog: Boolean,
    },
    computed:{
        showUserProfileDetail: function(){
            return this.showUserDialog
        }
    },
    mounted: function(){
        console.log('UserProfileDialog.vue loaded')
    },
    data: function() {
        return{
            otherUser: true, // other user profile view
            showUserProfileDetail: false 
        }
    },
    // watch:  {
    //     showUserDialog: function() {    //ダイアログが開いた(閉じた)時に実行するメソッド
    //         if(!this.showUserDialog) return;
    //         console.log('UserProfileDialog.vue showUSerDialog:',this.showUserProfileDetai)
    //         this.showUserProfileDetail = true;
    //     }
    // },
    methods: {
        closeUserDialog(){
            this.showUserProfileDetail = false;
            this.$emit('closeUserDialog')
        }
    }
};
</script>