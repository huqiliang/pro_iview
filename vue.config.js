const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // 修改 src 为 examples
  runtimeCompiler: true,
  pages: {
    index: {
      entry: "examples/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "https://yapi.ihotel.cn/mock/106",
        changeOrigin: true
      }
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    externals:
      process.env.NODE_ENV === "production"
        ? {
            vue: "vue",
            vuex: "vuex",
            axios: "axios",
            lodash: {
              commonjs: "lodash",
              commonjs2: "lodash", //同上
              amd: "lodash",
              root: "_" // 排除的模块，作为全局变量使用，通过script tag引入。默认设置
            },
            "view-design": "iview",
            iview: "ViewUI",
            "iview.css": "iview.css",
            "vue-router": "vue-router"
          }
        : {}
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("examples"));
    if (process.env.NODE_ENV === "production") {
      if (process.env.ANALYZ_ENV) {
        config
          .plugin("webpack-bundle-analyzer")
          .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
      }
    }
  }
};
