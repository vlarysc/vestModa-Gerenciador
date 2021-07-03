<template>
  <nav class="navbar navbar-expand-lg navbar-red navbar-dark">
    <div class="wrapper"></div>
    <div class="container-fluid all-show">
      <a class="navbar-brand" href="#">VestModa <i class="fa fa-codepen"></i></a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link" href="#">Produtos</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Agenda</a></li>
        </ul>
      </div>
      <div>
        <LayoutLogout />
      </div>
    </div>
  </nav>
</template>

<script>
import LayoutLogout from "./LayoutLogout.vue";
export default {
  components: {
    LayoutLogout
  },
  computed: {
    routerLinks() {
      return this.$router.options.routes.filter((retornar) => retornar.name !== "Login");
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Allerta+Stencil&display=swap");

body {
  background-color: #eee;
}

.navbar-nav > li > a {
  text-transform: uppercase;
  font-size: 12px;
  margin-right: 20px;
  color: #fff;
}

.navbar-toggler {
  padding: 0.2rem 0.5rem;
  font-size: 1.25rem;
  line-height: 1;
  background-color: transparent;
  border: 1px solid white;
}

.nav-link {
  color: #fff !important;
}

.wrapper {
  width: 100%;
  position: absolute;
  height: 100%;
  background-color: #000;
  clip-path: polygon(81% 0, 100% 0, 100% 50%, 100% 100%, 71% 100%);
  transition: 1s all;
}

.navbar-brand {
  color: #fff;
  font-family: "Allerta Stencil", sans-serif;
  margin-bottom: 4px;
  font-size: 27px;
}

.navbar-red:hover .wrapper {
  clip-path: polygon(81% 0, 100% 0, 100% 50%, 100% 100%, 65% 100%);
}

.navbar-brand:hover {
  color: #fff;
}

.navbar-red {
  background-color: var(--featured);
  color: #fff;
}

.all-show {
  z-index: 10;
}
</style>
