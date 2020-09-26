// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify';
import buyModal from './components/Shared/BuyModal.vue'
import * as fb from 'firebase'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'


Vue.component('app-buy-modal', buyModal)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  vuetify,
  store,
  template: '<App/>',
  created() {
    fb.initializeApp({
      apiKey: "AIzaSyCBBM2sI0piBlbODrCDEiAav2MZHCN6nwY",
      authDomain: "itc-ads-project-e5c08.firebaseapp.com",
      databaseURL: "https://itc-ads-project-e5c08.firebaseio.com",
      projectId: "itc-ads-project-e5c08",
      storageBucket: "itc-ads-project-e5c08.appspot.com",
      messagingSenderId: "174546258194",
      appId: "1:174546258194:web:fdec49d5e38a55fcc08bcb"
    })
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchAds')
  }
})
