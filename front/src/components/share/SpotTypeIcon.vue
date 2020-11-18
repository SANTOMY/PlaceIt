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
export default {
    props: {
        type: String
    },

    data: function() {
        return {
            type_dict: {
                restaurant: "mdi-silverware-fork-knife",
                travel: "mdi-bag-suitcase",
                shopping: "mdi-cart"
            }
        }
    }    
}
</script>