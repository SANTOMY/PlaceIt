<template>
    <v-container>
        <v-card>
            <!-- 写真 -->
            <v-parallax
                height="300"
                :src="spot_data.photo"
            >
            </v-parallax>

            <v-row
                justify="center"
                class="mx-10
                mt-3 mb-5"
            >
                <!-- スポット名 -->
                <h1 class="mr-10"> {{ spot_data.name }} </h1>

                <!-- スポットタイプ -->
                <spot-type-icon v-for="type in spot_data.types" :key="type"
                    :type="type"
                    class="mr-5"
                    large
                    color="gray"
                />

            </v-row>

            <v-row justify="center">
                <!-- スポットの評価 -->
                <v-col>
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
                <v-col>
                    <v-row justify="center">
                        <spot-review-list :reviews="reviews" />
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
import spotReviewList from './SpotReviewList.vue'
import spotTypeIcon from './SpotTypeIcon.vue'

export default {
    components: {
        starRating,
        spotReviewList,
        spotTypeIcon
    },
    data: function() {
        return {
            spot_data: {
                name: "ラーメン屋",
                types: [
                    "restaurant",
                    "travel",
                    "shopping"
                ],
                photo: require("@/assets/Hakataramen.jpg"),
                rating: 3.5
            },
            reviews: [
                {
                    user_name: "asada",
                    comment: "ラーメンが美味しかったです。店員さんが優しくて替え玉一杯おごってくれました。また今度来ようと思います。",
                    score: 5
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "piyo",
                    comment: "",
                    score: 1
                }
            ]
        }
    }
    
}
</script>