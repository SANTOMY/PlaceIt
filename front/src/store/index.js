import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Storeを生成
const store = new Vuex.Store({
    state: {
        isLoginState: false
    },
    
    mutations: {
        login() {
            this.isLoginState = true
        },
        logout() {
            this.isLoginState = false
        }
    }
});
export default store;