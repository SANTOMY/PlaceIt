<template>
    <v-card
        flat
    >
        <v-layout column style="height: 300px">      
            <v-flex style="overflow: auto">
                <spot-review v-for="review in reviews" :key="review.id"
                    :reviewer_data="review"

                    :nowPage="now_page"
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
        now_page: null,
    }
}
</script>