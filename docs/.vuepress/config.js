module.exports = {
  title: "前端开发指南", // 设置网站标题
  description: "前端开发指南",
  displayAllHeaders: true, //显示所有页面的标题链接
  base: "/pro_iview/",
  head: [],
  plugins: [],
  themeConfig: {
    // 添加导航栏
    nav: [
      { text: "主页", link: "/" },
      { text: "指南", link: "/guide/all/base.html" },
      { text: "快速开始", link: "/guide/stage/quick.html" },
      { text: "天工更新日志", link: "/logs/tg.md" },
      { text: "pro_iview更新日志", link: "/logs/pi.md" },
    ],
    sidebar: {
      sidebarDepth: 3,
      "/guide/": [
        {
          title: "前期准备", // 必要的
          collapsable: false,
          children: [
            {
              title: "基本知识",
              path: "/guide/all/base"
            },

            {
              title: "最佳实践",
              path: "/guide/all/project"
            }
          ]
        },
        {
          title: "脚手架",
          collapsable: false,
          children: [
            {
              title: "快速开始",
              path: "/guide/stage/quick"
            },
            {
              title: "环境说明",
              path: "/guide/stage/env"
            },
            {
              title: "目录说明",
              path: "/guide/stage/start"
            },
            {
              title: "package.json",
              path: "/guide/stage/npm"
            }
          ]
        },
        {
          title: "pro_iview手册",
          collapsable: false,
          children: [
            {
              title: "架构简介",
              path: "/guide/pro_iview/intro"
            },
            {
              title: "开发手册",
              path: "/guide/pro_iview/table"
            },
          ]
        },
        {
          title: "天工手册",
          collapsable: false,
          children: [
            {
              title: "系统简介",
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
              path: "/logs/tg.md" // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            }
          ] // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        }
      ]
    },
    sidebarDepth: 3, //左侧导航显示的层级
    lastUpdated: "Last Updated"
  }
};
