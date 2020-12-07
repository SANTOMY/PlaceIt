<template>
<v-app>
    <v-card width="400px" class="mx-auto mt-5">
        <v-card-title>
            <h1 class="display-1">ログイン</h1>
        </v-card-title>
        <v-card-text>
            <v-form ref="loginForm">

                <v-text-field label="メールアドレス"
                    prepend-icon="mdi-email"
                    v-model="model.email" 
                    :counter="128"
                    :rules="emailRules"/>

                <v-text-field label="パスワード"
                    prepend-icon="mdi-lock" 
                    v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
                    v-bind:type="showPassword ? 'text' : 'password'" 
                    @click:append="showPassword = !showPassword"
                    v-model="model.password"
                    :counter="32"
                    :rules="passwordRules" />
                    
                <v-card-actions>
                    <v-btn @click="login">ログイン</v-btn>
                </v-card-actions>
                <v-card-actions>
                    <v-btn @click="logout">ログアウト</v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
</v-app>
</template>

<script>
import {login1} from '../../routes/userRequest'
export default {

    data: function() {
        return {
            model: {
                email : "",
                password : "",
            },

            showPassword : false,

            emailRules: [
                v => !!v || "メールアドレスは必須項目です。",
                v => (v && v.length <= 128) || "メールアドレスは128文字以内で入力してください。",
                v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || "メールアドレスの形式が正しくありません。"
            ],
            passwordRules: [
                v => !!v || "パスワードは必須項目です。",
                v => (v && v.length <= 32) || "パスワードは32文字以内で入力してください。"
            ],
        }
    },

    methods: {
        login: function() {
            if (!this.$refs.loginForm.validate()) return;
            login1(this.model.email, this.model.password)
                .then(res => {
                    console.log(res)
                    const userData = {"email":res.data.email, "password":res.data.password}
                    this.$store.commit("login", userData)
                    this.$router.push('/map')
                })
        },

        check_database: function() {
            //TODO: ログインできるか確認
            login1(this.email, this.password)
                .then(res => {
                    console.log(res)
                    this.$store.commit("login", res)
                    this.$router.push('/map')
                });
            return true
        },

        logout() { //ほんとはいらないけどデバッグ用として...
            this.$store.commit("logout")
            this.$router.push('/map')
        }
    }
    
}
</script>