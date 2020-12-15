<template>
    <v-container
        v-bind:v-model="showDialog"
    >
        <v-stepper 
            v-model="state"
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

                    <v-divider :key="index"/>
                </template>

                <v-stepper-step 
                    step="4">
                    Edit Finish
                </v-stepper-step>
            </v-stepper-header>
<!--------------------------------ステップ1--------------------------------------------->
<!-- 同様処理を複数回行っているところが複数箇所あるため、今後プログラムを短くする予定です。。。 -->
            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card
                        width="400px" 
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
                        <v-btn>
                            <v-icon red @click='closeCard'>
                                mdi-close-circle-outline
                            </v-icon>
                        </v-btn>
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
                        <v-spacer/>
                        <v-btn>
                            <v-icon red @click='closeCard'>
                                mdi-close-circle-outline
                            </v-icon>
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
                        <v-spacer/>
                        <v-btn>
                            <v-icon red @click='closeCard'>
                                mdi-close-circle-outline
                            </v-icon>
                        </v-btn> 
                    </v-card-actions>   
                </v-stepper-content>
<!--------------------------------ステップ4--------------------------------------------->
                <v-stepper-content step="4">
                    <v-card
                        width="400px" 
                        class="mx-auto mt-5"
                    ></v-card>
                    <v-card-text>
                        <v-form ref="loginForm1">
                            本当に修正しますか？
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                        color="primary"
                        @click="editUserInformation"
                        >
                        Edit
                        </v-btn>

                        <v-btn 
                        text
                        @click="backPage(4)"
                        >
                        Back
                        </v-btn>

                        <v-spacer/>
                        <v-btn>
                            <v-icon red @click='closeCard'>
                                mdi-close-circle-outline
                            </v-icon>
                        </v-btn> 
                    </v-card-actions>
                    <v-alert
                        dense
                        type="error"
                        class="mt-7"
                        v-if="!editSuccessed"
                    >
                        編集できませんでした
                    </v-alert>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-container>
    
</template>

<script>
import {editUser} from '../../routes/userRequest'
export default {
    props: {
        user: null
    },
    data: function() {
        return {
            state: null, // 修正UIの状態(1~4で遷移)
            showDialog: true, // trueで修正UIを表示
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
                v => !!v || "ユーザ名は必須項目です。",
                v => (v && v.length <= 32) || "ユーザ名は32文字以内で入力してください。",
            ],
            emailRulesEdit: [ // emailの入力ルール
                v => !!v || "メールアドレスは必須項目です。",
                v => (v && v.length <= 128) || "メールアドレスは128文字以内で入力してください。",
                v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || "メールアドレスの形式が正しくありません。"
            ],
            passwordRulesEdit: [ // password の入力ルール
                v => !!v || "パスワードは必須項目です。",
                v => (v && v.length >= 8) || "パスワードは8文字以上で入力してください。",
                v => (v && v.length <= 32) || "パスワードは32文字以内で入力してください。"
            ],
        }
    },

    methods: {
        editUserInformation: function() { // edit user information関数
            // Debug //
            console.log(this.user.email); // 変更前のemail
            console.log(this.model.edit_email); // 変更後のemail
            console.log(this.model.edit_password); // 変更後のpassword
            console.log(this.model.edit_username); // 変更後のusername

            // backendのデータの修正処理
            editUser(this.user.email,this.model.edit_email,this.model.edit_password,this.model.edit_username)
                .then(res => {
                    if (res.success) {
                        // 修正成功時にvuexの中身を書き換える
                        const userData = {  "id":this.$store.state.userData.id,
                                            "email":!this.model.edit_email ? this.$store.state.userData.email : this.model.edit_email,
                                            "password":!this.model.edit_password ? this.$store.state.userData.password : this.model.edit_password,
                                            "username":!this.model.edit_username ? this.$store.state.userData.username : this.model.edit_username
                                         }
                        this.$store.commit("login", userData)
                        this.reLoad() 
                    } else {
                        this.editSuccessed = false;
                        //this.closeCard()
                    }
                });
        },

        closeCard: function(){
            // 修正UIを閉じる関数
            // this.reLoad()
            this.showDialog = false
            this.$emit('close')

        },

        skipPage: function(value){
            // 修正をスキップする関数
            this.state = value+1
            this.stepData[value-1].edit = false
            this.editSuccessed = true;
        },

        continuePage: function(value){
            // 修正項目を入力した後に次のステップに遷移する関数
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
                this.state = value+1
                this.editSuccessed = true;
            }
            else {
                // Debag
                console.log("(Debug)failed to continue")
            }       
        },

        backPage: function(value){
            // 前のステップに遷移する関数
            this.state = value-1
        },
        reLoad: function () {
            this.$router.go({path: this.$router.currentRoute.path, force: true})
        }
        
    }
    
}
</script>