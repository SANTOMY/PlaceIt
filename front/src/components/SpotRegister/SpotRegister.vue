<template>
  <spot-input-form 
    @register="OnRegister"
    @cancel="OnCancel"
    registerMode
    title="新しいスポットを登録"
    regButtonText="登録"
    :initialSpotData="initialSpotData"
    :initialImages="initialImages"
    :initialScores="initialScores"
    initialPicture=""
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
            criteria_list: [],
            // アップロードされたファイルを一時的に保管する変数
            // 適切な形式に変換された画像データをspot_data.photosに入れるために必要
            uploadedFiles: [],
            nameRules: [
                v => !!v || "スポット名は必須項目です。"
            ],
            typeRules: [
                v => v.length > 0 || "必ず一つ以上選択してください。"
            ],
            initialImages: [],
            initialScores: [3, 3, 3, 3, 3]
        }
    },

    methods: {
        OnRegister: function(spotData, imageFile) {
            console.log(spotData)
            saveSpot(spotData.name, this.$route.query.lon, this.$route.query.lat, "", spotData.types + "," + spotData.tags, spotData.userId, spotData.comment, spotData.scores, spotData.university)
                .then(res => {
                    if(!res.success) return
                    if(imageFile == undefined) {
                        this.$router.push('/map')
                        return 
                    }
                    uploadSpotImage(imageFile, res.spotId)
                        .then(res => {
                            console.log(res)
                            this.$router.push('/map')
                        })
                })
        },
        OnCancel: function() {
            this.$router.push('/map')
        }
    }

}
</script>