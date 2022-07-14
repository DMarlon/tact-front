import Vue from 'vue'
import App from './App.vue'

import "./plugins/axios";
import "./plugins/bootstrap-vue";

import "./utilitaries/path-api";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
