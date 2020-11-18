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
                        :key="value"
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
                            <v-text>
                                ユーザー名
                            </v-text>

                            <v-text-field label="変更後のユーザー名"
                                prepend-icon="mdi-human"
                                v-model="model.username"
                                :rules="usernameRules"
                                :counter="128"/>
                            
                        </v-form>
                    </v-card-text>

                    <v-btn
                    color="primary"
                    @click="nextPage(1)"
                    >
                    Continue
                    </v-btn>

                    <v-btn 
                    text
                    @click="NotChange(1)"
                    >
                    Skip
                    </v-btn>
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
                            <v-text>
                                メールアドレス
                            </v-text>

                            <v-text-field label="現在のメールアドレスを入力"
                                prepend-icon="mdi-email"
                                v-model="model.email" 
                                :counter="128"
                                :rules="emailRules"
                                />
                            <v-text-field label="変更後のメールアドレス"
                                prepend-icon="mdi-email"
                                v-model="model.email_edit" 
                                :counter="128"
                                :rules="emailRulesEdit"
                                />

                        </v-form>
                    </v-card-text>
                    <v-spacer/>
                    <v-btn
                    color="primary"
                    @click="nextPage(2)"
                    >
                    Continue
                    </v-btn>

                    <v-btn 
                    text
                    @click="NotChange(2)"
                    >
                    Skip
                    </v-btn>
                    <v-btn 
                    text
                    @click="backPage(2)"
                    >
                    Back
                    </v-btn>
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
                            <v-text>
                                パスワード
                            </v-text>
                            <v-text-field label="現在のパスワードを入力"
                                prepend-icon="mdi-lock" 
                                v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
                                v-bind:type="showPassword ? 'text' : 'password'" 
                                @click:append="showPassword = !showPassword"
                                v-model="model.password"
                                :counter="32"
                                :rules="passwordRules"
                                />

                            <v-text-field label="変更後のパスワード"
                                prepend-icon="mdi-lock" 
                                v-bind:append-icon="showPasswordEdit ? 'mdi-eye' : 'mdi-eye-off'" 
                                v-bind:type="showPasswordEdit ? 'text' : 'password'" 
                                @click:append="showPasswordEdit = !showPasswordEdit"
                                v-model="model.password_edit"
                                :counter="32"
                                :rules="passwordRulesEdit"
                                />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                        color="primary"
                        @click="nextPage(3)"
                        >
                        Continue
                        </v-btn>

                        <v-btn 
                        text
                        @click="NotChange(3)"
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

                            <!-- ユーザー名変更 -->
                            <v-text>
                                本当に修正しますか？
                            </v-text>
                            
                        </v-form>
                    </v-card-text>

                    <v-btn
                    color="primary"
                    @click="register"
                    >
                    Edit
                    </v-btn>

                    <v-btn 
                    text
                    @click="backPage(4)"
                    >
                    Back
                    </v-btn>

                    <v-btn 
                    text
                    @click="backPage(4)"
                    >
                    Cancel
                    </v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-container>
    
</template>

<script>
export default {
    props: {
        user: null
    },
    data: function() {
        return {
            state: null, // 修正UIの状態(1~4で遷移)
            showDialog: true, // trueで修正UIを表示
            model: {}, // UserProfile.vueに送る関数
            showPassword : false, // trueで修正前パスワード表示
            showPasswordEdit : false, // trueで修正後パスワード表示
            stepData: [ // 各ステップで使用する変数を格納する配列
                { name: "Username", edit: false},
                { name: "Email", edit: false},
                { name: "Password", edit: false},
            ],

            // 以下、修正入力上のルール設定
            usernameRules: [
                v => !!v || "ユーザ名は必須項目です。",
                v => (v && v.length <= 32) || "ユーザ名は32文字以内で入力してください。",
            ],
            emailRules: [
                v => !!v || "メールアドレスは必須項目です。",
                v => (v && v == this.user.mail) || "メールアドレスが違います。"
            ],
            emailRulesEdit: [
                v => !!v || "メールアドレスは必須項目です。",
                v => (v && v.length <= 128) || "メールアドレスは128文字以内で入力してください。",
                v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || "メールアドレスの形式が正しくありません。"
            ],
            passwordRules: [
                v => !!v || "パスワードは必須項目です。",
                v => (v && v == this.user.password) || "パスワードが違います。"
            ],
            passwordRulesEdit: [
                v => !!v || "パスワードは必須項目です。",
                v => v.length >= 8 || "パスワードは8文字以上で入力してください。",
                v => (v && v.length <= 32) || "パスワードは32文字以内で入力してください。"
            ],
        }
    },

    methods: {
        initialState: function() {
            // 初期化関数
            this.showDialog= true
            this.stepData[0].edit= false,
            this.stepData[1].edit= false
            this.stepData[2].edit= false
            this.model= {
                username : "",
                username_edit : "",
                email : "",
                email_edit: "",
                password : "",
                password_edit : "",
                edit: false,
            }
        },
        register: function() {
            // 修正情報を登録する関数
            if(this.check_database()) {
                this.edit_account()
                this.model.edit_username = this.stepData[0].edit
                this.model.edit_email = this.stepData[1].edit
                this.model.edit_password = this.stepData[2].edit
                this.$emit('close',this.model) // 親コンポーネントへ変数を渡す処理
            }
            else {
                console.log("failed to send database")
            }
        },

        check_database: function() {
            //TODO: アカウントを修正できるか確認
            return true
        },

        edit_account: function() {
            //TODO: アカウントを修正する処理
            console.log("edit_account_")
            
        },

        closeCard: function(){
            // 修正UIを閉じる関数
            this.$emit('close',this.model)
        },

        NotChange: function(value){
            // 修正をスキップする関数
            this.state = value+1
            this.stepData[value-1].edit = false
        },

        nextPage: function(value){
            // 修正項目を入力した後に次のステップに遷移する関数
            if(value==1 && this.$refs.loginFormName.validate()){
                this.stepData[value-1].edit = true
                this.state = value+1
            }
            if(value==2 && this.$refs.loginFormEmail.validate()){
                this.stepData[value-1].edit = true
                this.state = value+1
            }
            if(value==3 && this.$refs.loginForm.validate()){
                this.stepData[value-1].edit = true
                this.state = value+1
            }
            else {
                // Debag
                console.log("failed to continue")
            }       
        },

        backPage: function(value){
            // 前のステップに遷移する関数
            this.state = value-1
        }
        
    }
    
}
</script>