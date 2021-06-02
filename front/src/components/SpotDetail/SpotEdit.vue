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
            :initialPicture="base64Image"
        />
    </v-container>
</template>

<script>
import spotInputForm from '../SpotRegister/SpotInputForm'
import {editSpot} from '../../routes/spotRequest'
import {uploadSpotImage} from '../../routes/imageRequest'
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
            console.log(this.spotId, spotData.name, spotData.types + "," + spotData.tags);
            editSpot(this.spotId, spotData.name, spotData.types + "," + spotData.tags)
                .then(res => {
                    if(!res.success) return
                    uploadSpotImage(imageFile, this.spotId)
                        .then(res => {
                            console.log(res)
                            this.$emit("update");   
                        })
                })
        },
        onCancel: function() {
            this.$emit("update")
        }
    },

    computed: {
        base64Image: function() {
            return this.photos.map(item => item.image)[0];
        }
    }

}
</script>
