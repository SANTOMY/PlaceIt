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
                <v-text-field label="変更後のユーザー名"
                    prepend-icon="mdi-human"
                    v-model="model.username" 
                    :counter="128"/>

                <v-text v-if='editmail'>
                    メールアドレス
                </v-text>

                <v-text-field label="現在のメールアドレスを入力"
                    prepend-icon="mdi-email"
                    v-model="model.email" 
                    :counter="128"
                    :rules="emailRules"
                    v-if='editmail'/>
                <v-text-field label="変更後のメールアドレス"
                    prepend-icon="mdi-email"
                    v-model="model.email_edit" 
                    :counter="128"
                    :rules="emailRules2"
                    v-if='editmail'/>

                <v-card-actions v-if='editmail'>
                    <v-spacer/>
                    <v-btn v-if="editpassword" @click="changeEmail">変更しない</v-btn>
                    <v-btn v-if="!editpassword" @click="changeEmail">パスワードを変更</v-btn>
                    <v-btn @click="register">修正</v-btn>
                </v-card-actions>
                                
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
                    <v-btn @click="initialState">Clear</v-btn>
                    <v-btn v-if="editmail" @click="changePassword">変更しない</v-btn>
                    <v-btn v-if="!editmail" @click="changePassword">メールアドレスを変更</v-btn>
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
            editmail: true,
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
                this.editmail= true
                this.editpassword= true
                this.model= {
                    username : "",
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
                    this.create_account()
                    this.model.edit_email = this.editmail
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

        create_account: function() {
            //TODO: アカウントを作成する処理
            console.log("create_account")
            
        },

        closeCard: function(){
            console.log('close')
            
            this.$emit('close',this.model)
            // this.$router.push('../user')
        },

        changeEmail: function(){
            this.editmail = false
            this.editpassword = true
        },

        changePassword: function(){
            this.editpassword = false
            this.editmail = true
        }
    

    }
    
}
</script>