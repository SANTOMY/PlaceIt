<template>
    <v-dialog
      v-model="showDialog"
      width="1000"
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

                <v-row justify="space-between" align="center">
                    <!-- 評価ボタン -->
                    <v-col cols="6">
                        <v-row v-for="i in 5" :key="i" align="center">
                            <v-col>
                                <h3>{{criteria_list[i - 1]}}</h3>
                            </v-col>
                            <v-col>
                                <star-rating
                                    v-model="review_data.rating[i - 1]"
                                />                                
                            </v-col>

                        </v-row>
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
import { getSpotTypeDict } from '../share/SpotTypeFunction';

export default {
    components: {
        starRating
    },
    data: function() {
        return {
            showDialog: false,
            review_data: {
                comment: "",
                rating: [0, 0, 0, 0, 0]
            },
            criteria_list: []
        }
    },
    props: {
        spot_id: String,
        spot_type: String
    },
    methods: {
        onClickedRegisterButton: function() {
            this.showDialog = false;
            for(var i = 0; i < 5; i++) {
                console.log(i + ": " + this.review_data.rating[i]);
            }
            console.log();
            saveReview(this.spot_id, this.review_data.comment, this.review_data.rating[0], this.$store.state.userData.id)
                .then(res => {
                    console.log(res)        // Debug
                    this.$emit('submit')
                })
        }
    },

    mounted: function() {
        this.criteria_list = getSpotTypeDict('review')[this.spot_type];
        console.log(this.criteria_list)
    }
    
}
</script>