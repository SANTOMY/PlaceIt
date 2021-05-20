<template>
    <v-dialog v-model="showDialog" width="800">
        <template v-slot:activator="{ on, attrs }">
            <v-container>
                <v-row justify="center">
                    <v-col cols="6">
                        <v-btn class="px-5 py-6" v-bind="attrs" v-on="on" color="red">
                            <h3>ユーザ削除</h3>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </template>
        
        <v-card class="px-5" v-if='!passwordConfirm'>
            <v-container>
                <v-row>
                    <v-col>
                        <v-title class="mb-5"><h1>あなたのデータを削除</h1></v-title>
                            あなたのパスワードを入力してください
                        <v-form>
                            <v-text-field label=""
                                prepend-icon="mdi-lock" 
                                v-model="password"
                                :counter="32"
                                :rules="passwordRules"
                            />
                            <v-btn 
                                block
                                class="pa-5"
                                @click="confirm()"
                            >
                                <h3>送信</h3>
                            </v-btn>
                        </v-form>
                    </v-col>
                </v-row>
            </v-container> 
        </v-card>
        <v-card class="px-5" v-if='password !=="" && passwordConfirm'>
            <v-container>
                <v-row justify="center">
                    <v-col cols="6">
                        <h1>本当に削除しますか？</h1>
                        あなたはログインできなくなります
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="5">
                        <v-btn 
                            block
                            class="pa-5"
                            @click="cancel()" 
                        >
                            <h3>いいえ</h3>
                        </v-btn>
                    </v-col>
                    <v-col cols="5">
                        <v-btn 
                            block
                            class="pa-5" 
                            @click="deleteUser()"
                        >
                            <h3>はい</h3>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import {deleteUser} from '../../routes/userRequest'
export default {
    data: function() {
        return {
            deleteSuccess: true, 
            showDialog: true,
            password : "",
            passwordConfirm : false,
            //TODO：ログインのパスワードにルールがついてないので、ここにつけてもうまく機能しない
            // passwordRules: [ // password の入力ルール
            //     v => !!v || "パスワードは必須項目です。",
            //     v => (v && v.length >= 8) || "パスワードは8文字以上で入力してください。",
            //     v => (v && v.length <= 32) || "パスワードは32文字以内で入力してください。"
            // ],
        }
    },

    methods: {
        deleteUser: function() {

            deleteUser(this.$store.state.userData.userId, this.password)
                .then(res => {
                    if (!res.success) 
                        this.deleteSuccess = false;
                    else
                        alert("正常にユーザを削除しました")
                }).catch((exception=>{
                    alert(exception)
                }));
            this.closeCard();
            this.logout();
        },

        confirm: function(){
            this.$emit('password', this.password);
            this.passwordConfirm = true;
            
        },

        cancel: function() {  
            this.password = "";
            this.passwordConfirm = false;
            this.closeCard();
        },

        closeCard: function(){
            this.showDialog = false
            this.$emit('close')
        },

        reLoad: function () {
            this.$router.go({path: this.$router.currentRoute.path, force: true})
        },

        logout() {
            this.$store.commit("logout")
            if (this.$route.path != '/map'){
                this.$router.push('/map')
            }
        }
        
    }
    
}
</script>