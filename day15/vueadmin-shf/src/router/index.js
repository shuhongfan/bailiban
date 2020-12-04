import Vue from 'vue'
import VueRouter from 'vue-router'

import Info from '@/components/Info/Info'
import Login from '@/components/Login/Login'
import Register from '@/components/Register/Register'
import Video from '../components/Video/Video'
import Test from '../components/Test/Test'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: Login
  },
  {
    path: '/info',
    name: 'Info',
    component: Info
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/video',
    name: 'Video',
    component: Video
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }
]

const router = new VueRouter({
  routes
})

export default router
