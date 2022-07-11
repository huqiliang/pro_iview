import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Select from "../views/Select.vue";
import ProSelect from "../views/ProSelect.vue";
import Checkbox from "../views/Checkbox.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/select",
    name: "select",
    component: Select
  },
  {
    path: "/pro_select",
    name: "proSelect",
    component: ProSelect
  },
  {
    path: "/checkbox",
    name: "checkbox",
    component: Checkbox
  }
];

const router = new VueRouter({
  routes
});

export default router;
