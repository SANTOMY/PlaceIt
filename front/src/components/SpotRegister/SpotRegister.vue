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
            saveSpot(this.spot_data.name, this.spot_data.x, this.spot_data.y, "", this.spot_data.types + "," + this.spot_data.tags, this.spot_data.userId, this.spot_data.comment, this.spot_data.scores, this.spot_data.university)
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