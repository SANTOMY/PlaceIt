<template>
    <v-dialog v-model="showDialog" width="500">
        <template v-slot:activator="{ attrs }">
            <v-container>
                <v-btn class="px-5 py-6" max-width="500px" v-bind="attrs" @click="activate()">
                    <h3>ユーザ情報変更</h3>
                </v-btn>
            </v-container>
        </template>
        
        <v-stepper 
            v-model="state"
            v-if='!editer'
        >
<!-----------------------ヘッダー------------------------------------------------->
            <v-stepper-header>
                <!-- templateでループさせてます -->
                <template
                    v-for="(value,index) in stepData"
                >
                    <!-- 3つの項目のヘッダーをループさせています -->
                    <v-stepper-step
                        editable
                        edit-icon="$complete"
                        :key="`first-${index}`"
                        :step="index+1"
                        :complete="value.edit"
                    >
                        {{ value.name }}
                    </v-stepper-step>
                    <v-divider 
                    v-if='index!=2'
                    :key="index"/>
                </template>
            </v-stepper-header>
<!--------------------------------ステップ1--------------------------------------------->
<!-- 同様処理を複数回行っているところが複数箇所あるため、今後プログラムを短くする予定です。。。 -->
            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card
                        width="500px" 
                        class="mx-auto mt-5"
                    ></v-card>
                    <v-card-text>
                        <v-form ref="loginFormName">

                            <!-- ユーザー名変更 -->
                            <v-text-field label="変更後のユーザー名"
                                prepend-icon="mdi-human"
                                v-model="model.edit_username"
                                :rules="usernameRules"
                                :counter="128"/>
                            
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                        color="primary"
                        @click="continuePage(1)"
                        >
                        Continue
                        </v-btn>

                        <v-btn 
                        text
                        @click="skipPage(1)"
                        >
                        Skip
                        </v-btn>
                        <v-spacer/>
                    </v-card-actions>
                </v-stepper-content>
<!--------------------------------ステップ2--------------------------------------------->
                <v-stepper-content step="2">
                    <v-card
                        width="400px" 
                        class="mx-auto mt-5"
                    ></v-card>

                    <v-card-text>
                        <v-form ref="loginFormEmail">

                            <!-- メールアドレス変更 -->

                            <v-text-field label="変更後のメールアドレス"
                                prepend-icon="mdi-email"
                                v-model="model.edit_email" 
                                :counter="128"
                                :rules="emailRulesEdit"
                                />

                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                        color="primary"
                        @click="continuePage(2)"
                        >
                        Continue
                        </v-btn>

                        <v-btn 
                        text
                        @click="skipPage(2)"
                        >
                        Skip
                        </v-btn>
                        <v-btn 
                        text
                        @click="backPage(2)"
                        >
                        Back
                        </v-btn>
                    </v-card-actions>
                </v-stepper-content>
<!--------------------------------ステップ3--------------------------------------------->
                <v-stepper-content step="3">
                    <v-card
                        width="400px" 
                        class="mx-auto mt-5"
                    ></v-card>
                    
                    <v-card-text>
                        <v-form ref="loginForm">

                            <!-- パスワード変更-->

                            <v-text-field label="変更後のパスワード"
                                prepend-icon="mdi-lock" 
                                v-bind:append-icon="showPasswordEdit ? 'mdi-eye' : 'mdi-eye-off'" 
                                v-bind:type="showPasswordEdit ? 'text' : 'password'" 
                                @click:append="showPasswordEdit = !showPasswordEdit"
                                v-model="model.edit_password"
                                :counter="32"
                                :rules="passwordRulesEdit"
                                />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                        color="primary"
                        @click="continuePage(3)"
                        >
                        Continue
                        </v-btn>

                        <v-btn 
                        text
                        @click="skipPage(3)"
                        >
                        Skip
                        </v-btn>
                        <v-btn 
                        text
                        @click="backPage(3)"
                        >
                        Back
                        </v-btn>
                    </v-card-actions>   
                </v-stepper-content>
<!------------------------------------------------------------------------------------>
            </v-stepper-items>
        </v-stepper>
<!--------------------------------Confirm--------------------------------------------->
        <v-card class="px-5" v-if='editer'>
            <v-container>
                <v-row justify="center">
                    <v-col cols="10">
                        <h1>本当に修正しますか？</h1>
                        <p>修正項目</p>
                        <p v-if="this.stepData[0].edit">・ユーザー名</p>
                        <p v-if="this.stepData[1].edit">・メールアドレス</p>
                        <p v-if="this.stepData[2].edit">・パスワード</p>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="5">
                        <v-btn 
                            block
                            class="pa-5"
                            @click="cancel" 
                        >
                            <h3>いいえ</h3>
                        </v-btn>
                    </v-col>
                    <v-col cols="5">
                        <v-btn 
                            block
                            class="pa-5" 
                            @click="editUserInformation"
                        >
                            <h3>はい</h3>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-alert
                    dense
                    type="error"
                    class="mt-7"
                    v-if="!editSuccessed"
                >
                    編集できませんでした
                </v-alert>
            </v-container>
        </v-card>
<!------------------------------------------------------------------------------------>
    </v-dialog>
</template>

<script>
import {editUser} from '../../routes/userRequest'
const User = require("../../store/user");
export default {
    props: {
        user: null
    },
    data: function() {
        return {
            state: null, // 修正UIの状態(1~3で遷移)
            showDialog: false, // trueで修正UIを表示
            model: { // edit後の情報を書き込むclassです。
                username : "",
                edit_username : "",
                email : "",
                edit_email: "",
                password : "",
                edit_password : "",
                edit: false,
            },
            editSuccessed: true, //修正に失敗したかどうか

            showPasswordEdit : false, // trueで修正後パスワード表示
            stepData: [ // 各ステップで使用する変数を格納する配列
                { name: "Username", edit: false, form: "loginFormName"},
                { name: "Email", edit: false, form: "loginFormEmail"},
                { name: "Password", edit: false, form: "loginFormPassword"},
            ],
            // 以下、修正入力上のルール設定
            usernameRules: [ // usernameの入力ルール
                // v => !!v || "ユーザ名は必須項目です。",
                v => (v && v.length <= 32) || "ユーザ名は1文字以上、32文字以内で入力してください。",
            ],
            emailRulesEdit: [ // emailの入力ルール
                // v => !!v || "メールアドレスは必須項目です。",
                v => (v && v.length <= 128) || "メールアドレスは128文字以内で入力してください。",
                v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || "メールアドレスの形式が正しくありません。"
            ],
            passwordRulesEdit: [ // password の入力ルール
                // v => !!v || "パスワードは必須項目です。",
                v => (v && v.length >= 8) || "パスワードは8文字以上で入力してください。",
                v => (v && v.length <= 32) || "パスワードは32文字以内で入力してください。"
            ],
            showConfirm: false
        }
    },
    computed: {
        editer: function(){ // 修正確認UIの表示判定
            return (this.stepData[0].edit || this.stepData[1].edit || this.stepData[2].edit) && this.showConfirm
        },
    },
    methods: {
        editUserInformation: function() { // edit user information関数

            // backendのデータの修正処理
            editUser(this.user.email,this.model.edit_email,this.model.edit_password,this.model.edit_username)
                .then(res => {
                    if (res.success) {
                        // 修正成功時にvuexの中身を書き換える
                        const userData = new User(this.$store.state.userData.userId,
                                                !this.model.edit_username ? this.$store.state.userData.userName : this.model.edit_username,
                                                !this.model.edit_email ? this.$store.state.userData.email : this.model.edit_email,
                                                null,
                                                this.$store.state.userData.university
                                                )

                        this.$store.commit("login", userData)
                        this.reLoad()
                    } else {
                        this.editSuccessed = false;
                    }
                });
        },

        skipPage: function(value){
            // 修正をスキップする関数
            // [SKIP]ボタンを押したときに起動
            this.stepData[value-1].edit = false
            this.editSuccessed = true;
            if((this.stepData[0].edit || this.stepData[1].edit || this.stepData[2].edit)&&this.state==3){
                this.showConfirm = true;
            }else if(this.state!=3){
                this.state = value+1
            }else{
                alert('変更項目が1つもありません')
            }
        },

        continuePage: function(value){
            // 修正項目を入力した後に次のステップに遷移する関数
            // [Continue]ボタンを押したときに起動
            if(value==1 && this.$refs.loginFormName.validate()){
                this.stepData[value-1].edit = true
                this.state = value+1
            }
            else if(value==2 && this.$refs.loginFormEmail.validate()){
                this.stepData[value-1].edit = true
                this.state = value+1
            }
            else if(value==3 && this.$refs.loginForm.validate()){
                this.stepData[value-1].edit = true
                // this.state = value+1
                this.editSuccessed = true;
                this.showConfirm = true;
            }
            else {
                // Debag
                alert('修正内容を入力して下さい')
                console.log("(Debug)failed to continue")
            }       
        },
        backPage: function(value){
            // 前のステップに遷移する関数
            // [BACK]ボタンを押したときに起動
            this.state = value-1
        },
        reLoad: function () {
            // ページをリロードする関数
            this.$router.go({path: this.$router.currentRoute.path, force: true})
        },
        activate: function(){
            this.showDialog = true;
        },
        cancel: function(){
            this.editSuccessed = false;
            this.showConfirm = false;
        },
    },
}
</script>

