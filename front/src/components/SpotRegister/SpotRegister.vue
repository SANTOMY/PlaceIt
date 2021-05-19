<template>
  <spot-input-form 
    @register="OnRegister"
    @cancel="OnCancel"
    submitFirstReview
    title="新しいスポットを登録"
    regButtonText="登録"
    :initialSpotData="initialSpotData"
    :initialImages="initialImages"
    :initialScores="initialScores"
  />
</template>

<script>
import spotInputForm from './SpotInputForm.vue'
import {saveSpot} from '../../routes/spotRequest'
import {uploadSpotImage} from '../../routes/imageRequest'
export default {

    components: {
        spotInputForm
    },

    data: function() {
        return {
            initialSpotData: {
                spot_name: "",
                spot_type: ""
            },
            initialImages: [],
            initialScores: [3, 3, 3, 3, 3]
        }
    },

    methods: {
        OnRegister: function(spotData, imageFile) {
            saveSpot(spotData.name, this.$route.query.lon, this.$route.query.lat, "", spotData.types, spotData.userId, spotData.comment, spotData.scores, spotData.university)
                .then(res => {
                    if(!res.success) return
                    uploadSpotImage(imageFile, res.spotId)
                        .then(res => {
                            console.log(res)
                        })
                })
            this.$router.push('/map')            
        },
        OnCancel: function() {
            this.$router.push('/map')
        }
    }

}
</script>