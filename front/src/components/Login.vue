<template>
<v-app>
    <v-card width="400px" class="mx-auto mt-5">
        <v-card-title>
            <h1 class="display-1">ログイン</h1>
        </v-card-title>
        <v-card-text>
            <v-form ref="loginForm">

                <v-text-field label="メールアドレス"
                    prepend-icon="mdi-account-circle"
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
            </v-form>
        </v-card-text>
    </v-card>
</v-app>
</template>

<script>
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
            if (this.$refs.loginForm.validate()) {
                if(this.check_database()) {
                    this.$router.push('/map')
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
            //TODO: ログインできるか確認
            return true
        }
    }
    
}
</script>