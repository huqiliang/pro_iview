import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI, { Message } from "view-design";
import "view-design/dist/styles/iview.css";
import VueI18n from "vue-i18n";
import en from "view-design/dist/locale/en-US";
import zh from "view-design/dist/locale/zh-CN";
// 导入组件库
import ProComponents from "./../lib/pro-iview.common";
import "./../lib/pro-iview.css";
import pro_en from "./../packages/locale/lang/en-US";
import pro_zh from "./../packages/locale/lang/zh-CN";
Vue.use(VueI18n);
Vue.use(ViewUI, {
  i18n: function(path, options) {
    let value = i18n.t(path, options);
    if (value !== null && value !== undefined) return value;

    return "";
  }
});
Vue.use(ProComponents);

Vue.locale = () => {};
// 注册组件库
const messages = {
  "en-US": Object.assign(en, pro_en),
  "zh-CN": Object.assign(zh, pro_zh)
};
const i18n = new VueI18n({
  locale: "zh-CN", // set locale
  messages, // set locale messages
  silentTranslationWarn: true
});

Vue.config.errorHandler = err => {
  Message.error({ content: err, duration: 5 });
  console.error(err);
};
Vue.config.warnHandler = err => {
  Message.error({ content: err, duration: 5 });
  console.error(err);
};
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
