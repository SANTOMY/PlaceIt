<template>
    <v-dialog
      v-model="showDialog"
      width="1200"
      persistent
    >
        <v-card>
            <v-container>
                <!-- 写真 -->
                <v-carousel
                    cycle
                    hide-delimiter-background
                    show-arrows-on-hover
                >
                    <v-carousel-item
                        :src="photo"
                    />
                </v-carousel>
                <v-row
                    justify="center"
                    class="mx-10
                    mt-3 mb-5"
                >
                    <!-- スポット名 -->
                    <h1 class="mr-10"> {{ spotData.spot_name }} </h1>

                    <!-- スポットタイプ --> 
                    <!-- <spot-type-icon v-for="type in spotData.types" :key="type"
                        :type="type"
                        class="mr-5"
                        large
                        color="gray"        複数タイプに対応していないので一旦コメントアウト
                    /> -->
                    <spot-type-icon
                        :type="spotData.spot_type"
                        class="mr-5"
                        large
                        color="gray"
                    />


                </v-row>

                <v-row>
                    <!-- スポットの評価 -->
                    <v-col>
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
                    <v-col>
                        <v-row justify="center">
                            <v-col cols="11">
                                <spot-review-list :reviews="sliced_reviews" />
                            </v-col>
                        </v-row>

                        <v-row class="mt-1">
                            <v-icon
                                class="ml-8"
                                large
                                @click="change_page(-1)"
                            >
                                mdi-chevron-left
                            </v-icon>
                            <v-icon
                                class="ml-6"
                                large
                                @click="change_page(1)"
                            >
                                mdi-chevron-right
                            </v-icon>
                        </v-row>

                        <v-row justify="center">
                            <v-col cols="5">

                                <spot-review-register />
                            </v-col>
                        </v-row>

                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn block @click="closeDialog()">
                            <h3>Close</h3>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import starRating from 'vue-star-rating'
import spotReviewList from './SpotReviewList.vue'
import spotTypeIcon from '../share/SpotTypeIcon.vue'
import spotReviewRegister from './SpotReviewRegister.vue'

export default {
    components: {
        starRating,
        spotReviewList,
        spotTypeIcon,
        spotReviewRegister
    },
    data: function() {
        return {
            rating: 5,      //仮
            photo: require("@/assets/Hakataramen.jpg"),    //仮

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
                    user_name: "piyo1",
                    comment: "",
                    score: 1
                },
                {
                    user_name: "piyo2",
                    comment: "",
                    score: 1
                },
                {
                    user_name: "piyo3",
                    comment: "",
                    score: 1
                }
            ],
            review_num_per_page: 3, //1ページあたりの表示するレビュー数
            now_review_page: 0,

            pos: {
                lat: 0,
                lon: 0
            }
        }
    },

    props: {
        spotData: null,
        showDialog: Boolean
    },

    methods: {
        change_page: function(dir) {
            const next_page = this.now_review_page + dir
            const max_page = (this.reviews.length - 1) / this.review_num_per_page
            if(next_page < 0 || next_page > max_page) return
            else this.now_review_page = next_page
        },
        closeDialog: function() {
            this.$emit("close");
        }
    },

    computed: {
        //現在のページに表示するレビューを返す
        sliced_reviews: function() {
            const start = this.now_review_page * this.review_num_per_page;
            const end = start + this.review_num_per_page;
            return this.reviews.slice(start, end)
        }
    }

}
</script>