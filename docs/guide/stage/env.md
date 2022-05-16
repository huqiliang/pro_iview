# 环境说明

脚手架在不同的环境提供不同的配置,相应的配置目录与文件vue-cli目录一致

预置了三种环境:开发环境、生产环境、生产分析环境

### 公共部分说明

```
VUE_APP_BASEURL=/       // 当前环境下的请求地址前缀
```

vue.config.js的关联设置 ([目录说明](/guide/stage/start.html))

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
http.js的关联设置 ([目录说明](/guide/stage/start.html))
```
axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
```

