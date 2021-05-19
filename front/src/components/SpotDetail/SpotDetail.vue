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
                    <v-carousel-item v-for="photo in photos" :key="photo.id">
                        <v-sheet color="black" height=100%>
                            <v-img :src="photo.image" height=500 contain />
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
                <v-row
                    justify="center"
                    class="mx-10
                    mt-3 mb-5"
                >
                    <!-- スポット名 -->
                    <h1 class="mr-10"> {{ spotData.spot_name }} </h1>

                    <!-- スポットタイプ --> 
                    
                    <spot-type-icon
                        :type="typesToType()"
                        class="mr-5"
                        large
                        color="gray"
                    />
                    
                    <tag-type-icon v-for="type in typesToTags()" :key="type"
                        :type="type"
                        class="mr-5"
                        large
                        color="gray"
                    />


                </v-row>

            <v-row>
                <!-- スポットの評価(レーダーチャート) -->
                <v-col>
                    <v-row justify="center">
                        <radarChartDisp
                            :type="typesToType()"
                            :reviewRating="rating5"
                        />
                    </v-row>
                </v-col>

                <!-- レビュー 一覧 -->
                <v-col>
                    <v-row justify="center">
                        <!-- 星評価平均 -->
                        平均
                        <star-rating
                            v-model="rating"
                            read-only
                            :increment=0.1
                        >
                        </star-rating>
                    </v-row>
                    <v-row justify="center">
                        <!-- レビューリスト -->
                        <v-col cols="11">
                            <spot-review-list :reviews="slicedReviews"/>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <!-- レビューリストのページ遷移をするやつ -->
                        <v-col cols="8">
                            <v-container class="max-width">
                                <v-pagination                                
                                    @input="changePage"
                                    v-model="now_review_page"
                                    :length="num_page"
                                    :total-visible="7"
                                ></v-pagination>
                            </v-container>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <!-- レビュー投稿ボタン -->
                        <v-col cols="5">
                            <spot-review-register  
                                v-if="this.$store.state.userData != null"
                                :spot_id="spotData.spot_id"
                                :spot_type="spotData.spot_type"
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
import tagTypeIcon from "../share/TagTypeIcon.vue"
import spotReviewRegister from './SpotReviewRegister.vue'
import radarChartDisp from '../share/RadarChartDisp'
import {getSpot} from '../../routes/spotRequest'
import {average} from '../../routes/reviewRequest'
import {getSpotImage} from '../../routes/imageRequest'
import { getUserById } from '../../routes/userRequest.js'
import {getProfileImage} from "../../routes/imageRequest"

export default {
    components: {
        starRating,
        spotReviewList,
        spotTypeIcon,
        tagTypeIcon,
        spotReviewRegister,
        radarChartDisp,   
    },
    data: function() {
        return {
            spotData: {spot_name:"", spot_type:""},
            reviews: [], // spotのレビューリスト
            user_list: [], // userのリスト
            rating: 5,
            rating5: [0,0,0,0,0],
            photos: [{picture_id:1, image:require("@/assets/noimage.png")}],
            num_page: 0,
            REVIEW_NUM_PER_PAGE: 3, //1ページあたりの表示するレビュー数
            now_review_page: 1,

            pos: {
                lat: 0,
                lon: 0
            },
            isLoadingData: true,   //spotデータを読み込んでいるか
            isLoadingPhoto: true   // spotイメージを読み込んでいるか
        }
    },
    props: {
        spot_id: String,
        showDialog: Boolean
    },
    methods: {
        changePage: function(number){
            // console.log('(change review page)change review page to ',number)
            return this.now_review_page = number
        },
        sum: function(arr){ // 配列の要素の合計を計算
            var sum = 0;
            arr.forEach(element => {
                sum += element;
            });
            return sum
        },
        ave: function(arr){ // 配列の要素の平均を計算
            return (this.sum(arr))/arr.length
        },
        closeDialog: function() {
            this.$emit("close");
        },
        typesToType: function() {
            return this.spotData.spot_type.split(',')[0];
        },
        typesToTags: function() {
            console.log(this.spotData.spot_type.split(',').slice(1));
            return this.spotData.spot_type.split(',').slice(1);
        },
        updateDetail: function() {
            this.isLoadingData = true;      // データを取得している間はローディング画面を表示する
            this.isLoadingPhoto = true;      
            getSpot(this.spot_id, "", "", "", "")
                .then(res => {
                    this.spotData = res.spots[0];
                    this.reviews = res.review;
                    //this.isLoadingData = false;
                    this.rating = this.calcRating(this.reviews.map(r =>  Number(r.score)));
                    this.rating5 = this.calcFor5Score(this.reviews.map(r =>  Number(r.score1)),
                                                this.reviews.map(r =>  Number(r.score2)),
                                                this.reviews.map(r =>  Number(r.score3)),
                                                this.reviews.map(r =>  Number(r.score4)),
                                                this.reviews.map(r =>  Number(r.score5)));
                    this.num_page = Math.ceil(this.reviews.length/this.REVIEW_NUM_PER_PAGE) // 総ページ数
                    
                }).then( () => {
                    return this.getUserInformation() //レヴューからユーザー名を取得する関数
                })
            getSpotImage(this.spot_id)
                .then(res => {
                    if(res.success && res.data != undefined) {
                        const image_data = res.data.map(item => {
                            return {id: item.picture_id, image: "data:image/jpeg;base64," + item.image}
                        });
                        this.photos = image_data;
                    }
                    this.isLoadingPhoto = false;
            })
        },
        calcRating: function(scores) {
            return average(scores);
        },
        calcFor5Score: function(score1, score2, score3, score4, score5){
            return [average(score1),average(score2),average(score3),average(score4),average(score5)];
        },
        getUserInformation: function() {//レビューからユーザー情報を取得する関数
            this.user_list = Array(this.reviews.length).fill(undefined) // 初期値
            let j = 0
            for(let i = 0; i < this.reviews.length; i++) {
                getUserById(this.reviews[i].user_id)
                    .then(result => {
                        
                        this.user_list[i]=result[0];            
                        getProfileImage( this.reviews[i].user_id )
                            .then(res => {
                                if(!res.success) {
                                    this.user_list[i].src = require('@/assets/default-icon.jpeg')
                                }else{
                                    this.user_list[i].src = "data:image/jpeg;base64," + res.data.image;
                                }
                                j += 1
                                if(j == (this.reviews.length)){
                                    this.isLoadingData = false; // ユーザー名を全部取得すると、ロード画面が消える
                                }
                            })
                })
            }
        },
    },

    computed: {
        //現在のページに表示するレビューを返す
        slicedReviews: function() {
            const start = (this.now_review_page-1) * this.REVIEW_NUM_PER_PAGE;
            const end = start + this.REVIEW_NUM_PER_PAGE;
            const raw_reviews = this.reviews.slice(start, end)
            const raw_users = this.user_list.slice(start, end)

            // レビューごとにidを振っておかないとv-forでワーニング出るので対応
            var enumerated_reviews = []
            for(var i = 0; i < raw_reviews.length; i++) {
                enumerated_reviews.push({id:i, content:raw_reviews[i],user:raw_users[i]});
            }
            console.log('cut reviewer data:',enumerated_reviews)
            return enumerated_reviews;
        },
        isLoading: function() {     //データとイメージ両方を読み終えた場合のみローディングを完了する
            return this.isLoadingData || this.isLoadingPhoto
        }
    },

    watch: {
        showDialog: function() {    //spot詳細ダイアログが開いた(閉じた)時に実行するメソッド
            if(!this.showDialog) return;
            console.log('spot id:',this.spot_id)
            this.updateDetail()
            this.now_review_page = 1;
            this.photos = [{picture_id:1, image:require("@/assets/noimage.png")}]
        }
    }
}
</script>