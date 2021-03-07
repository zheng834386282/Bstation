import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import http from 'network/http.js'
import { Toast } from 'vant';
import { Uploader } from 'vant';
import { Dialog } from 'vant';
import { ActionSheet } from 'vant';
import { Tab, Tabs } from 'vant';
import { List } from 'vant';
import { Sticky } from 'vant';
import { Divider } from 'vant';

Vue.prototype.$http=http
Vue.prototype.$toast=Toast
Vue.prototype.$bus=new Vue()

Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

