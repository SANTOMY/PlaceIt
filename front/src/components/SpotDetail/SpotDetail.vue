<template>
    <v-container>
        <v-card>
            <!-- 写真 -->
            <v-carousel
                cycle
                hide-delimiter-background
                show-arrows-on-hover
            >
                <v-carousel-item
                    v-for="photo in spot_data.photos"
                    :key="photo"
                    :src="photo"
                />
            </v-carousel>
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

            <v-row>
                <!-- スポットの評価 -->
                <v-col>
                    <v-row justify="center">
                        <radarChartDisp
                            :type="this.spot_data.types[0]"
                            :reviewRating="spot_data.rating5"
                        />
                    </v-row>
                </v-col>

                <!-- レビュー 一覧 -->
                <v-col>
                    <v-row justify="center">
                        平均
                        <star-rating
                            v-model="spot_data.rating"
                            read-only
                            :increment=0.1
                        >
                        </star-rating>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="11">
                            <spot-review-list :reviews="sliced_reviews" />
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="8">
                            <v-container class="max-width">
                                <v-pagination                                
                                    @input="getNumber"
                                    v-model="now_review_page"
                                    :length="num_page"
                                    :total-visible="7"
                                ></v-pagination>
                            </v-container>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="5">

                            <spot-review-register />
                        </v-col>
                    </v-row>

                </v-col>
            </v-row>
        </v-card>
    </v-container>

</template>

<script>
import starRating from 'vue-star-rating'
import spotReviewList from './SpotReviewList.vue'
import spotTypeIcon from '../share/SpotTypeIcon.vue'
import spotReviewRegister from './SpotReviewRegister.vue'
import radarChartDisp from '../share/RadarChartDisp'

export default {
    components: {
        starRating,
        spotReviewList,
        spotTypeIcon,
        spotReviewRegister,
        radarChartDisp
    },
    data: function() {
        return {
            spot_data: {
                name: "ラーメン屋",
                types: ["restaurant"],
                photos: [
                    require("@/assets/Hakataramen.jpg"),
                    // require("@/assets/Hakataramen.jpg"),
                    // require("@/assets/Hakataramen.jpg"),
                ],
                rating:[],
                rating5: [0,1,1,1,1]
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
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },
                {
                    user_name: "hoge",
                    comment: "うまい",
                    score: 3
                },

                {
                    user_name: "piyo1",
                    comment: "",
                    score: 2
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
            now_review_page: 1,
            num_page: 0,
            pos: {
                lat: 0,
                lon: 0
            }
        }
    },
    created(){
        let scores = this.reviews.map(item => item.score)
        this.spot_data.rating = this.ave(scores)
        this.spot_data.rating5[0] = this.spot_data.rating
        console.log(this.spot_data.rating5) // Debug
        this.num_page = Math.ceil(this.reviews.length/this.review_num_per_page) // 総ページ数
    },
    methods: {
        // change_page: function(dir) {
        //     const next_page = this.now_review_page + dir
        //     const max_page = (this.reviews.length ) / this.review_num_per_page
        //     if(next_page < 1 || next_page > max_page) return
        //     else this.now_review_page = next_page
        // },
        jump_page: function(page) {
            return this.now_review_page = page
        },
        getNumber: function(number){
            console.log(number)
            this.jump_page(number)
        },
        sum: function(arr){
            var sum = 0;
            arr.forEach(element => {
                sum += element;
            });
            return sum
        },
        ave: function(arr){
            return (this.sum(arr))/arr.length
        }

    },

    computed: {
        //現在のページに表示するレビューを返す
        sliced_reviews: function() {
            const start = (this.now_review_page-1) * this.review_num_per_page;
            const end = start + this.review_num_per_page;
            return this.reviews.slice(start, end)
        }
    }

}
</script>