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
                        <!-- スポットの名前 -->
                        <v-text-field
                            :rules="nameRules"
                            v-model="spot_data.name"
                            label="スポット名"
                            solo
                        ></v-text-field>

                        <!-- スポットの種類 -->
                        <v-select
                            :rules="typeRules"
                            v-model="spot_data.types"
                            :items="all_spot_types"
                            chips
                            label="スポットの種類"
                            multiple
                            solo
                        ></v-select>

                        <!-- スポットの説明 -->
                        <v-textarea
                            v-model="spot_data.discription"
                            solo
                            name="input-7-4"
                            label="説明"
                        ></v-textarea>

                        <!-- スポットの画像ファイル -->
                        <v-file-input
                            v-model="uploadedFiles"
                            placeholder=""
                            label="写真ファイルを追加"
                            multiple
                            prepend-icon="mdi-paperclip"
                        >
                            <template v-slot:selection="{ text }">
                                <v-chip
                                    small
                                    label
                                    color="grey lighten-4"
                                >
                                    {{ text }}
                                </v-chip>
                            </template>
                        </v-file-input>
                    </v-col>
                </v-row>
                <v-row>
                    <!-- ブラウザから選択された写真の一覧 -->
                    <v-col v-for="photo in spot_data.photos" :key="photo"
                        cols="4"
                    >
                        <v-img
                            :src="photo"
                            max-height="250"
                            max-width="250"
                        ></v-img>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn @click="onClickedRegisterButton">
                            登録
                        </v-btn>
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
            spot_data: {
                name: "",
                types: [],
                discription: "",
                photos: []
            },
            //ここの記述があんまり良くない
            //新しいタイプが追加されると他に書き換えるところが出てくる(SpotTypeIcon.vueなど)
            //スポットタイプ名のリストをどこかにまとめる方法はないか
            all_spot_types: [
                "restaurant",
                "travel",
                "shopping"
            ],

            // アップロードされたファイルを一時的に保管する変数
            // 適切な形式に変換された画像データをspot_data.photosに入れるために必要
            uploadedFiles: [],

            nameRules: [
                v => !!v || "スポット名は必須項目です。"
            ],
            typeRules: [
                v => v.length > 0 || "必ず一つ以上選択してください。"
            ]

        }
    },

    methods: {
        onClickedRegisterButton: function() {
            //TODO: スポットをデータベースに登録する処理
            console.log(this.spot_data);
        }
    },

    watch: {
        uploadedFiles: function() {
            this.spot_data.photos = []
            this.uploadedFiles.forEach(file => {
                const reader = new FileReader()         //ファイルリーダを用意
                reader.onload = (e) => {                //読み込みが完了したら配列に追加
                    this.spot_data.photos.push(e.target.result)
                }
                reader.readAsDataURL(file)    
            })
        }
    }
    
}
</script>