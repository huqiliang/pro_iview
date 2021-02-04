import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Build from "../views/Build.vue";
import Pages from "../views/pages.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/build",
    name: "Build",
    component: Build
  },
  {
    path: "/pages",
    name: "Pages",
    component: Pages
  }
];

const router = new VueRouter({
  routes
});

export default router;
