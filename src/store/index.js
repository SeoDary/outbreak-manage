import Vue from 'vue'
import Vuex from 'vuex'
import news from './news/index.js'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    news,//新闻
  }
})
