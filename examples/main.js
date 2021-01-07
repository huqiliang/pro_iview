import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
Vue.use(ViewUI);
// 导入组件库
import ProComponents from "./../packages/index";
// 注册组件库
Vue.config.productionTip = false;
Vue.use(ProComponents);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
