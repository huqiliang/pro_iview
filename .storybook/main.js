const path = require("path");
module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  webpackFinal: async config => {
    //省略
    //这里只写less的，scss同理改一下配置即可
    config.module.rules.push({
      test: /\.less$/,
      loaders: ["style-loader", "css-loader", "less-loader"],
      include: path.resolve(__dirname, "../")
    });
    //省略
    return config;
  },
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/vue"
};
