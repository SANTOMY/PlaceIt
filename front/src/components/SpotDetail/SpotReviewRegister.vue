<template>
    <v-dialog
      v-model="showDialog"
      width="800"
    >
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

        <v-card class="px-5">
            <v-container>
                <v-card-title>
                    <h2>新規レビュー</h2>
                </v-card-title>
                <v-form class="mt-5">
                    <v-textarea
                        v-model="review_data.comment"
                        solo
                        name="input-7-4"
                        label="レビュー"
                    ></v-textarea>
                </v-form>

                <v-row justify="space-between">
                    <v-col cols="5">
                        <star-rating
                            v-model="review_data.rating"
                            :increment=0.5
                        />
                    </v-col>
                    <v-col cols="5">
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
export default {
    components: {
        starRating
    },
    data: function() {
        return {
            showDialog: Boolean,

            review_data: {
                comment: "",
                rating: 2.5
            }

        }
    },
    methods: {
        onClickedRegisterButton: function() {
            this.showDialog = false;
            console.log(this.review_data)
        }
    }
    
}
</script>