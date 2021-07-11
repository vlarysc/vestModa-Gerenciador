import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import state from "./state.js";
import * as actions from "./actions.js";
import * as mutations from "./mutations.js";

const store = new Vuex.Store({
  state,
  actions,
  mutations
});

export default store;
