import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 侧边栏数据
    leftList: JSON.parse(localStorage.getItem('leftList')) || [],
    // 用户名
    userName: localStorage.getItem('userName') || ''
  },
  mutations: {
    setLeftList(state, data) {
      state.leftList = data
      localStorage.setItem('leftList', JSON.stringify(data))
    },
    setUserName(state, data) {
      state.userName = data
      localStorage.setItem('userName', data)
    }
  },
  actions: {
  },
  modules: {
  }
})
