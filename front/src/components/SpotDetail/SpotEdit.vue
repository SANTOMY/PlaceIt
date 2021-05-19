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
export default {
    components: {
        spotInputForm
    },

    props: {
        spotData: Object,
        photos: Array,
        rating5: Array
    },

    methods: {
        onUpdate: function(spotData, imageFile) {
            console.log(spotData, imageFile)
            this.$emit("update")   
        },
        onCancel: function() {
            this.$emit("update")
        }
    }

}
</script>
