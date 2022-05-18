在大多情况下，你的项目是已经存在的，可以按以下方式安装使用
### 安装

```
yarn add pro_iview
```

### 在项目中使用
```
import Vue from "vue";
import iView from "view-design"; // step 1:import view-design
import "view-design/dist/styles/iview.css";
import proIview from "pro_iview"; // step 2:import pro_iview
import "pro_iview/lib/pro-iview.css";
import http from "./libs/http"; // 使用拦截器

Vue.use(iView); // step 3:use iView
Vue.use(proIview, {
  http     // 注入你的请求拦截器 注意:需要导出axios对象
}); // step 4:use proIview