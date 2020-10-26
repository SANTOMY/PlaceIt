<template>
    <v-app-bar app>
        <v-toolbar-title
            class="px-5"
        >
            Appication
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

        <v-btn
            to="/user"
            class="px-10 mx-2"
            text
        >
            <v-icon
                left
                large
                color="gray"
                class="px-5"
            >
                mdi-account-circle
            </v-icon>
            User
        </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    
    methods: {

    }

}
</script>



