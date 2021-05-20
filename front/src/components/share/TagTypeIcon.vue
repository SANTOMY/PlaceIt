<template>
    <v-icon
        :class="classType"
        :large=isLarge
        :color="iconColor"
    >
        {{ type_dict[type] }}
    </v-icon>    
</template>

<script>
import {getTagTypeDict} from "./TagTypeFunction"
export default {
    props: {
        type: String,
        iconColor: String, // spot iconのカラー指定
        classType: String,
        isLarge: Boolean
    },
    data: function() {
        return {
            type_dict: getTagTypeDict('icon')
        }
    }  
}
</script>