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
                        <v-btn block @click="deleteSpot">
                            はい
                        </v-btn>
                    </v-col>
                    <v-col cols="5">
                        <v-btn block @click="onCancel">
                            いいえ
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import {getReviewBySpotId, deleteReview} from '../../routes/reviewRequest';
import {deleteSpot} from '../../routes/spotRequest';
export default {
    props: {
        showDialog: Boolean,
        spotId: String
    },
    methods: {
        deleteSpot:  async function() {
            const reviews_res = await getReviewBySpotId(this.spotId);
            const review_id_list = reviews_res.review.map(item => item.review_id);
            for (let i = 0; i < review_id_list.length; i++) {
                await deleteReview(review_id_list[i]);
            }
            await deleteSpot(this.spotId)
            this.$router.go({path: this.$router.currentRoute.path, force: true})
            
        },
        onCancel: function() {
            this.$emit("cancel");
        },
    }
}
</script>