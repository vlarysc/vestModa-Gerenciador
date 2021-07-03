import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Home",

      component: () => import("../pages/home/Home.vue")
    },
    {
      path: "/lista-gastos",
      name: "Lista-Gastos",

      component: () => import("../pages/products/Products.vue")
    },
    {
      path: "/login",
      name: "Login",

      component: () => import("../pages/login/Login.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - VestModa`;
  if (!window.uid && to.name !== "Login") {
    next({ name: "Login" });
  } else {
    next();
  }
});
/* const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
}) */

export default router;
