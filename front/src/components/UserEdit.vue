<template>
    <v-container
        v-bind:v-model="showDialog"
    >
        <v-stepper 
            v-model="state"
        >
<!-----------------------ヘッダー(step1)------------------------------------------------->
<!-- 同様処理を複数回行っているところが複数箇所あるため、今後プログラムを短くする予定です。。。 -->
            <v-stepper-header>
                <v-stepper-step
                    editable
                    :rules="[() => false]"
                    step="1"
                    v-if="!editUserName"
                >
                    User Name
                </v-stepper-step>
                <v-stepper-step
                    complete
                    :rules="[() => true]"
                    step="1"
                    v-if="editUserName"
                >
                    User Name
                </v-stepper-step>

                <v-divider></v-divider>
<!-----------------------ヘッダー(step2)------------------------------------------------->

                <v-stepper-step
                    v-if="!editEmail"
                    editable
                    :rules="[() => false]"
                    step="2"
                >
                    Email
                </v-stepper-step>

                <v-stepper-step
                    v-if="editEmail"
                    complete
                    :rules="[() => true]"
                    step="2"
                >
                    Email
                </v-stepper-step>

                <v-divider></v-divider>
<!-----------------------ヘッダー(step3)------------------------------------------------->
                <v-stepper-step 
                    editable
                    :rules="[() => false]"
                    v-if="!editpassword"
                    step="3">
                    
                    Password
                </v-stepper-step>

                <v-stepper-step 
                    complete
                    :rules="[() => true]"
                    v-if="editpassword"
                    step="3">
                    
                    Password
                </v-stepper-step>

                <v-divider></v-divider>
<!-----------------------ヘッダー(step4)------------------------------------------------->
                <v-stepper-step 
                    step="4">
                    
                    Edit Finish
                </v-stepper-step>
            </v-stepper-header>
<!--------------------------------メイン(step1)--------------------------------------------->
            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card
                        width="400px" 
                        class="mx-auto mt-5"
                    ></v-card>
                    <v-card-text>
                        <v-form ref="loginForm1">

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
<!--------------------------------メイン(step2)--------------------------------------------->
                <v-stepper-content step="2">
                    <v-card
                        width="400px" 
                        class="mx-auto mt-5"
                    ></v-card>

                    <v-card-text>
                        <v-form ref="loginForm2">

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
<!--------------------------------メイン(step3)--------------------------------------------->
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
<!--------------------------------メイン(step4)--------------------------------------------->
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
            editUserName: false, // trueでユーザー名修正 
            editEmail: false, // trueでEmail修正 
            editpassword: false, // trueでパスワード修正 
            model: {}, // UserProfile.vueに送る関数
            showPassword : false, // trueで修正前パスワード表示
            showPasswordEdit : false, // trueで修正後パスワード表示
            
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
            this.editUserName= false,
            this.editEmail= false
            this.editpassword= false
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
                this.model.edit_username = this.editUserName
                this.model.edit_email = this.editEmail
                this.model.edit_password = this.editpassword
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
            console.log("send_edit_information")
            
        },

        closeCard: function(){
            // 修正UIを閉じる関数
            console.log('close') 
            this.$emit('close',this.model)
        },

        NotChange: function(value){
            // 修正をスキップする関数
            if(value==1){
                this.state = 2
                this.editUserName = false
            }
            else if(value==2){
                this.state = 3
                this.editEmail = false
            }            
            else if(value==3){
                this.state = 4
                this.editpassword = false
            }        
        },

        nextPage: function(value){
            // 修正項目を入力した後に次のステップに遷移する関数
            if(value==1 && this.$refs.loginForm1.validate()){
                this.editUserName = true
                console.log(this.editUserName)
                this.state = 2
            }
            else if(value==2 && this.$refs.loginForm2.validate()){
                this.editEmail = true
                this.state = 3
            }
            else if(value==3 && this.$refs.loginForm.validate()){
                this.editpassword = true
                this.state = 4
            }
            else {
                // Debag
                console.log("failed to continue")
            }       
        },

        backPage: function(value){
            // 前のステップに遷移する関数
            if(value==2){
                this.state = 1
            }
            else if(value==3){
                this.state = 2
            }
            else if(value==4){
                this.state = 3
            }
        }
        
    }
    
}
</script>