<template>
  <section class="comic">
    <b-navbar id="rss-nav" toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand v-on:click="update()">{{ this.$store.state.data.title }}</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="https://github.com/feilongfl/Cimoc">
            <b-img
              src="https://camo.githubusercontent.com/69b991d1e0f31d6bb3e984495ca0cdb21ac41d38/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f72656c656173652f6665696c6f6e67666c2f43696d6f632e737667"></b-img>
          </b-nav-item>

          <!--<b-nav-item href="#">{{ this.$store.state.pubDate }}</b-nav-item>-->
          <b-nav-item-dropdown text="IPFS Server" right>
            <b-dropdown-item v-on:click="changeIpfsServer('https://feilong.ml/comic.json')">Cloudflare</b-dropdown-item>
            <b-dropdown-item v-on:click="changeIpfsServer('https://ipfs.io/ipns/feilong.ml/comic.json')">ipfs.io
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <!--<b-nav-item href="#">{{ data.description }}</b-nav-item>-->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div id="rss-body">
      <b-list-group>
        <div v-for="item in this.$store.state.data.items" :key="item.link">
          <b-list-group-item :href="item.link" class="d-flex justify-content-between align-items-center">
            <b-media>
              <!--<b-img slot="aside" height="240" width="160" alt="placeholder" :src="item.cover" />-->
              <b-img-lazy rounded slot="aside" height="200" width="160" alt="img" blank-src="/icon.png"
                          :src="item.cover"/>
              <h5 class="mt-0">{{ item.title }}</h5>
              <b-badge v-if="item.category === 'manhuagui'" variant="primary" pill>{{ item.category }}</b-badge>
              <b-badge v-else-if="item.category === '57comic'" variant="success" pill>{{ item.category }}</b-badge>
              <b-badge v-else-if="item.category === 'tencent'" variant="warning" pill>{{ item.category }}</b-badge>
              <b-badge v-else-if="item.category === 'pufei'" variant="danger" pill>{{ item.category }}</b-badge>
              <b-badge v-else-if="item.category === 'webtoons'" variant="primary" pill>{{ item.category }}</b-badge>
              <b-badge v-else variant="secondary" pill>{{ item.category }}</b-badge>
              <p>
                {{ item.pubDate }}
                <!--{{item.description}}-->
              </p>
            </b-media>
          </b-list-group-item>
        </div>
        <div>
          <b-list-group-item v-on:click="update()"
                             class="d-flex justify-content-between align-items-center">
            <b-media>
              <h5 class="mt-0">End</h5>
            </b-media>
          </b-list-group-item>
        </div>
      </b-list-group>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'

  export default {
    mounted(){
      this.update()
    },
    methods: {
      changeIpfsServer(url) {
        this.$store.commit('setUrl', url)
      },
      async update() {
        let {data} = await axios.get(this.$store.state.url);
        data.refershDate = Date.now();
        this.$store.commit('setData', data);
      }
    }
  }
</script>
