<template>
    
    <v-card
        width="400px" 
        class="mx-auto mt-5"
        v-bind:v-model="editer"
    >
        <v-app-bar>
            修正メニュー
            <v-spacer/>
            <v-btn>
                <v-icon red @click='closeCard'>
                    mdi-close-circle-outline
                </v-icon>
            </v-btn>
        </v-app-bar>


        <v-card-text>
            <v-form ref="loginForm">

                <!-- ユーザー名変更 -->
                <v-text v-if='editUserName'>
                    ユーザー名
                </v-text>

                <v-text-field label="変更後のユーザー名"
                    prepend-icon="mdi-human"
                    v-model="model.username"
                    :rules="usernameRules"
                    v-if='editUserName'
                    :counter="128"/>
                
                <v-card-actions v-if='editUserName'>
                    <v-spacer/>
                    <v-btn @click="NotChange(1)">変更しない</v-btn>
                </v-card-actions>

                <!-- メールアドレス変更 -->
                <v-text v-if='editEmail'>
                    メールアドレス
                </v-text>

                <v-text-field label="現在のメールアドレスを入力"
                    prepend-icon="mdi-email"
                    v-model="model.email" 
                    :counter="128"
                    :rules="emailRules"
                    v-if='editEmail'/>
                <v-text-field label="変更後のメールアドレス"
                    prepend-icon="mdi-email"
                    v-model="model.email_edit" 
                    :counter="128"
                    :rules="emailRules2"
                    v-if='editEmail'/>

                <v-card-actions v-if='editEmail'>
                    <v-spacer/>
                    <v-btn @click="NotChange(2)">変更しない</v-btn>
                </v-card-actions>

                <!-- パスワード変更-->
                <v-text v-if='editpassword'>
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
                    v-if='editpassword'/>

                <v-text-field label="変更後のパスワード"
                    prepend-icon="mdi-lock" 
                    v-bind:append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'" 
                    v-bind:type="showPassword2 ? 'text' : 'password'" 
                    @click:append="showPassword2 = !showPassword2"
                    v-model="model.password_edit"
                    :counter="32"
                    :rules="passwordRules2"
                    v-if='editpassword'/>
                
                <v-card-actions v-if='editpassword'>
                    <v-spacer/>
                    <v-btn @click="NotChange(3)">変更しない</v-btn>
                </v-card-actions>

                <!-- 修正実行ボタンとクリアボタン -->
                <v-card-actions>
                    <v-spacer/>
                    <v-btn @click="initialState">Clear</v-btn>
                    <v-btn @click="register">修正</v-btn>
                </v-card-actions>

            </v-form>
        </v-card-text>
    </v-card>
    
</template>

<script>
export default {
    props: {
        user: null
    },
    data: function() {
        return {
            editer: true,
            editUserName: true,
            editEmail: true,
            editpassword: true,
            model: {},
            showPassword : false,
            showPassword2 : false,
            usernameRules: [
                v => !!v || "ユーザ名は必須項目です。",
                v => (v && v.length <= 32) || "ユーザ名は32文字以内で入力してください。",
            ],
            emailRules: [
                v => !!v || "メールアドレスは必須項目です。",
                v => (v && v == this.user.mail) || "メールアドレスが違います。"
            ],
            emailRules2: [
                v => !!v || "メールアドレスは必須項目です。",
                v => (v && v.length <= 128) || "メールアドレスは128文字以内で入力してください。",
                v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || "メールアドレスの形式が正しくありません。"
            ],
            passwordRules: [
                v => !!v || "パスワードは必須項目です。",
                v => (v && v == this.user.password) || "パスワードが違います。"
            ],
            passwordRules2: [
                v => !!v || "パスワードは必須項目です。",
                v => (v && v.length <= 32) || "パスワードは32文字以内で入力してください。"
            ],
        }
    },
    mounted(){
        this.initialState()
    },
    methods: {
        initialState: function() {
                this.editer= true
                this.editUserName= true,
                this.editEmail= true
                this.editpassword= true
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
            if (this.$refs.loginForm.validate()) {
                if(this.check_database()) {
                    this.edit_account()
                    this.model.edit_username = this.editUserName
                    this.model.edit_email = this.editEmail
                    this.model.edit_password = this.editpassword
                    this.$emit('close',this.model)
                    
                    // this.$router.push('/user')
                }
                else {
                    console.log("failed to send database")
                    
                }
            }
            else {
                console.log("failed to register")
            }

        },

        check_database: function() {
            //TODO: アカウントを作成できるか確認
            return true
        },

        edit_account: function() {
            //TODO: アカウントを作成する処理
            console.log("edit_account")
            
        },

        closeCard: function(){
            console.log('close')
            
            this.$emit('close',this.model)
            // this.$router.push('../user')
        },

        NotChange: function(value){
            if(value==1){
                this.editUserName = false
            }
            else if(value==2){
                this.editEmail = false
            }            
            else if(value==3){
                this.editpassword = false
            }        
        },
    
    }
    
}
</script>