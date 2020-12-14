<template>
    <v-icon
        class="mr-5"
        large
        color="gray"
    >
        {{ type_dict[type] }}
    </v-icon>    
</template>

<script>
import {getSpotTypeData} from "./SpotTypeFunction"
export default {
    props: {
        type: String
    },

    data: function() {
        return {
            type_dict: getSpotTypeData()
        }
    }    
}
</script>