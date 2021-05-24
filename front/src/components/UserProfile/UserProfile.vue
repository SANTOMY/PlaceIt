<template>
    <user-profile-detail
        :user="user"
        :otherUser="otherUser"
        :showUserProfileDetail="showUserProfileDetail"
    />
</template>

<script>

// import userProfileDetail from "./UserProfile/UserProfileDetail.vue";
import userProfileDetail from "@/components/UserProfile/UserProfileDetail.vue";
import {getProfileImage} from "../../routes/imageRequest"

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
            showUserProfileDetail: false
        }
    },
    mounted() {
        this.showUserProfileDetail = false
        console.log('a:',this.showUserProfileDetail)
        getProfileImage( this.user.id )
            .then(result => {
                console.log('test, UserProfile getProfileImage success')
                if(!result.success){ 
                    this.showUserProfileDetail = true
                }else{
                    // console.log(result.data.image);
                    this.user.src = "data:image/jpeg;base64," + result.data.image;
                    this.showUserProfileDetail = true
                    console.log('b:',this.showUserProfileDetail)
                }
            })        
    }
}
</script>
