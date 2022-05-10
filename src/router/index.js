import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: function () {
      return import('../components/StartPage.vue');
    }
  },
  {
    path: '/main',
    name: 'main',
    component: function () {
      return import('../components/MainPage.vue');
    }
  },
  {
    path: '/login',
    name: 'login',
    component: function () {
      return import('../components/LoginPage.vue');
    }
  },
  {
    path: '/register',
    name: 'register',
    component: function () {
      return import('../components/RegisterPage.vue');
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
