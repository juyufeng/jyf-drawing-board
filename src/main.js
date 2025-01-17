import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store';
// import '@vant/touch-emulator';
import jyf from '@/utils/jyf.js'

Vue.prototype.$axios = axios;
Vue.prototype.$jyf = jyf;

export default new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
