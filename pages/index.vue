<template>
  <section class="comic">
    <b-navbar
      id="rss-nav"
      toggleable="md"
      type="dark"
      variant="info">
      <b-navbar-toggle target="nav_collapse"/>

      <div>
        <b-navbar-brand
          v-if="loading"
          @click="update()">
          <div class="loader-5"/>
        </b-navbar-brand>
        <b-navbar-brand
          v-else
          @click="update()">{{ this.$store.state.data.title }}
        </b-navbar-brand>
      </div>
      <b-collapse
        id="nav_collapse"
        is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="https://github.com/feilongfl/Cimoc">
            <b-img
              src="https://camo.githubusercontent.com/69b991d1e0f31d6bb3e984495ca0cdb21ac41d38/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f72656c656173652f6665696c6f6e67666c2f43696d6f632e737667"></b-img>
          </b-nav-item>

          <!--<b-nav-item href="#">{{ this.$store.state.pubDate }}</b-nav-item>-->
          <b-nav-item-dropdown
            text="IPFS Server"
            right>
            <b-dropdown-item @click="changeIpfsServer('https://feilong.ml/comic.json')">Cloudflare</b-dropdown-item>
            <b-dropdown-item @click="changeIpfsServer('https://ipfs.io/ipns/feilong.ml/comic.json')">ipfs.io
            </b-dropdown-item>
            <b-dropdown-item @click="changeIpfsServer('https://ipfs.f.lan/ipns/feilong.ml/comic.json')">ipfs.f.lan
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <!--<b-nav-item href="#">{{ data.description }}</b-nav-item>-->
          <b-nav-item right href="https://github.com/feilongfl/rss2web/issues">
            反馈
          </b-nav-item>
          <b-nav-item right href="https://feilong.home.blog">
            feilong 2018
          </b-nav-item>
          </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-alert
      :show="alertBar.Time"
      :variant="alertBar.Level"
      @dismissed="alertBar.Time=0"
      @dismiss-count-down="(t) => {alertBar._time = t}">
      <p>{{ alertBar.Message }}</p>
      <b-progress
        v-if="!(alertBar.Time in [0,1])"
        :max="alertBar.Time"
        :value="alertBar._time"
        variant="warning"
        height="4px"/>
    </b-alert>

    <div id="rss-body">
      <b-list-group>
        <div
          v-for="(item, index) in this.$store.state.data.items"
          :key="index">
          <b-list-group-item
            :href="item.link"
            class="d-flex justify-content-between align-items-center"
            @click="markRead(index)">
            <b-media>
              <!--<b-img slot="aside" height="240" width="160" alt="placeholder" :src="item.cover" />-->
              <b-img-lazy
                slot="aside"
                :src="item.cover"
                rounded
                height="200"
                width="160"
                alt="img"
                blank-src="/icon.png"/>
              <h5 class="mt-0">{{ item.title }}</h5>
              <b-badge
                v-if="item.readed"
                variant="secondary"
                pill>Readed
              </b-badge>

              <b-badge
                v-if="item.category === 'manhuagui'"
                variant="primary"
                pill>{{ item.category }}
              </b-badge>
              <b-badge
                v-else-if="item.category === '57comic'"
                variant="success"
                pill>{{ item.category }}
              </b-badge>
              <b-badge
                v-else-if="item.category === 'tencent'"
                variant="warning"
                pill>{{ item.category }}
              </b-badge>
              <b-badge
                v-else-if="item.category === 'pufei'"
                variant="danger"
                pill>{{ item.category }}
              </b-badge>
              <b-badge
                v-else-if="item.category === 'webtoons'"
                variant="primary"
                pill>{{ item.category }}
              </b-badge>
              <b-badge
                v-else-if="item.category === '997700'"
                variant="info"
                pill>{{ item.category }}
              </b-badge>
              <b-badge
                v-else
                variant="secondary"
                pill>{{ item.category }}
              </b-badge>
              <p>
                {{ item.pubDate }}
                <!--{{item.description}}-->
              </p>
              <p class="rank">#{{ index }}</p>
            </b-media>
          </b-list-group-item>
        </div>
        <div>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
            @click="update()">
            <b-media>
              <h5 class="mt-0">End</h5>
            </b-media>
          </b-list-group-item>
        </div>
      </b-list-group>
    </div>
  </section>
</template>

<style>
  *, ::after, ::before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .rank {
    float: right;
    font-size: 36px;
    color: #9da0a9;
  }

  /* Loader 1 */
  .loader-1 {
    height: 32px;
    width: 32px;
    -webkit-animation: loader-1-1 4.8s linear infinite;
    animation: loader-1-1 4.8s linear infinite;
  }

  @-webkit-keyframes loader-1-1 {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes loader-1-1 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loader-1 span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 32px;
    width: 32px;
    clip: rect(0, 32px, 32px, 16px);
    -webkit-animation: loader-1-2 1.2s linear infinite;
    animation: loader-1-2 1.2s linear infinite;
  }

  @-webkit-keyframes loader-1-2 {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(220deg);
    }
  }

  @keyframes loader-1-2 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(220deg);
    }
  }

  .loader-1 span::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 32px;
    width: 32px;
    clip: rect(0, 32px, 32px, 16px);
    border: 3px solid #FFF;
    border-radius: 50%;
    -webkit-animation: loader-1-3 1.2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
    animation: loader-1-3 1.2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  }

  @-webkit-keyframes loader-1-3 {
    0% {
      -webkit-transform: rotate(-140deg);
    }
    50% {
      -webkit-transform: rotate(-160deg);
    }
    100% {
      -webkit-transform: rotate(140deg);
    }
  }

  @keyframes loader-1-3 {
    0% {
      transform: rotate(-140deg);
    }
    50% {
      transform: rotate(-160deg);
    }
    100% {
      transform: rotate(140deg);
    }
  }

  /* Loader 2 */
  .loader-2 {
    display: block;
    height: 32px;
    width: 32px;
    -webkit-animation: loader-2-1 3s linear infinite;
    animation: loader-2-1 3s linear infinite;
  }

  @-webkit-keyframes loader-2-1 {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes loader-2-1 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loader-2 span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 32px;
    width: 32px;
    clip: rect(16px, 32px, 32px, 0);
    -webkit-animation: loader-2-2 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
    animation: loader-2-2 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  }

  @-webkit-keyframes loader-2-2 {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes loader-2-2 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loader-2 span::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 32px;
    width: 32px;
    border: 3px solid transparent;
    border-top: 3px solid #FFF;
    border-radius: 50%;
    -webkit-animation: loader-2-3 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
    animation: loader-2-3 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  }

  @-webkit-keyframes loader-2-3 {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes loader-2-3 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loader-2 span::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 32px;
    width: 32px;
    border: 3px solid rgba(255, 255, 255, .5);
    border-radius: 50%;
  }

  /* Loader 3 */
  .loader-3 {
    display: block;
    height: 32px;
    width: 32px;
  }

  .loader-3 span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 32px;
    width: 32px;
  }

  .loader-3 span::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 32px;
    width: 32px;
    border: 3px solid #FFF;
    border-bottom: 3px solid transparent;
    border-radius: 50%;
    -webkit-animation: loader-3-1 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
    animation: loader-3-1 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  }

  @-webkit-keyframes loader-3-1 {
    0% {
      -webkit-transform: rotate(0deg);
    }
    40% {
      -webkit-transform: rotate(180deg);
    }
    60% {
      -webkit-transform: rotate(180deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes loader-3-1 {
    0% {
      transform: rotate(0deg);
    }
    40% {
      transform: rotate(180deg);
    }
    60% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loader-3 span::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 6px;
    height: 6px;
    background: #FFF;
    border-radius: 50%;
    -webkit-animation: loader-3-2 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
    animation: loader-3-2 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  }

  @-webkit-keyframes loader-3-2 {
    0% {
      -webkit-transform: translate3d(0, -32px, 0) scale(0, 2);
      opacity: 0;
    }
    50% {
      -webkit-transform: translate3d(0, 0, 0) scale(1.25, 1.25);
      opacity: 1;
    }
    100% {
      -webkit-transform: translate3d(0, 8px, 0) scale(0, 0);
      opacity: 0;
    }
  }

  @keyframes loader-3-2 {
    0% {
      transform: translate3d(0, -32px, 0) scale(0, 2);
      opacity: 0;
    }
    50% {
      transform: translate3d(0, 0, 0) scale(1.25, 1.25);
      opacity: 1;
    }
    100% {
      transform: translate3d(0, 8px, 0) scale(0, 0);
      opacity: 0;
    }
  }

  /* Loader 4 */
  .loader-4 {
    height: 32px;
    width: 32px;
  }

  .loader-4::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 12px;
    height: 12px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background: #FFF;
    border-radius: 50%;
    -webkit-animation: loader-4-1 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
    animation: loader-4-1 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  }

  @-webkit-keyframes loader-4-1 {
    0% {
      -webkit-transform: scale(0);
      opacity: 0;
    }
    50% {
      -webkit-transform: scale(1);
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(0);
      opacity: 0;
    }
  }

  @keyframes loader-4-1 {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0);
      opacity: 0;
    }
  }

  .loader-4 span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 32px;
    width: 32px;
    -webkit-animation: loader-4-2 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
    animation: loader-4-2 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  }

  @-webkit-keyframes loader-4-2 {
    0% {
      -webkit-transform: rotate(0deg);
    }
    50% {
      -webkit-transform: rotate(180deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes loader-4-2 {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loader-4 span::before,
  .loader-4 span::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 12px;
    width: 12px;
    background: #FFF;
    border-radius: 50%;
    -webkit-animation: loader-4-3 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
    animation: loader-4-3 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  }

  @-webkit-keyframes loader-4-3 {
    0% {
      -webkit-transform: translate3d(0, 0, 0) scale(1);
    }
    50% {
      -webkit-transform: translate3d(-16px, 0, 0) scale(.5);
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0) scale(1);
    }
  }

  @keyframes loader-4-3 {
    0% {
      transform: translate3d(0, 0, 0) scale(1);
    }
    50% {
      transform: translate3d(-16px, 0, 0) scale(.5);
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1);
    }
  }

  .loader-4 span::after {
    -webkit-animation: loader-4-4 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
    animation: loader-4-4 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  }

  @-webkit-keyframes loader-4-4 {
    0% {
      -webkit-transform: translate3d(0, 0, 0) scale(1);
    }
    50% {
      -webkit-transform: translate3d(16px, 0, 0) scale(.5);
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0) scale(1);
    }
  }

  @keyframes loader-4-4 {
    0% {
      transform: translate3d(0, 0, 0) scale(1);
    }
    50% {
      transform: translate3d(16px, 0, 0) scale(.5);
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1);
    }
  }

  /* Loader 5 */
  .loader-5 {
    height: 32px;
    width: 32px;
    -webkit-animation: loader-5-1 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
    animation: loader-5-1 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  }

  @-webkit-keyframes loader-5-1 {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes loader-5-1 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loader-5::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: auto;
    margin: auto;
    width: 8px;
    height: 8px;
    background: #FFF;
    border-radius: 50%;
    -webkit-animation: loader-5-2 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
    animation: loader-5-2 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  }

  @-webkit-keyframes loader-5-2 {
    0% {
      -webkit-transform: translate3d(0, 0, 0) scale(1);
    }
    50% {
      -webkit-transform: translate3d(24px, 0, 0) scale(.5);
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0) scale(1);
    }
  }

  @keyframes loader-5-2 {
    0% {
      transform: translate3d(0, 0, 0) scale(1);
    }
    50% {
      transform: translate3d(24px, 0, 0) scale(.5);
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1);
    }
  }

  .loader-5::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: auto;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 8px;
    height: 8px;
    background: #FFF;
    border-radius: 50%;
    -webkit-animation: loader-5-3 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
    animation: loader-5-3 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  }

  @-webkit-keyframes loader-5-3 {
    0% {
      -webkit-transform: translate3d(0, 0, 0) scale(1);
    }
    50% {
      -webkit-transform: translate3d(-24px, 0, 0) scale(.5);
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0) scale(1);
    }
  }

  @keyframes loader-5-3 {
    0% {
      transform: translate3d(0, 0, 0) scale(1);
    }
    50% {
      transform: translate3d(-24px, 0, 0) scale(.5);
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1);
    }
  }

  .loader-5 span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 32px;
    width: 32px;
  }

  .loader-5 span::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: auto;
    right: 0;
    margin: auto;
    width: 8px;
    height: 8px;
    background: #FFF;
    border-radius: 50%;
    -webkit-animation: loader-5-4 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
    animation: loader-5-4 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  }

  @-webkit-keyframes loader-5-4 {
    0% {
      -webkit-transform: translate3d(0, 0, 0) scale(1);
    }
    50% {
      -webkit-transform: translate3d(0, 24px, 0) scale(.5);
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0) scale(1);
    }
  }

  @keyframes loader-5-4 {
    0% {
      transform: translate3d(0, 0, 0) scale(1);
    }
    50% {
      transform: translate3d(0, 24px, 0) scale(.5);
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1);
    }
  }

  .loader-5 span::after {
    content: "";
    display: block;
    position: absolute;
    top: auto;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 8px;
    height: 8px;
    background: #FFF;
    border-radius: 50%;
    -webkit-animation: loader-5-5 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
    animation: loader-5-5 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  }

  @-webkit-keyframes loader-5-5 {
    0% {
      -webkit-transform: translate3d(0, 0, 0) scale(1);
    }
    50% {
      -webkit-transform: translate3d(0, -24px, 0) scale(.5);
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0) scale(1);
    }
  }

  @keyframes loader-5-5 {
    0% {
      transform: translate3d(0, 0, 0) scale(1);
    }
    50% {
      transform: translate3d(0, -24px, 0) scale(.5);
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1);
    }
  }

  /* Loader 6 */
  .loader-6 {
    height: 32px;
    width: 32px;
  }

  .loader-6 span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 32px;
    width: 32px;
  }

  .loader-6 span::before,
  .loader-6 span::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 32px;
    width: 32px;
    border: 2px solid #FFF;
    border-radius: 50%;
    opacity: 0;
    -webkit-animation: loader-6-1 1.5s cubic-bezier(0.075, 0.820, 0.165, 1.000) infinite;
    animation: loader-6-1 1.5s cubic-bezier(0.075, 0.820, 0.165, 1.000) infinite;
  }

  @-webkit-keyframes loader-6-1 {
    0% {
      -webkit-transform: translate3d(0, 0, 0) scale(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0) scale(1.5);
      opacity: 0;
    }
  }

  @keyframes loader-6-1 {
    0% {
      transform: translate3d(0, 0, 0) scale(0);
      opacity: 1;
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1.5);
      opacity: 0;
    }
  }

  .loader-6 span::after {
    -webkit-animation: loader-6-2 1.5s cubic-bezier(0.075, 0.820, 0.165, 1.000) .25s infinite;
    animation: loader-6-2 1.5s cubic-bezier(0.075, 0.820, 0.165, 1.000) .25s infinite;
  }

  @-webkit-keyframes loader-6-2 {
    0% {
      -webkit-transform: translate3d(0, 0, 0) scale(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0) scale(1);
      opacity: 0;
    }
  }

  @keyframes loader-6-2 {
    0% {
      transform: translate3d(0, 0, 0) scale(0);
      opacity: 1;
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 0;
    }
  }

  /* Layout */
  .center {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }

  .wrapper {
    position: relative;
    width: 100%;
    max-width: 1000px;
    height: 100%;
    margin: 0 auto;
  }

  .wrapper .header {
    text-align: center;
    position: absolute;
    top: 10%;
    left: 0;
    bottom: auto;
    right: 0;
    margin: auto;
    letter-spacing: 0.15em;
    z-index: 1;
  }

  .wrapper .header h1 {
    display: inline-block;
    height: 1em;
    color: #FFF;
    font-size: 4vh;
    font-family: "Poppins", sans-serif;
    font-weight: 700;
    line-height: 1;
  }

  .wrapper .header p {
    margin-top: 10px;
    color: #FFF;
    font-size: 1.3rem;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    letter-spacing: 0.065em;
    opacity: .5;
  }

  .wrapper .header p a {
    color: #FFF;
    text-decoration: none;
  }

  .loader-list {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-align-content: center;
    align-content: center;
    position: relative;
    width: 100%;
    height: 100%;
    clear: both;
  }

  .loader-list li {
    -webkit-flex: 1 1 auto;
    flex: 1 1 auto;
    position: relative;
    display: block;
    width: calc(100% / 3);
    height: calc(100vh / 4);
  }
</style>

<script>
  import axios from 'axios'


  export default {
    data() {
      return {
        alertBar: {
          Message: "",
          Time: 0,
          _time: 0,
          Level: "info"
        },
        timer: null,
        loading: false,
        uselz: true
      }
    },
    mounted() {
      this.update();
      this.timer = setInterval(() => {
        this.update();
      }, 600000)//10min
    },
    beforeDestroy() {
      clearInterval(this.timer)
      this.timer = null
    },
    methods: {
      markRead(index) {
        this.$store.commit('markRead', index);
        this.$forceUpdate();
      },
      changeIpfsServer(url) {
        this.$store.commit('setUrl', url)
      },
      showNoti(mess, time, level) {
        this.alertBar.Message = mess;
        this.alertBar.Time = time;
        this.alertBar._time = time;
        this.alertBar.Level = level;
      },
      update() {
        if (this.uselz)
          this.updatelz();
        else
          this.updateNormal();
      },
      async updateNormal() {
        if (this.loading)
          return;

        this.loading = true;
        try {
          let {data} = await axios.get(this.$store.state.url);
          data.refershDate = Date.now();
          this.$store.commit('setData', data);
          this.showNoti("Refershed!", 1, "info");
        } catch (err) {
          this.showNoti("Network Err!", 3, "danger");
          console.log(err);
        } finally {
          this.loading = false;
        }
      },
      async updatelz() {
        if (this.loading)
          return;

        this.loading = true;
        try {
          let {data} = await axios.get(this.$store.state.url + ".lz");
          // data.refershDate = Date.now();
          this.$store.commit('setDataLZ', data);
          this.showNoti("Refershed!", 1, "info");
        } catch (err) {
          this.showNoti("Network Err!", 3, "danger");
          console.log(err);
        } finally {
          this.loading = false;
        }
      }
    },
  }
</script>
