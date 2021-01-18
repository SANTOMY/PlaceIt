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

                        <!-- スポットの評価 --> 
                        <!-- <p>スポットの評価</p>
                        <star-rating
                        class="mb-5"
                            v-model="spot_data.rating"
                            :increment=0.5
                        >
                        </star-rating> -->

                        <!-- スポットの説明 -->
                        <v-textarea
                            v-model="spot_data.comment"
                            solo
                            name="input-7-4"
                            label="コメント"
                        ></v-textarea>

                        <!-- スポットの点数 -->
                        <v-chip 
                            class = "mb-5"
                            label text-color="brack">
                            <h3>スコア</h3>
                        </v-chip>
                        <star-rating
                            v-model="spot_data.score"
                            @rating-selected="ratingSelected"
                            @current-rating="currentRating"
                        ></star-rating>

                        <!-- スポットの評価 -->
                        <v-row v-if="spot_data.types!=''">
                            <!-- <radarChartDisp
                                :type="spot_data.types"
                                :reviewRating="numberData"
                            />   -->
                            <v-slider
                                v-model="ex1.val"
                                :color="ex1.color"
                                :label="ex1.label"
                            ></v-slider>
                            <v-slider
                                v-model="ex1.val"
                                :color="ex1.color"
                                :label="ex1.label"
                            ></v-slider>
                            <v-slider
                                v-model="ex1.val"
                                :color="ex1.color"
                                :label="ex1.label"
                            ></v-slider>
                            <v-slider
                                v-model="ex1.val"
                                :color="ex1.color"
                                :label="ex1.label"
                            ></v-slider>
                            <v-slider
                                v-model="ex1.val"
                                :color="ex1.color"
                                :label="ex1.label"
                            ></v-slider>
                        </v-row>                      
                        <!-- <v-row>
                            <v-col 
                                v-for="value in [0,1,2,3,4]"
                                :key="value"
                            >
                                <v-select
                                    :rules="typeRules"
                                    v-model="numberData[value]"
                                    :items="[1,2,3,4,5]"
                                    :label="'評価'+str(value+1)"
                                    solo
                                    height="60px"
                                    width="120px"
                                >{{item}}
                                </v-select>
                            </v-col>
                        </v-row> -->
                        <!-- スポットの画像ファイル -->
                        <v-file-input
                            v-model="uploadedFiles"
                            placeholder=""
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
// import radarChartDisp from '../share/RadarChartDisp'

export default {

    components: {
        SpotTypeIcon,
        StarRating,
        // radarChartDisp,
    },
    data: function() {
        return {
            spot_data: {
                name: "",
                x:  this.$route.query.lon,
                y:  this.$route.query.lat,
                photos: "dir",
                types: "",
                userId: this.$store.state.userData.userId,
                comment: "",
                score: null,
                university: this.$store.state.userData.university
            },
            all_spot_types: {}, // mountedで取得
            // color_dict: getSpotTypeDict('color'),
            // アップロードされたファイルを一時的に保管する変数
            // 適切な形式に変換された画像データをspot_data.photosに入れるために必要
            uploadedFiles: [],
            review_dict: getSpotTypeDict('review'),
            numberData: [1,1,1,1,1],
            ex1: { label: 'color', val: 5, color: 'orange darken-3' },
            nameRules: [
                v => !!v || "スポット名は必須項目です。"
            ],
            typeRules: [
                v => v.length > 0 || "必ず一つ以上選択してください。"
            ]

        }
    },
    mounted(){
        this.all_spot_types = getSpotTypeDict('type')
    },

    methods: {
        onClickedRegisterButton: function() {
            if (!this.$refs.spotRegisterForm.validate()) {
                console.log("failed to register")   // Debug
                return
            }
            if(this.check_database()) {
                saveSpot(this.spot_data.name, this.spot_data.x, this.spot_data.y, this.spot_data.photos, this.spot_data.types, this.spot_data.userId, this.spot_data.comment, this.spot_data.score, this.spot_data.university)
                //console.log(resp.success)
                this.create_spot()
                //this.$router.push('/map')
                }
                else {
                    console.log("failed to send database")
                }
            //TODO: スポットをデータベースに登録する処理
            console.log(this.spot_data)     // Debug
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
            this.$emit('current-rating',val)}
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
