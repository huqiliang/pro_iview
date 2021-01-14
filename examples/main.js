import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import VueI18n from "vue-i18n";
import en from "view-design/dist/locale/en-US";
import zh from "view-design/dist/locale/zh-CN";
// 导入组件库
import ProComponents from "./../packages/index";
import pro_en from "./../packages/locale/lang/en-US";
import pro_zh from "./../packages/locale/lang/zh-CN";
Vue.use(VueI18n);
Vue.use(ViewUI);
Vue.use(ProComponents);

Vue.locale = () => {};
// 注册组件库
const messages = {
  "en-US": Object.assign(en, pro_en),
  "zh-CN": Object.assign(zh, pro_zh)
};
const i18n = new VueI18n({
  locale: "zh-CN", // set locale
  messages // set locale messages
  //silentTranslationWarn: true
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
