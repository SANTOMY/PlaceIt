<template>
    <v-card
        class="mb-2 mr-2"
        color="grey lighten-4"
        flat
    >
        <v-container>
            <v-row 
                class="mx-1"
                align="center"
            >
                <!-- いつかavaterに変えたい -->
                
                <v-avatar
                    class="mr-5"
                >
                    <img :src="reviewer_data.user.src">
                </v-avatar>
               
                <v-btn 
                    @click="usernameClickEvent()"
                    text
                > 
                    {{ reviewer_data.user.username }} 
                </v-btn>
            </v-row>
            <v-row class="mx-5 mt-2">
                {{ reviewer_data.content.comment }}
            </v-row>
            <v-row class="mx-3 mt-1">
                <v-spacer />
                <v-icon class="mr-1">
                    mdi-star-outline
                </v-icon>
                {{ reviewer_data.content.score }}
            </v-row>
        </v-container>
        <user-profile-dialog :showDialog="showUserDialog" :user="reviewer_data.user" @close="closeDialog()"/>
    </v-card>
    
</template>

<script>
import UserProfileDialog from '../share/UserProfileDialog.vue'

export default {
    components: {
        UserProfileDialog
    },

    props: {
        reviewer_data: null,
        // (reviewer_dataの構造) = [{ content: {comment: x , score: y} 
        //                          { user: {username: a, id: b, src: c} } } ]
    },
    data: function() {
        return {
            showUserDialog: false,
        }
    },
    methods:{
        closeDialog() {
            this.showUserDialog = false;
        },
        usernameClickEvent() {
            this.showUserDialog = true;
        },
    },
}
</script>