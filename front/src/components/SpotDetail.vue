<template>
    <v-container>
        <v-card>
            <!-- 写真 -->
            <v-parallax
                dark
                height="200"
                src="@/assets/Hakataramen.jpg"
            >
            </v-parallax>

            <v-row class="mx-10 mt-3 mb-5">
                <!-- スポット名 -->
                <h1 class="mr-10">ラーメン屋</h1>

                <!-- スポットタイプ -->
                <!-- TODO: v-forで書き直す -->
                <v-icon
                    class="mr-5"
                    large
                    color="gray"
                >
                    mdi-silverware-fork-knife
                </v-icon>
                <v-icon
                    large
                    color="gray"
                >
                    mdi-bag-suitcase
                </v-icon>
            </v-row>

            <v-row>
                <!-- スポットの評価 -->
                <v-col class="ml-6 mr-0">
                    <v-row justify="center">
                        <star-rating
                            v-model="rating"
                            read-only
                            :increment=0.5
                        >
                        </star-rating>
                    </v-row>
                </v-col>
                <!-- レビュー 一覧 -->
                <v-col class="ml-0 mr-6">
                    <v-row justify="center">
                        <v-card>
                            <v-layout column style="height: 300px">      
                                <v-flex style="overflow: auto">
                                    <!-- TODO: v-forで書き直す -->
                                    <spot-review />
                                    <spot-review />
                                    <spot-review />
                                    <spot-review />
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
            rating: 3.5
        }
    }
    
}
</script>