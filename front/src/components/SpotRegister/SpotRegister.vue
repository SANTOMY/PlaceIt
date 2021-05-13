<template>
  <spot-input-form @register="OnRegister"/>
</template>

<script>
import spotInputForm from './SpotInputForm.vue'
import {saveSpot} from '../../routes/spotRequest'
import {uploadSpotImage} from '../../routes/imageRequest'
export default {

    components: {
        spotInputForm
    },


    methods: {
        OnRegister: function(spotData, imageFile) {
            saveSpot(spotData.name, spotData.x, spotData.y, "", spotData.types, spotData.userId, spotData.comment, spotData.scores, spotData.university)
                .then(res => {
                    if(!res.success) return
                    uploadSpotImage(imageFile, res.spotId)
                })
        }
    }

}
</script>