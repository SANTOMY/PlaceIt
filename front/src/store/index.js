import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


const state = {
    isLoginState: false
}

const mutations =  {
    login(state) {
        state.isLoginState = true
    },
    logout(state) {
        state.isLoginState = false
    }
}

// Storeを生成
const store = new Vuex.Store({
    state,
    mutations
});
export default store;