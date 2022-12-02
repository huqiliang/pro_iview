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
import "./../lib/pro-iview.css";
import pro_en from "./../packages/locale/lang/en-US";
import pro_zh from "./../packages/locale/lang/zh-CN";
import "./libs/http";

Vue.use(VueI18n);
Vue.use(ViewUI, {
  i18n: function(path, options) {
    let value = i18n.t(path, options);
    if (value !== null && value !== undefined) return value;

    return "";
  }
});
Vue.use(ProComponents, {
  pro_iview: {
    format: {
      formatCurrent: "(page.current - 1) * page.pageSize" // 格式化分页 fn 或 string
    },
    map: {
      current: "firstResult", // 分页请求 current 字段映射
      pageSize: "page", // 分页请求 pageSize 字段映射
      message: "message" //消息提醒路径映射
      // success: "code===0" // pro_iview中的接口错误请求判断
    }
  }
});

Vue.locale = () => {};
// 注册组件库
const messages = {
  "en-US": Object.assign(en, pro_en),
  "zh-CN": Object.assign(zh, pro_zh)
};
const i18n = new VueI18n({
  locale: "en-US", // set locale
  messages, // set locale messages
  silentTranslationWarn: true
});

// Vue.config.errorHandler = err => {
//   Message.error({ content: err, duration: 5 });
//   console.error(err);
// };
// Vue.config.warnHandler = err => {
//   Message.error({ content: err, duration: 5 });
//   console.error(err);
// };
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
