import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入cookie
import cookie from 'vue-cookie'

// 重置css样式
import 'normalize.css/normalize.css'

// 导入npress
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 导入moment
import moment from 'moment'

// 全局导入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.axios = axios

// axios request拦截器 展示进度条 NProgress.start()
axios.interceptors.request.use(
  (config) => { // 所有的请求都添加上请求头
    Nprogress.start()
    config.headers.token = localStorage.getItem('token') || ''
    console.log(config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// axios response拦截器 隐藏进度条 NProgress.done()
axios.interceptors.response.use(
  (response) => {
    Nprogress.done()
    const { code, msg } = response.data
    if (code === 500) {
      ElementUI.Message.error(msg)
      store.commit('setUserId', '')
      store.commit('setUserInfo', '')
      router.push('/login')
      return
    }
    if (response.config.url === '/user/login' && code === 200) { // 登录成功时，设置token
      localStorage.setItem('token', response.data.token)
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 定义时间过滤器
Vue.filter('dateformat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(dataStr).format(pattern)
})
Vue.filter('timeformat', (dataStr, pattern = 'mm:ss') => {
  return moment(dataStr).format(pattern)
})

Vue.prototype.$cookie = cookie

Vue.prototype.qs = qs

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
