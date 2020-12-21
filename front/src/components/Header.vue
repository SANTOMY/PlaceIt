<template>
    <v-app-bar app>
        <v-toolbar-title
            class="px-5"
        >
            <h2>Place it</h2>
        </v-toolbar-title>

        <v-spacer></v-spacer>

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
        
        <v-menu 
          offset-y :close-on-click="clockseOnClick"
          close-on-content-click=false
          v-if="isLoggedIn"
          
        >
            <template v-slot:activator="{ on }">
                <v-btn class="px-10 mx-2" v-if="isLoggedIn" v-on="on">
                    <v-icon left large color="gray" class="px-5"> mdi-account-circle</v-icon>
                    User
                </v-btn>
            </template>
            <v-list>
                <v-list-item>
                    <v-btn to="/user" class="px-8 mb-2">
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
        return {items: [
                {option: 'Profile', src: '/user'},
                {option: 'Logout', src: '/map'}
            ]
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
        }
    }
}
</script>



