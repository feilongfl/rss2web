import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    url: "https://feilong.ml/comic.json",
    data: {
      title: "comic",
      pubDate: "null",
      items: []
    }
  },
  mutations: {
    setUrl(state, url) {
      state.url = url;
    },
    setData(state, data) {
      state.data = data;
    }
  }
});

export default store
