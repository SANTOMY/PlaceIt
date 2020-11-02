import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

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
    state: state,
    mutations: mutations,
    plugins: [createPersistedState()]
});
export default store;