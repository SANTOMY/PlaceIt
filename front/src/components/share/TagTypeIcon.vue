<template>
    <v-tooltip bottom :disabled="!toolTip">
    <template v-slot:activator="{ on, attrs }">
    <v-icon
        :class="classType"
        :large="isLarge"
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
import {getTagTypeDict} from "./TagTypeFunction"
export default {
    props: {
        type: String,
        iconColor: String, // spot iconのカラー指定
        classType: String,
        isLarge: Boolean,
        toolTip: Boolean,
    },
    data: function() {
        return {
            type_dict: getTagTypeDict('icon')
        }
    }  
}
</script>