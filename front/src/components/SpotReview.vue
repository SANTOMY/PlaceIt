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
                <h2> {{ user_name }} </h2>
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
    </v-card>
</template>

<script>
export default {
    props: {
        user_name: String,
        comment: String,
        score: Number
    }
}
</script>