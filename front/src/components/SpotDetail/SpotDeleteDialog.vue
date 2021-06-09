<template>
    <v-dialog
        v-model="showDialog"
        width="500"
        persistent
    >
        <v-card>
            <v-container>
                <v-row justify="center">
                    <h3>本当に削除しますか？</h3>
                </v-row>
                <v-row justify="center">
                    <v-col cols="5">
                        <v-btn block @click="clickedYes">
                            はい
                        </v-btn>
                    </v-col>
                    <v-col cols="5">
                        <v-btn block @click="clickedNo">
                            いいえ
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import {getReviewBySpotId} from '../../routes/reviewRequest';
//import {deleteSpot} from '../../routes/spotRequest';
export default {
    props: {
        showDialog: Boolean,
        spotId: String
    },
    methods: {
        clickedYes:  async function() {
            const res = await getReviewBySpotId(this.spotId);
            const review_id_list = res.review.map(item => item.review_id);
            console.log(review_id_list);
            //await deleteSpot(this.spotId)
        },
        clickedNo: function() {
            this.$emit("cancel");
        },
    }
}
</script>