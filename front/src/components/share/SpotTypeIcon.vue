<template>
    <v-tooltip bottom :disabled="!toolTip">
    <template v-slot:activator="{ on, attrs }">
    <v-icon
        class="mr-5"
        large
        :color="iconColor"
        v-bind="attrs"
        v-on="on"
    >
        {{ type_dict[type] }}
    </v-icon>
    </template>
    <span>{{type}}</span>
    </v-tooltip>
</template>

<script>
import {getSpotTypeDict} from "./SpotTypeFunction"
export default {
    props: {
        type: String,
        iconColor: String, // spot iconのカラー指定
        toolTip: Boolean,
        classType: String,
    },
    data: function() {
        return {
            type_dict: getSpotTypeDict('icon')
        }
    }  
}
</script>