<template>
        <v-form ref="spotRegisterForm">
            <v-container fluid>
                <v-row>
                    <v-col>
                        <h1>{{title}}</h1>
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
                            :disabled="doneInitTags"
                            :rules="typeRules"
                            v-model="spot_data.types"
                            :items="all_types_name"
                            item-text="text"
                            item-value="type"
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
                                    <spot-type-icon :type="item.type" />
                                    <h3>{{ item.text }}</h3>
                                </v-chip>
                            </template>
                        </v-select>

                        <!-- タグ登録 -->
                        <v-autocomplete
                            v-model="selected_tags"
                            :items="filterd_tags"
                            label="タグ"
                            solo
                            multiple
                            height="80px"
                        >
                            <template v-slot:selection="{ item }">
                                <v-chip
                                    large
                                    label
                                    color="grey lighten-4"
                                >
                                    <tag-type-icon :type="item" :isLarge="true" classType="mr-5"/>
                                    <h3>{{ item }}</h3>
                                </v-chip>
                            </template>
                        </v-autocomplete>

                        <!-- スポットの説明 -->
                        <v-textarea v-if="registerMode"
                            v-model="spot_data.comment"
                            solo
                            name="input-7-4"
                            label="コメント"
                        ></v-textarea>


                        <h3 v-if="chart_disp==true && registerMode && spot_data.types">スコア</h3>

                        <v-row v-if="chart_disp==true && registerMode && spot_data.types">
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
                    <v-col cols="2">
                        <!-- 登録ボタン -->
                        <v-btn 
                            @click="onClickedRegisterButton"
                            x-large
                        >
                            {{regButtonText}}
                        </v-btn>
                    </v-col>
                    <v-col cols="2">
                        <!-- キャンセルボタン -->
                        <v-btn 
                            @click="onClickedCancelButton"
                            x-large
                        >
                            キャンセル
                        </v-btn>
                    </v-col>
                </v-row>                
            </v-container>
        </v-form>
</template>

<script>
import SpotTypeIcon from "../share/SpotTypeIcon.vue"
import TagTypeIcon from "../share/TagTypeIcon.vue"
import {getSpotTypeDict} from "../share/SpotTypeFunction"
import {getTagTypeDict} from "../share/TagTypeFunction"
import StarRating from 'vue-star-rating'
import radarChartDisp from '../share/RadarChartDisp'
import {ConvertToFileFromBase64} from '../share/ConvertImageFunctions'

export default {

    components: {
        SpotTypeIcon,
        TagTypeIcon,
        StarRating,
        radarChartDisp,
    },
    data: function() {
        return {
            chart_disp: false,
            spot_data: {
                name: "",
                photos: [],
                types: "",
                tags: "",
                userId: this.$store.state.userData.userId,
                comment: "",
                scores: [0,0,0,0,0],
                university: this.$store.state.userData.university,
            },
            criteria_list: [],
            all_spot_types: getSpotTypeDict('type'), //spot typeを取得
            all_types_name: getSpotTypeDict('name'), //spotの内容説明を取得
            all_tags: getTagTypeDict('type'), // 全てのタグ
            filterd_tags: [], // spot typeに紐づいたタグのリスト
            selected_tags: [], // ユーザが選択したタグのリスト

            // アップロードされたファイルを一時的に保管する変数
            // 適切な形式に変換された画像データをspot_data.photosに入れるために必要
            uploadedFiles: [],
            nameRules: [
                v => !!v || "スポット名は必須項目です。"
            ],
            typeRules: [
                v => v.length > 0 || "必ず一つ以上選択してください。"
            ],

            doneInitTags: false  // タグを初期化しているか

        }
    },

    props: {
        registerMode: Boolean,
        title: String,
        regButtonText: String,
        initialSpotData: Object,
        initialImages: Array,
        initialScores: Array,
        initialPicture: String
    },

    methods: {
        onClickedRegisterButton: function() {
            if (!this.$refs.spotRegisterForm.validate()) {
                console.log("failed to register")   // Debug
                return
            }
            if(this.check_database()) {
                var file = undefined;
                if(this.spot_data.photos.length > 0) {
                    file = ConvertToFileFromBase64(this.spot_data.photos[0], "hoge.jpeg");
                }
                this.$emit("register", this.spot_data, file);
            }
            else {
                console.log("failed to send database")
            }
        },

        onClickedCancelButton: function() {
            this.$emit("cancel")
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
        },
        typesToStrs: function(types) {
            var strs = ""
            for (var i = 0; i < types.length; i++) {
                if (i != types.length - 1) {
                    strs = strs + types[i] + ",";
                } else {
                    strs = strs + types[i];
                }
            }
            return strs;
        },
        initTags: function() {
            var splited_tags = this.initialSpotData.spot_type.split(",");
            splited_tags.shift()
            this.selected_tags = splited_tags;            
        }
    },

    mounted: function() {
        console.log(this.initialSpotData)
        this.spot_data.name = this.initialSpotData.spot_name;
        this.spot_data.types = this.initialSpotData.spot_type.split(",")[0];
        this.spot_data.scores = this.initialScores;
        if(this.initialPicture == ""
        || this.initialPicture == require("@/assets/noimage.png")) {
            this.spot_data.photos = [];    
        }
        else {
            this.spot_data.photos = [this.initialPicture];
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
            this.selected_tags = []
            let spotType = this.spot_data.types
            this.filterd_tags = this.all_tags.filter(function(tag){
                return getTagTypeDict("stype")[tag.toString()].indexOf(spotType) != -1;
            });
            this.$nextTick(() => (this.chart_disp = true));
            if(!this.doneInitTags && !this.registerMode) {
                this.initTags();
                this.doneInitTags = true;
            }
        },
        'spot_data.scores': function(){ // レーダーチャート5項目のパラメータを変えた時の処理
            this.chart_disp = false
            this.$nextTick(() => (this.chart_disp = true));
        },
        'selected_tags': function(){
            this.spot_data.tags = this.typesToStrs(this.selected_tags);
        }
    },
}
</script>
