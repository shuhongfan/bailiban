import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: 0,
    userInfo: {}
  },
  mutations: {
    setUserId (state, id) {
      state.userId = id
    },
    setUserInfo (state, info) {
      state.userInfo = info
    }
  },
  actions: {
  },
  modules: {
  }
})
