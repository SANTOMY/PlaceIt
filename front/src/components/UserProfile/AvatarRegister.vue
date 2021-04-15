<template>
    <v-dialog
      v-model="showDialog"
      width="800"
    >
        <!-- ダイアログを開くボタン -->
        <template v-slot:activator="{ on, attrs }">
            <v-container>
                <v-row justify="center">
                    <v-col cols="6">
                        <v-btn 
                            class="px-5 py-6"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <h3>アイコン画像を変更</h3>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </template>

        <!--  画像の切り取り画面  -->
        <v-card class="px-5" v-if='croppedImage === ""'>
            <v-container>
                <v-row>
                    <v-col>
                        <h1 class="mb-5">アイコン画像を変更</h1>
                        <!--  ファイル選択  -->
                        <v-form>
                            <v-file-input
                                v-model="uploadedFile"
                                placeholder=""
                                label="写真ファイルを追加"
                                prepend-icon="mdi-paperclip"
                            />
                        </v-form>
                    </v-col>
                </v-row>
                <v-row>
                    <!--  切り取りUI  -->
                    <v-col>
                        <div
                            v-if="rawImage !== ''"
                            class="l_cropper_container"
                        >
                            <vue-cropper
                                ref="cropper"
                                :guides="true"
                                :view-mode="2"
                                :auto-crop-area="0.5"
                                :min-container-width="740"
                                :min-container-height="300"
                                :background="true"
                                :rotatable="false"
                                :src="rawImage"
                                :img-style="{ 'width': '740px', 'height': '300px' }"
                                :aspect-ratio="1"
                                drag-mode="crop"
                            />
                        </div>
                    </v-col>
                </v-row>               
                <v-row justify="center">
                    <v-col cols="5">
                        <v-btn 
                            block
                            class="pa-5" 
                            v-if="rawImage !== ''"
                            @click="cropImage"
                        >
                            <h3>切り取る</h3>
                        </v-btn>
                        
                    </v-col>
                </v-row>
            </v-container>
        </v-card>

        <!--  確認画面  -->
        <v-card class="px-5" v-if='croppedImage !== ""'>
            <v-container>
                <v-row justify="center">
                    <v-col cols="6">
                        <h1>これに設定しますか？</h1>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="5">
                        <v-img 
                            :src="croppedImage" 
                            aspect-ratio="1"
                        />
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="5">
                        <v-btn 
                            block
                            class="pa-5"
                            @click="cancelCrop()" 
                        >
                            <h3>やり直す</h3>
                        </v-btn>
                    </v-col>
                    <v-col cols="5">
                        <v-btn 
                            block
                            class="pa-5" 
                            @click="submitImage()"
                        >
                            <h3>設定する</h3>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>

    </v-dialog>
</template>

<script>
import VueCropper from "vue-cropperjs";
import 'cropperjs/dist/cropper.css'
export default {
    components: {
        VueCropper
    },
    data: function() {
        return {
            showDialog: false,
            uploadedFile: "",   //選択されたファイル
            rawImage: "",       //切り取る前の画像データ(base64)
            croppedImage: "",    //切り取り&リサイズ後の画像データ(base64)
            AVATAR_SIZE: 200    //アバターのサイズ
        }
    },
    methods: {
        cropImage: function() {
            const raw_size_image = this.$refs.cropper.getCroppedCanvas().toDataURL();
            this.resizeImage(raw_size_image);
        },
        resizeImage: function(base64image) {       
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = this.AVATAR_SIZE;
            canvas.height = this.AVATAR_SIZE;
            var image = new Image();
            image.crossOrigin = "Anonymous";
            image.onload = (event) => {
                console.log(event)
                ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, this.AVATAR_SIZE, this.AVATAR_SIZE);
                this.croppedImage = canvas.toDataURL('image/jpeg');
            };
            image.src = base64image;
        },
        cancelCrop: function() {
            this.croppedImage = ""
        },
        submitImage: function() {
            this.$emit('submit', this.croppedImage);
            this.showDialog = false;
            this.croppedImage = "";
            this.uploadedFile = "";
        }
    },

    watch: {
        uploadedFile: function() {
            if(this.uploadedFile === "") {
                this.rawImage = "";
                return;
            }
            this.rawImage = "";
            const reader = new FileReader()         //ファイルリーダを用意
            reader.onload = (e) => {                //読み込みが完了したら配列に追加
                this.rawImage = e.target.result;
            };
            reader.readAsDataURL(this.uploadedFile)    
        }
    }
}
</script>

<style scoped>
.l_cropper_container {
  width: 740px;
  height: 300px;
  border: 1px solid gray;
  display: inline-block;
  text-align: center;
}
</style>