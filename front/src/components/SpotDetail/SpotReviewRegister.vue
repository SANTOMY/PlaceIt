<template>
    <v-dialog
      v-model="showDialog"
      width="800"
    >
        <!-- ダイアログを開くボタン -->
        <template v-slot:activator="{ on, attrs }">
            <v-btn 
                class="px-10 py-6"
                block
                v-bind="attrs"
                v-on="on"
            >
                <h2>レビューを追加する</h2>
            </v-btn>
        </template>

        <!-- レビュー投稿画 -->
        <v-card class="px-5">
            <v-container>
                <v-card-title>
                    <h2>新規レビュー</h2>
                </v-card-title>
                <v-form class="mt-5">
                <!-- コメント入力フォーム -->
                    <v-textarea
                        v-model="review_data.comment"
                        solo
                        name="input-7-4"
                        label="レビュー"
                    ></v-textarea>
                </v-form>

                <!-- 評価ボタン -->
                <v-row justify="space-between">
                    <v-col cols="5">
                        <star-rating
                            v-model="review_data.rating"
                        />
                    </v-col>
                    <v-col cols="5">
                    <!-- 投稿ボタン -->
                        <v-btn 
                            block
                            height="50"
                            @click="onClickedRegisterButton"
                        >
                            <h2>投稿</h2>
                        </v-btn>
                    </v-col>
                </v-row>               
            </v-container>

        </v-card>
    </v-dialog>
</template>

<script>
import starRating from 'vue-star-rating'
import { saveReview } from '../../routes/reviewRequest';
export default {
    components: {
        starRating
    },
    data: function() {
        return {
            showDialog: false,

            review_data: {
                comment: "",
                rating: 3,
                score1: 1,
                score2: 2,
                score3: 3,
                score4: 4,
                score5: 5,
            }

        }
    },
    props: {
        spot_id: String
    },
    methods: {
        onClickedRegisterButton: function() {
            this.showDialog = false;
            saveReview(this.spot_id, this.review_data.comment, this.review_data.rating, this.$store.state.userData.id, this.score1, this.score2, this.score3, this.score4, this.score5)
                .then(res => {
                    console.log(res)        // Debug
                    this.$emit('submit')
                })
        }
    }
    
}
</script>