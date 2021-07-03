<template>
  <div id="app">
    <div class="container-fluid" v-if="logado">
      <div class="row">
        <div class="col-2 navigation-sidebar">
          <h1 class="app-title">VestModa</h1>
          <Navigation />
        </div>
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

export default {
  name: "App",
  components: {
    Navigation
  },
  data() {
    return {
      logado: false
    };
  },
  methods: {},
  mounted() {
    console.log(this.$firebase);
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
