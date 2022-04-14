### 快速开始

```
vue create --preset huqiliang/tpl my_project
```
### 特性说明

#### 自动路由

1. views文件夹([目录说明](http://localhost:8081/pro_iview/guide/stage/start.html))为自动路由文件夹,在此文件夹下创建vue文件会自动创建路由,无需再次修改路由文件

自定义路由如果需要调整,可以再页面中定义路由相关的信息
```
// 自动路由相关的信息可以在这里填写
<route>
{
  "meta": {
    "title": "例子"     // 开发模式中导航显示的名称
  }
}
</route>

```
2. 当然,如果需要完全的自定义路由,可以打开 router/routes.js 文件([目录说明](http://localhost:8081/pro_iview/guide/stage/start.html))自行添加

3. 如果第一次添加文件后不显示在菜单栏,因文件没被监听,请保存下其他已监听过的文件即可

#### 请求拦截器

文件位置:src/libz/http.js

1.请求失败报错统一

2.pro_iview的统一判断判断
```
// 接口状态在此修改
if (res.status && (res.status != 200 || res.data.code != 0)) {
  if (!nomsg) {
    Message.error({
      //接口错误路径
      content: res.data.message || "未知错误"
    });
  }
} else {
  //pro_iview提醒判断 不可删除 也可以作为接口判断提示
  res.data.success = true;
}
return res.data;
```

3.不提示错误信息

请在该请求的请求头加入 
```
{ "nomsg":true  }
```