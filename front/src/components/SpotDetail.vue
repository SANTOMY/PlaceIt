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

            <v-app-bar>
                <!-- スポット名 -->
                <v-toolbar-title>
                    ラーメン屋
                </v-toolbar-title>
                <v-spacer />

                <!-- スポットタイプ -->
                <!-- TODO: v-forで書き直す -->
                <v-icon
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
            </v-app-bar>

            <v-row>
                <!-- スポットの評価 -->
                <v-col class="ml-4 mr-0">
                    <v-card class="px-5">
                        <star-rating
                            v-model="rating"
                            read-only
                            :increment=0.5
                        >
                        </star-rating>
                    </v-card>
                </v-col>
                <!-- レビュー 一覧 -->
                <v-col class="ml-0 mr-4">
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