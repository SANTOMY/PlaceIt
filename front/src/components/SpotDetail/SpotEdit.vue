<template>
    <v-container>
        <spot-input-form 
            @register="onUpdate"
            @cancel="onCancel"
            title="スポット情報を更新"
            regButtonText="更新"
            :initialSpotData="spotData"
            :initialImages="photos"
            :initialScores="rating5"
        />
    </v-container>
</template>

<script>
import spotInputForm from '../SpotRegister/SpotInputForm'
import {editSpot} from '../../routes/spotRequest'
export default {
    components: {
        spotInputForm
    },

    props: {
        spotId: String, 
        spotData: Object,
        photos: Array,
        rating5: Array
    },

    methods: {
        onUpdate: function(spotData, imageFile) {
            console.log(this.spotId, spotData.name, spotData.types);
            editSpot(this.spotId, spotData.name, spotData.types)
                .then(res => {
                    console.log(res);
                    this.$emit("update");   
                })
            console.log(imageFile);
        },
        onCancel: function() {
            this.$emit("update")
        }
    }

}
</script>
