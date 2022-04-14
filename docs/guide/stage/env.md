# 环境说明
### 公共部分

```
api=/                   // vue.config.js关联的代理地址
VUE_APP_BASEURL=/       // http.js定义的所有url的前缀 baseURL
```

vue.config.js的关联设置 ([目录说明](http://localhost:8081/pro_iview/guide/stage/start.html))
```
// 设置代理
proxy: {
    "/api": {
    target: process.env.api,
    ws: false,
    changeOrigin: true,
    },
},
```
http.js的关联设置 ([目录说明](http://localhost:8081/pro_iview/guide/stage/start.html))
```
axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
```
### 打包资源分析

```
npm run 
```
ANALYZ_ENV=true

