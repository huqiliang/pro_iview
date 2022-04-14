### 绿云ui设计
在前端开发过程中，需要遵循相应的 [ui规范](http://192.168.0.35:8090/pages/viewpage.action?pageId=31531522)。
### 前后端联调
前后端交互的时候一般采用 resetFull 风格的接口进行联调,查看 [restFull最佳实践](http://192.168.0.35:8090/pages/viewpage.action?pageId=21201737) 。

在开发过程中,为保证前后端同时开发,后端接口需要先行定义 swagger,然后[导入yapi](http://192.168.0.35:8090/pages/viewpage.action?pageId=17176417),支持自动导入。

在后端定义好接口后,前端可以连接 [yapi](https://yapi.ihotel.cn:8443/) 进行项目开发,可以 [mock数据](https://hellosean1025.github.io/yapi/documents/mock.html) 成自己期望的样子进行项目开发

### git协作和commit规范
1.基于 [git-flow](http://192.168.0.35:8090/pages/viewpage.action?pageId=16548145)的协作开发

2.git [commit](https://zhuanlan.zhihu.com/p/90281637) 约定式提交
### eslint规范
继承 vue-cli 相关配置
### 代码风格
采用 prettier 格式化代码,请配置好相关编辑器插件