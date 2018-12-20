<template>
  <section class="comic">
    <b-navbar id="rss-nav" toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">{{ feed.title }}</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">{{ feed.pubDate }}</b-nav-item>
          <!--<b-nav-item href="#">{{ data.description }}</b-nav-item>-->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div id="rss-body">
      <b-list-group v-for="item in data.items" :key="item.link">
        <b-list-group-item :href="item.link" class="d-flex justify-content-between align-items-center">
            <b-media>
              <b-img slot="aside" height="240" width="160" alt="placeholder" :src="item.cover" />
              <h5 class="mt-0">{{ item.title }}</h5>
              <b-badge v-if="item.category === 'manhuagui'" variant="primary" pill>{{ item.category }}</b-badge>
              <b-badge v-if="item.category === '57comic'" variant="success" pill>{{ item.category }}</b-badge>
              <b-badge v-if="item.category === 'tencent'" variant="warning" pill>{{ item.category }}</b-badge>
              <b-badge v-if="item.category === 'pufei'" variant="danger" pill>{{ item.category }}</b-badge>
              <p>
                {{ item.pubDate }}
                <!--{{item.description}}-->
              </p>
            </b-media>

        </b-list-group-item>
      </b-list-group>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'

  const url = `https://feilong.ml/comic.json`;
  const type = "json";

  var feed = {
    url: url,
    type: type,
    title: "feilong",
    pubDate: Date.now().toString(),
    items: {}
  };

  export default {
    data() {
      return {feed: feed};
    },
    async asyncData({query}) {
      console.log(query);
      feed.url = ("url" in query) ? query.url : feed.url;
      feed.type = ("type" in query) ? query.type : feed.type;
      feed.title = ("title" in query) ? query.title : feed.title;
      feed.pubDate = ("pubDate" in query) ? query.pubDate : feed.pubDate;
      console.log('feed -> ', feed);
      let {data} = await axios.get(feed.url);
      feed.title = ("title" in data) ? data.title : feed.title;
      feed.pubDate = ("pubDate" in data) ? data.pubDate : feed.pubDate;
      switch (feed.type) {
        case "json":
          feed.items = ("items" in data) ? data.items : feed.items;
          return {data: data};
          break;

        default:
          return {data: {title: "Error Type <" + type + ">"}};
          break;
      }
    }
  }
</script>
