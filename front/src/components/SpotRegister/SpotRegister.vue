<template>
    <v-card>
        <v-form ref="spotRegisterForm">
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
                            label="スポットの種類"
                            solo
                            height="80px"
                        >
                            <template v-slot:selection="{ item }">
                                <v-chip
                                    large
                                    label
                                    color="grey lighten-4"
                                >
                                    <spot-type-icon :type="item" />
                                    <h3>{{ item }}</h3>
                                </v-chip>
                            </template>
                        </v-select>
                        <!-- スポットの説明 -->
                        <v-textarea
                            v-model="spot_data.comment"
                            solo
                            name="input-7-4"
                            label="コメント"
                        ></v-textarea>

                        <v-chip 
                            class = "mb-5"
                            label text-color="brack">
                            <h3>スコア</h3>
                        </v-chip>

                        <v-row v-if="chart_disp==true">
                            <!-- レーダーチャート表示 -->
                            <v-col cols="5" justify="center">
                                <radarChartDisp
                                    v-if="chart_disp==true"
                                    :type="spot_data.types"
                                    :reviewRating="spot_data.scores"
                                /> 
                            </v-col>
                            <!-- レーダーチャートパラメータ -->
                            <v-col cols="6" justify="center">
                                <v-row v-for="i in 5" :key="i" align="center">
                                    <v-col>
                                        <h3>{{criteria_list[i - 1]}}</h3>
                                    </v-col>
                                    <v-col>
                                        <star-rating
                                            v-model="spot_data.scores[i - 1]"
                                        />                                
                                    </v-col>
                                </v-row>
                            </v-col>
                            
                            <!-- v-sliderでのパラメータ設定 -->
                            <!-- <v-col cols=5 justify="center" align-content="center">
                                <v-row class="flex-column" v-for="n in 5" :key="n">
                                    <v-slider 
                                        v-model="spot_data.scores[n-1]"
                                        color="orange darken-3"
                                        :label="criteria_list[n-1]"
                                        :max="5"
                                    ></v-slider>
                                </v-row>
                            </v-col> -->
                        </v-row>

                        <!-- スポットの画像ファイル -->
                        <v-file-input
                            v-model="uploadedFiles"
                            placeholder=""
                            multiple
                            label="写真ファイルを追加"
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
                        <!-- 登録ボタン -->
                        <v-btn 
                            @click="onClickedRegisterButton"
                            x-large
                        >
                            登録
                        </v-btn>
                    </v-col>
                </v-row>                
            </v-container>
        </v-form>
    </v-card>
</template>

<script>
import SpotTypeIcon from "../share/SpotTypeIcon.vue"
import {getSpotTypeDict} from "../share/SpotTypeFunction"
import {saveSpot} from '../../routes/spotRequest'
import StarRating from 'vue-star-rating'
import radarChartDisp from '../share/RadarChartDisp'
import {uploadSpotImage} from '../../routes/imageRequest'

export default {

    components: {
        SpotTypeIcon,
        StarRating,
        radarChartDisp,
    },
    data: function() {
        return {
            chart_disp: false,
            spot_data: {
                name: "",
                x:  this.$route.query.lon,
                y:  this.$route.query.lat,
                photos: [],
                types: "",
                userId: this.$store.state.userData.userId,
                comment: "",
                scores: [0,0,0,0,0],
                university: this.$store.state.userData.university,
            },
            criteria_list: [],
            all_spot_types: getSpotTypeDict('type'), //spot typeを取得

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
            if (!this.$refs.spotRegisterForm.validate()) {
                console.log("failed to register")   // Debug
                return
            }
            if(this.check_database()) {
                saveSpot(this.spot_data.name, this.spot_data.x, this.spot_data.y, "", this.spot_data.types, this.spot_data.userId, this.spot_data.comment, this.spot_data.scores, this.spot_data.university)
                    .then(res => {
                        console.log(res.success)
                        if(!res.success) return
                        uploadSpotImage(this.uploadedFiles[0], res.spotId)
                    })
            }
            else {
                console.log("failed to send database")
            }
            //TODO: スポットをデータベースに登録する処理
            this.$router.push('/map')
        },
        check_database: function() {
            //TODO: アカウントを作成できるか確認
            return true
        },

        create_spot: function() {
            console.log("create_spot")
        },

        ratingSelected: function (val) {
        this.$emit('rating-selected',val)
        },
        currentRating: function (val) {
            this.$emit('current-rating',val)
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
        },
        'spot_data.types': function(){ // spot type を変えた時の処理
            this.chart_disp = false
            this.criteria_list = getSpotTypeDict('review')[this.spot_data.types];
            this.$nextTick(() => (this.chart_disp = true));
        },
        'spot_data.scores': function(){ // レーダーチャート5項目のパラメータを変えた時の処理
            this.chart_disp = false
            this.$nextTick(() => (this.chart_disp = true));
        },
    },
}
</script>
