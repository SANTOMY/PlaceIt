<template>
    <v-container>
        <v-card>
            <!-- 写真 -->
            <v-img
                height="200px"
                src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
            >
            </v-img>

            <v-app-bar>
                <!-- スポット名 -->
                <v-toolbar-title>
                    NAME
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
                <v-col>
                    <v-card>
                        <star-rating
                            v-model="rating"
                            read-only
                            :show-rating=false
                            :increment=0.5
                        >
                        </star-rating>
                    </v-card>
                </v-col>
                <!-- レビュー -->
                <v-col>
                    <v-card>
                        <v-card>
                            
                        </v-card>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-container>

</template>

<script>
import starRating from 'vue-star-rating'

export default {
    components: {
        starRating
    },
    data: function() {
        return {
            rating: 3.5
        }
    }
    
}
</script>