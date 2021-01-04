import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
Vue.use(ViewUI);
// 导入组件库
import ProTable from "./../packages/index";
console.log(ProTable);
// 注册组件库
Vue.config.productionTip = false;
Vue.use(ProTable);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
