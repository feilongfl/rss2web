import Vue from 'vue'
import Vuex from 'vuex'
import LZString from 'lz-string'

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
      var readedUrl = state.data.items.filter(
        (item) => {
          return item.readed;
        }
      ).map((item) => {return item.link});
      data.items.forEach(
        (item) => {
          item.readed = readedUrl.includes(item.link);
        }
      );
      state.data = data;
    },
    setDataLZ(state, lzdata) {
      const data = LZString.decompressFromUTF16(lzdata);
      console.log("xzdata -> ", typeof (lzdata), lzdata);
      console.log("data -> ", data);
      // var readedUrl = state.data.items.filter(
      //   (item) => {
      //     return item.readed;
      //   }
      // ).map((item) => {return item.link});
      // data.items.forEach(
      //   (item) => {
      //     item.readed = readedUrl.includes(item.link);
      //   }
      // );
      // state.data = data;
    },
    markRead(state, index) {
      state.data.items[index].readed = true;
    }
  }
});

export default store
