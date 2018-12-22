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
      // for (index in data){
      //   data[index].readed = false;
      // }
      Object.assign(data, state.data);
      // state.data = data;
    },
    markRead(state, index) {
      state.data.items[index].readed = true;
    }
  }
});

export default store
