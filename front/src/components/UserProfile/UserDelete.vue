<template>
    <v-dialog v-model="showDialog" width="800">
        <template v-slot:activator="{ attrs }">
            <v-container>
                <v-btn class="px-5 py-6c white--text" max-width="500px" v-bind="attrs" @click="activate()" color="red">
                    <h3>ユーザ情報削除</h3>
                </v-btn>
            </v-container>
        </template>
        
        <v-card class="px-5" v-if='!passwordConfirm && init_flag'>
            <v-skeleton-loader
                v-if="isLoading"
                type="image, article, article"
                class="mx-auto"
            ></v-skeleton-loader>
            <v-container>
                <v-row>
                    <v-col>
                        <v-title class="mb-5"><h1>あなたのデータを削除</h1></v-title>
                            あなたのパスワードを入力してください
                        <v-form @submit.prevent>
                            <v-text-field label=""
                                prepend-icon="mdi-lock" 
                                v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
                                v-bind:type="showPassword ? 'text' : 'password'" 
                                @click:append="showPassword = !showPassword"
                                v-model="password"
                                :counter="32"
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
        <v-card class="px-5" v-if='!isLoading && passwordConfirm'>
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
                            @click="deleteUserRun()"
                        >
                            <h3>はい</h3>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        <v-card class="px-5" v-if='!isLoading && !passwordConfirm && !init_flag'>
            <v-container>
                <v-row justify="center">
                    <v-col cols="6">
                        <h1>パスワードが違います</h1>
                        もう一度パスワードを入力して下さい
                        <v-form @submit.prevent>
                            <v-text-field label=""
                                prepend-icon="mdi-lock" 
                                v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
                                v-bind:type="showPassword ? 'text' : 'password'" 
                                @click:append="showPassword = !showPassword"
                                v-model="password"
                                :counter="32"
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
    </v-dialog>
</template>

<script>
import {deleteUser, confirmPassword} from '../../routes/userRequest'
export default {
    data: function() {
        return {
            init_flag: true,
            deleteSuccess: true, 
            showDialog: false,
            password : "",
            passwordConfirm : false,
            // TODO：ログインのパスワードにルールがついてないので、ここにつけてもうまく機能しない
            // passwordRules: [ // password の入力ルール
            //     v => !!v || "パスワードは必須項目です。",
            //     v => (v && v.length >= 8) || "パスワードは8文字以上で入力してください。",
            //     v => (v && v.length <= 32) || "パスワードは32文字以内で入力してください。"
            // ],
            showPassword : false,
            isLoading : false,
        }
    },

    methods: {
        deleteUserRun: function() {

            deleteUser(this.$store.state.userData.userId)
                .then(res => {
                    if (!res.success) {
                        this.deleteSuccess = false;
                        alert("削除に失敗しました");
                    }
                    else
                        alert("正常にユーザを削除しました");
                }).catch((exception=>{
                    alert(exception)
                }));
            this.closeCard();
            this.logout();
        },

        confirm: function(){
            this.isLoading = true;
            this.init_flag = false;
            this.$emit('password', this.password);
            confirmPassword(this.$store.state.userData.userId, this.password)
                .then(res=>{
                    this.isLoading = false;
                    if(!res.success)
                        alert(res.success)
                    else if(res.confirm)
                        this.passwordConfirm = true;
                    else if(!res.confirm)
                        this.passwordConfirm =false;
                }).catch((exception=>{
                    this.isLoading = false;
                    alert(exception);
                }));
        },

        activate: function(){
            this.showDialog = true;
        },

        cancel: function() {  
            this.password = "";
            this.passwordConfirm = false;
            this.init_flag = true;
            this.closeCard();
        },

        closeCard: function(){
            this.showDialog = false
            this.init_flag = true;
            this.$emit('close')
        },

        reLoad: function () {
            this.init_flag = true;
            this.passwordConfirm = false;
            this.password = "";
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