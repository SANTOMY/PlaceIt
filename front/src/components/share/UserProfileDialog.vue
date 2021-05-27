<template>
    <!-- <v-container> -->
    <v-dialog
      v-model="showUserDialog"
      width="500"
      persistent
    >
        <v-card height="500">
            <v-toolbar
            flat
            color="transparent"
            >
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    @click="closeUserDialog()"
                >
                    <v-icon>mdi-close-circle-outline</v-icon>
                </v-btn>
            </v-toolbar>
            <!-- 原因不明のエラーのためコメントアウトしています -->
            <v-container>
                <v-col>
                    <v-layout justify-center>
                        <v-avatar size="200">
                            <img v-bind:src="user.src">
                        </v-avatar>
                    </v-layout>
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
                        @click="goOtherUserPage"
                    ><!-------editerのtrue/false変更され、editProfile()が起動するボタン----->
                    詳細を見る
                    </v-btn> 
                </v-col>
            </v-container>
        </v-card>
    </v-dialog>

    <!-- </v-container> -->
</template>

<script>

const User = require("../../store/user");

export default {
    
    props:{
        user: null,
        showUserDialog: Boolean,
    },

    methods: {
        closeUserDialog(){
            this.$emit('closeDialog')
        },
        goOtherUserPage(){
            const otherUserData = new User(this.user.id, this.user.username, null, null, this.user.university)
            // console.log('otherUserData:',otherUserData)
            // console.log('Location.serch:',location.search)
            // console.log('Location.pathname:',location.pathname)
            this.$store.commit("inputUserData", otherUserData)
            if(location.pathname=='/user'){
                this.$router.go({path: this.$router.currentRoute.path, query: { otherUser: true }, force: true})
            }else{
                this.$router.push({ path: 'user', query: { otherUser: true } })
            }
        }
    }
};
</script>