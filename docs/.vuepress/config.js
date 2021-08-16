module.exports = {
  title: "iview高阶组件库", // 设置网站标题
  description: "iview高阶组件库",
  displayAllHeaders: true, //显示所有页面的标题链接

  head: [],
  plugins: [],
  themeConfig: {
    // 添加导航栏
    nav: [
      { text: "主页", link: "/" },
      { text: "指南", link: "/guide/" },
      { text: "更新日志", link: "/logs/" },
      {
        text: "github",
        link: "https://github.com/huqiliang/pro_components"
      }
    ],
    sidebar: {
      sidebarDepth: 3,
      "/guide/": [
        {
          title: "架构设计", // 必要的
          collapsable: false,
          children: [
            {
              title: "组件总览",
              path: "/guide/all/preview"
            }
          ]
        },
        {
          title: "数据展示",
          collapsable: false,
          children: [
            {
              title: "表格生成",
              path: "/guide/data/config"
            }
          ]
        },
        {
          title: "天工手册",
          collapsable: false,
          children: [
            {
              title: "简介",
              path: "/guide/server/intro"
            },
            {
              title: "项目配置",
              path: "/guide/server/product"
            },
            {
              title: "页面配置",
              path: "/guide/server/page"
            }
          ]
        }
      ],
      "/logs/": [
        {
          title: "更新日志",
          children: [
            {
              title: "更新说明", // 必要的
              path: "/logs/logs" // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            }
          ] // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        }
      ]
    },
    sidebarDepth: 1, //左侧导航显示的层级
    lastUpdated: "Last Updated"
  }
};
