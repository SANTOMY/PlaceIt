<template>
    <v-dialog
      v-model="showDialog"
      width="800"
    >
        <!-- ダイアログを開くボタン -->
        <template v-slot:activator="{ on, attrs }">
            <v-btn 
                class="px-5 py-6"
                block
                v-bind="attrs"
                v-on="on"
            >
                <h3>アイコン画像を変更</h3>
            </v-btn>
        </template>

        <v-card class="px-5">
            <v-container>
                <v-row>
                    <v-col>
                        <v-form>
                            <v-file-input
                                v-model="uploadedFile"
                                placeholder=""
                                label="写真ファイルを追加"
                                prepend-icon="mdi-paperclip"
                            >
                            </v-file-input>
                        </v-form>
                    </v-col>
                </v-row>
                <v-row>
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
                        <v-btn block class="pa-5" v-if="rawImage !== ''"><h3>切り取る</h3></v-btn>
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
            uploadedFile: "",
            rawImage: ""
        }
    },
    methods: {
    },
    watch: {
        uploadedFile: function() {
            console.log("11111")
            this.rawImage = "";
            
            const reader = new FileReader()         //ファイルリーダを用意
            reader.onload = (e) => {                //読み込みが完了したら配列に追加
                this.rawImage = e.target.result;

                console.log("22222")
                
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