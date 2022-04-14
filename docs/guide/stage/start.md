# 目录说明

```
project
├── babel.config.js
├── commitlint.config.js            // git commit规范
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue                     // 正式环境有效,无外框
│   ├── AppDevelopment.vue          // 只在开发环境使用,有菜单外框、自动授权登录等
│   ├── assets
│   │   └── logo.png
│   ├── components                  // 项目的公共组件
│   │   └── HelloWorld.vue
│   ├── libs
│   │   └── http.js                 // 统一接口拦截,统一报错等
│   ├── main.js
│   ├── router
│   │   ├── index.js                // 路由主入口文件
│   │   └── routes.js               // 可在此添加非自动生成的路由
│   ├── service                     // 后端接口目录,建议分模块
│   │   └── index.js                
│   ├── store
│   │   └── index.js
│   └── views                       // 页面文件夹,自动路由匹配文件夹
│       ├── about.vue
│       ├── example.vue             // pro_iview示例文件
│       ├── index.vue
│       └── system                  // 系统页面目录,包含报错等
│           └── __error__.vue          // 404 错误页面
└── vue.config.js                   // vue 配置文件 内置前端打包分析、代理配置、自动路由配置
```