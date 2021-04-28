<template>
    <v-card
        flat
    >
        <v-layout column style="height: 300px">      
            <v-flex style="overflow: auto">
                <spot-review v-for="review in reviews" :key="review.id"
                    :user_name="review.user.username"
                    :comment="review.content.comment"
                    :score="review.content.score"
                    :user_id="review.user.id"
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
        reviews: null
    }
}
</script>