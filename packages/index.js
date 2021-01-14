import components from "./components";
import { version } from "../package.json";
import locale from "./locale";

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = (Vue, opts = {}) => {
  // 判断是否安装
  if (install.installed) return;
  locale.use(opts.locale);
  locale.i18n(opts.i18n);
  // 遍历注册全局组件
  components.map(component => {
    if (component.name) {
      Vue.component(component.name, component);
    } else {
      console.warn(`请编写'${component.__file}'组件的名字`);
    }
  });
};

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

const API = {
  version,
  locale: locale.use,
  i18n: locale.i18n,
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  ...components
};
API.lang = code => {
  const langObject = window["iview/locale"].default;
  if (code === langObject.i.locale) locale.use(langObject);
  else console.log(`The ${code} language pack is not loaded.`); // eslint-disable-line no-console
};

export default API;
