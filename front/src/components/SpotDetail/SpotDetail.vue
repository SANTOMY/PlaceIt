<template>
    <v-dialog
      v-model="showDialog"
      width="1200"
      persistent
    >
        <v-card>
            <!-- ローディング画面 -->
            <v-skeleton-loader
                v-if="isLoading"
                type="image, article, article"
                class="mx-auto"
            ></v-skeleton-loader>
            <v-container v-if="!isLoading">
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
                                :increment=0.1
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

                                <spot-review-register  
                                    v-if="this.$store.state.userData != null"
                                    :spot_id="spotData.spot_id" 
                                    @submit="updateDetail()"
                                />
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
import {getSpot} from '../../routes/spotRequest'

export default {
    components: {
        starRating,
        spotReviewList,
        spotTypeIcon,
        spotReviewRegister
    },
    data: function() {
        return {
            spotData: {spot_name:"", spot_type:""},
            reviews: [],
            rating: 5,
            photo: require("@/assets/Hakataramen.jpg"),    //仮

            REVIEW_NUM_PER_PAGE: 3, //1ページあたりの表示するレビュー数
            now_review_page: 0,

            pos: {
                lat: 0,
                lon: 0
            },
            isLoading: false
        }
    },

    props: {
        spot_id: String,
        showDialog: Boolean
    },

    methods: {
        change_page: function(dir) {
            const next_page = this.now_review_page + dir
            const max_page = (this.reviews.length - 1) / this.REVIEW_NUM_PER_PAGE
            if(next_page < 0 || next_page > max_page) return
            else this.now_review_page = next_page
        },
        closeDialog: function() {
            this.$emit("close");
        },
        updateDetail: function() {
            this.isLoading = true;      // データを取得している間はローディング画面を表示する
            getSpot("", "", "", "") //TODO:spot_idでしぼる
                .then(res => {
                    this.spotData = res.spots.find(s => s.spot_id == this.spot_id);
                    this.reviews = res.review.filter(r => r.spot_id == this.spot_id);
                    this.isLoading = false;
                    this.rating = this.calcRating(this.reviews.map(r =>  Number(r.score)))
                    
                }) 
        },
        calcRating: function(scores) {
            var average = 0;
            scores.forEach(score => average += score);
            average /= scores.length;
            return average;
        }
    },

    computed: {
        //現在のページに表示するレビューを返す
        sliced_reviews: function() {
            const start = this.now_review_page * this.REVIEW_NUM_PER_PAGE;
            const end = start + this.REVIEW_NUM_PER_PAGE;
            const raw_reviews = this.reviews.slice(start, end)
            var enumerated_reviews = []
            for(var i = 0; i < raw_reviews.length; i++) {
                enumerated_reviews.push({"id":i, content:raw_reviews[i]});
            }
            return enumerated_reviews;
        },
    },

    watch: {
        showDialog: function() {    //ダイアログが開いた(閉じた)時に実行するメソッド
            if(!this.showDialog) return;
            this.updateDetail()
            this.now_review_page = 0;
        }
    }
}
</script>