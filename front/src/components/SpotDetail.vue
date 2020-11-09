<template>
    <v-container fluid>
        <v-card>
            <!-- 写真 -->
            <v-parallax
                height="200"
                :src="spot_data.photo"
            >
            </v-parallax>

            <v-row class="mx-10 mt-3 mb-5">
                <!-- スポット名 -->
                <h1 class="mr-10"> {{ spot_data.name }} </h1>

                <!-- スポットタイプ -->
                <!-- TODO: v-forで書き直す -->

                <v-icon v-for="type in spot_data.types" :key="type"
                    class="mr-5"
                    large
                    color="gray"
                >
                    {{ type }}
                </v-icon>

            </v-row>

            <v-row>
                <!-- スポットの評価 -->
                <v-col class="ml-6 mr-0">
                    <v-row justify="center">
                        <star-rating
                            v-model="spot_data.rating"
                            read-only
                            :increment=0.5
                        >
                        </star-rating>
                    </v-row>
                </v-col>
                <!-- レビュー 一覧 -->
                <v-col class="ml-0 mr-6">
                    <v-row justify="center">
                        <v-card flat color="grey lighten-4">
                            <v-layout column style="height: 300px">      
                                <v-flex style="overflow: auto">
                                    <v-container fluid>
                                    <!-- TODO: v-forで書き直す -->
                                    <spot-review v-for="review in reviews" :key="review"
                                        :user_name="review.user_name"
                                        :comment="review.comment"
                                        :score="review.score"
                                    />
                                    </v-container>
                                </v-flex>
                            </v-layout>
                        </v-card>
                        <v-btn
                            class="mt-5 mb-2"
                            width="200px"
                            height="60px"
                        >
                            <h2>Add Review</h2>
                        </v-btn>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    </v-container>

</template>

<script>
import starRating from 'vue-star-rating'
import spotReview from './SpotReview.vue'

export default {
    components: {
        starRating,
        spotReview
    },
    data: function() {
        return {
            spot_data: {
                name: "ラーメン屋",
                types: [
                    "mdi-silverware-fork-knife",
                    "mdi-bag-suitcase"
                ],
                photo: require("@/assets/Hakataramen.jpg"),
                rating: 3.5
            },
            reviews: [
                {
                    user_name: "asada",
                    comment: "ラーメンが美味しかったです。店員さんが優しくて替え玉一杯おごってくれました。また今度来ようと思います。",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "HOGE",
                    score: 0
                },
                {
                    user_name: "piyo",
                    comment: "PIYO",
                    score: 5
                }
            ]
        }
    }
    
}
</script>