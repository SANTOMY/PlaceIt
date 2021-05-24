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
                <!-- ユーザーのアバター写真 -->
                <v-avatar
                    class="mr-5"
                >
                    <img :src="reviewer_data.user.src">
                </v-avatar>
               <!-- ユーザー名（ボタン） -->
                <v-btn 
                    @click="usernameClickEvent()"
                    text
                    style="text-transform: none"
                > 
                    {{ reviewer_data.user.username }} 
                </v-btn>
            </v-row>
            <!-- コメント -->
            <v-row class="mx-5 mt-2">
                {{ reviewer_data.content.comment }}
            </v-row>
            <!-- 評価 -->
            <v-row class="mx-3 mt-1">
                <v-spacer />
                <v-icon class="mr-1">
                    mdi-star-outline
                </v-icon>
                {{ reviewer_data.content.score }}
            </v-row>
        </v-container>
    </v-card>
</template>

<script>

export default {
    props: {
        reviewer_data: null,
    },
    methods:{
        usernameClickEvent() {
            this.$emit('catchUserData',this.reviewer_data.user)
        },
    },
}
</script>