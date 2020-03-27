import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase"

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Categories from "../views/Categories"
import DetailRecord from "../views/DetailRecord"
import History from "../views/History"
import Planning from "../views/Planning"
import Profile from "../views/Profile"
import Record from "../views/Record"
import Register from "../views/Register"

Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'Login',
    meta: {layout: 'empty'},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {layout: 'empty'},
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main', auth: true},
    component: Home, Login, Categories, DetailRecord, History, Planning, Profile, Record, Register
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Categories.vue')
  },
  {
    path: '/detail/:id',
    name: 'DetailRecord',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/DetailRecord.vue')
  },
  {
    path: '/history',
    name: 'History',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/History.vue')
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Planning.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {layout: 'main', auth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/record',
    name: 'Record',
    meta: {layout: 'main'},
    component: () => import(/* webpackChunkName: "about" */ '../views/Record.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

//Защита роута, прикольно

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if(requireAuth && !currentUser){
    next('/login?message=login')
  }else {
    next()
  }
})

export default router
