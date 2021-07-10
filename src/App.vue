<template>
  <div id="app">
    <LayoutNotify />
    <div class="container-fluid" v-if="logado">
      <div class="row">
        <Navigation />
        <div class="col">
          <router-view />
        </div>
      </div>
    </div>
    <router-view v-else />
  </div>
</template>

<script>
import Navigation from "./pages/layout/Navigation.vue";
import LayoutNotify from "./pages/layout/LayoutNotify.vue";

export default {
  name: "App",
  components: {
    Navigation,
    LayoutNotify
  },
  data() {
    return {
      logado: false
    };
  },
  methods: {},
  mounted() {
    this.$firebase.auth().onAuthStateChanged((user) => {
      window.uid = user ? user.uid : null;
      this.logado = !!user;
      this.$router.push({ name: window.uid ? "Home" : "Login" });
      setTimeout(() => {}, 300);
    });
  }
};
</script>

<style lang="scss">
#app {
  min-height: 95vh;
  width: calc(98% + 13px);
  background-color: var(--light);
}
</style>
