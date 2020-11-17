<template>
    <v-card>
        <v-form>
            <v-container>
                <v-row>
                    <v-col>
                        <h1>新しいスポットを追加</h1>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                            label="スポット名"
                            solo
                        ></v-text-field>

                        <v-select
                            v-model="selected_types"
                            :items="types"
                            chips
                            label="スポットの種類"
                            multiple
                            solo
                        ></v-select>

                        <v-textarea
                            solo
                            name="input-7-4"
                            label="説明"
                        ></v-textarea>

                        <input 
                            ref="input_image"
                            type="file" 
                            accept="image/*"
                            style="display: none"
                            @change="onFileChange($event)"
                        >

                        <v-btn
                            @click="btnclick"
                        >
                            写真を追加
                        </v-btn>

                    </v-col>
                </v-row>
                <v-row justify="left">
                    <v-col v-for="photo in photo_list" :key="photo"
                        cols="4"
                    >
                        <v-img
                            :src="photo"
                            max-height="250"
                            max-width="250"
                        ></v-img>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>
export default {

    data: function() {
        return {
            types: [
                "restaurant",
                "travel",
                "shopping"
            ],
            selected_types: [],

            photo_list: []
        }
    },

    methods: {
        btnclick: function() {
            this.$refs.input_image.click()
        },
        onFileChange(event) {
            const files = event.target.files

            if(files.length == 0) return;

            files.forEach(file => {
                const reader = new FileReader()

                reader.onload = (e) => {
                    this.photo_list.push(e.target.result)
                    console.log(this.photo_list)
                };
                reader.readAsDataURL(file)
            });
        }
    }
    
}
</script>