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
                <!--
                <v-avatar
                    class="mr-5"
                >
                    <img src="user_avater">
                </v-avatar>
                -->
                <v-icon 
                    class="mr-5"
                    large
                >
                    mdi-account-circle
                </v-icon>
                <v-btn @click="usernameClickEvent()"> {{ user_name }} </v-btn>
            </v-row>
            <v-row class="mx-5 mt-2">
                {{ comment }}
            </v-row>
            <v-row class="mx-3 mt-1">
                <v-spacer />
                <v-icon class="mr-1">
                    mdi-star-outline
                </v-icon>
                {{ score }}
            </v-row>
        </v-container>
        <user-profile-dialog :showDialog="showUserDialog" :user="user_data" @close="closeDialog()"/>
    </v-card>
    
</template>

<script>
import UserProfileDialog from '../share/UserProfileDialog.vue'

export default {
    components: {
        UserProfileDialog
    },
    props: {
        user_name: String,
        comment: String,
        score: Number, // 警告文解消
        user_id: String,
    },
    data: function() {
        return {
            user_data: { // ユーザー仮データ
                user_id: this.user_id,
                username: this.user_name,
                src: require('@/assets/pose_kuyashii_man.png')
            },
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
    }
}
</script>