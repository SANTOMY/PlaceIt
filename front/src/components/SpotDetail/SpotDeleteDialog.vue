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
import {deleteSpot} from '../../routes/spotRequest';
export default {
    props: {
        showDialog: Boolean,
        spotId: String
    },
    methods: {
        clickedYes: function() {
            deleteSpot(this.spotId)
                .then(res => {
                    console.log(res)
                    //this.$router.go({path: this.$router.currentRoute.path, force: true})
                })
        },
        clickedNo: function() {
            this.$emit("cancel");
        },
    }
}
</script>