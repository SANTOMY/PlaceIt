<template>
    <v-app-bar app>
        <!-- アプリタイトル -->
        <v-toolbar-title
            class="px-5"
        >
            <h2>Place it</h2>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <!-- マップボタン -->
        <v-btn 
            to="/map"
            class="px-10 mx-2"
            text
        >
            <v-icon
                left
                large
                color="gray"
                class="px-5"
            >
                mdi-map-marker
            </v-icon>
            Map
        </v-btn>
        <!-- ユーザーボタン -->
        <v-menu 
          offset-y 
          :close-on-click="clockseOnClick"
          v-if="isLoggedIn"
          
        >
            <template v-slot:activator="{ on }">
                <v-btn class="px-10 mx-2" text v-if="isLoggedIn" v-on="on">
                    <v-icon left large color="gray" class="px-5"> mdi-account-circle</v-icon>
                    User
                </v-btn>
            </template>
            <v-list>
                <v-list-item>
                    <v-btn @click="toUserPage" class="px-8 mb-2">
                        <v-icon left large color="gray" class="px-5"> mdi-account-circle</v-icon>
                        Profile
                    </v-btn>
                </v-list-item>
                <v-list-item>
                    <v-btn @click="logout" class="px-8">
                        <v-icon left large color="gray" class="px-5"> mdi-logout</v-icon>
                        Logout
                    </v-btn>
                </v-list-item>
            </v-list>
        </v-menu>
        <!-- サインアップボタン -->
        <v-btn
            to="/signup"
            class="px-10 mx-2"
            text
            v-if="!isLoggedIn"
        >
            <v-icon
                left
                large
                color="gray"
                class="px-5"
            >
                mdi-account-plus
            </v-icon>
            Sign Up
        </v-btn>
        <!-- ログインボタン -->
        <v-btn
            to="/login"
            class="px-10 mx-2"
            text
            v-if="!isLoggedIn"
        >
            <v-icon
                left
                large
                color="gray"
                class="px-5"
            >
                mdi-login
            </v-icon>
            Login
        </v-btn>

    </v-app-bar>
</template>

<script>
export default {
    
    data (){
        return { 
            items: [
                {option: 'Profile', src: '/user'},
                {option: 'Logout', src: '/map'}
            ],
            clockseOnClick:true
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.userData != null
        }
    },
    methods: {
        menuOptions(menuOption){
            if (menuOption.option == 'Logout'){
                this.$store.commit("logout")
            }
            this.$router.push({path: menuOption.src})
        },
        logout() {
            this.$store.commit("logout")
            if (this.$route.path != '/map'){
                this.$router.push('/map')
            }
        },
        toUserPage() {
            this.$store.commit("myPageDisp")
            if(location.pathname=='/user'){ // ユーザーページにいる場合
                this.$router.go({path: this.$router.currentRoute.path, force: true})       
            }else{ // ユーザーページ以外にいる場合
                this.$router.push({ path: 'user'})
            }
        }
    }
}
</script>



