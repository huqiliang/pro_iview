# 安装包说明

### 常用命令
vue-cli命令不再赘述

1.内置 publicPath 为本项目name

2.打包资源分析

```
yarn analyze
```
3.代码提交

项目会对每一次提交进行 eslint 和 [git commit规范](https://zhuanlan.zhihu.com/p/90281637)校验，校验成功方可提交。

可自行按规范提交，也可用下列命令提交,该命令会同事生成对应的 git commit 规范的提交。
```
yarn commit
```

4.版本生成

有时候需要快速生成一个版本,根据3中的提交生成一个本地 changelog.md 并 tag 到 git

```
yarn release
```

### 内置依赖

项目内置了 pro_iview 依赖,相关文档请参考下一章

