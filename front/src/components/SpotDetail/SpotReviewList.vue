<template>
    <v-card
        flat
    >
        <v-layout column style="height: 300px">      
            <v-flex style="overflow: auto">
                <spot-review 
                    @catchUserData="sendUserData"
                    v-for="review in reviews" :key="review.id"
                    :reviewer_data="review"
                />
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
import spotReview from './SpotReview.vue'

export default {
    components: {
        spotReview
    },

    props: {
        reviews: null,
    },
    methods: {
        sendUserData(user) {
            // SpotDetail.vue にuser dataを渡す関数（いまは使ってない）
            this.$emit('catchUserInformation',user)
        },
    }
}
</script>