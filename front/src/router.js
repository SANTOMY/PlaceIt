import Vue from 'vue'
import Router from 'vue-router'
import Signup from './components/Signup/Signup.vue'
import Login from './components/Login/Login.vue'
import UserProfile from './components/UserProfile/UserProfile.vue'
import Map from './components/Map/Map.vue'
import SpotRegister from './components/SpotRegister/SpotRegister.vue'


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
        path: '/register',
        name: 'register',
        component: SpotRegister
      },
  ]
})