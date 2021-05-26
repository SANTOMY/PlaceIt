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
                <!-- ユーザーのアバター写真 -->
                <v-avatar
                    class="mr-5"
                >
                    <img :src="reviewer_data.user.src">
                </v-avatar>
               <!-- ユーザー名（ボタン） -->
                <v-btn 
                    @click="usernameClickEvent()"
                    text
                    style="text-transform: none"
                > 
                    {{ reviewer_data.user.username }} 
                </v-btn>
            </v-row>
            <!-- コメント -->
            <v-row class="mx-5 mt-2">
                {{ reviewer_data.content.comment }}
            </v-row>
            <!-- 評価 -->
            <v-row class="mx-3 mt-1">
                <v-spacer />
                <v-icon class="mr-1">
                    mdi-star-outline
                </v-icon>
                {{ reviewer_data.content.score }}
            </v-row>
        </v-container>
        <user-profile-dialog
            :user="reviewer_data.user"
            :otherUser="otherUser"
            :showUserDialog="userDialog"
            @closeDialog="closeUserProfile()"/>
    </v-card>

</template>

<script>

import UserProfileDialog from '../share/UserProfileDialog.vue'

export default {
    components: {
        UserProfileDialog
    },
    props: {
        reviewer_data: null,
    },
    data: function() {
        return {
            userDialog: false,
            otherUser: true,
            // user: null,
        }
    },
    methods:{
        usernameClickEvent() {
            // SpotDetail.vue にuser dataを渡す関数（いまは使ってない）
            this.$emit('catchUserData',this.reviewer_data.user)
            this.userDialog = true
        },
        closeUserProfile() {
            this.userDialog = false;
        },
    },
}
</script>