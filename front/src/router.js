import Vue from 'vue'
import Router from 'vue-router'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import UserProfile from './components/UserProfile.vue'
import Map from './components/Map.vue'
import SpotDetail from './components/SpotDetail.vue'
import SpotRegister from './components/SpotRegister.vue'
import UserEdit from './components/UserEdit.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/user',
        name: 'user',
        component: UserProfile
    },
    {
        path: '/map',
        name: 'map',
        component: Map
    },
    {
        path: '/spot',
        name: 'spot',
        component: SpotDetail
    },
    {
        path: '/register',
        name: 'register',
        component: SpotRegister
    },
    {
      path: '/user/edit',
      name: 'user_edit',
      component: UserEdit
  },    

  ]
})