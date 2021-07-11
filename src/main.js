import Vue from "vue";
import Vuex from "vuex";
import store from "./store";
import App from "./App.vue";
import router from "./router";
import FirebaseVue from "./assets/firebase/index";
import "./assets/SCSS/app.scss";

Vue.use(FirebaseVue);
Vue.use(Vuex);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount("#app");
