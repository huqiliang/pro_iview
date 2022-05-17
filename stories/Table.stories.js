import Vue from "vue";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import ProTable from "../packages/components/ProTable";

import "../examples/libs/http";
Vue.use(ViewUI);
// Vue.use(ProComponents);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Example/ProTable",
  component: ProTable,
  parameters: { actions: { argTypesRegex: "^on.*" } },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    request: {
      table: {
        type: {
          summary: "API接口请求地址"
        }
      },
      defaultValue: "https://yapi.ihotel.cn:8443/mock/106/api/table"
    },
    columns: {
      table: {
        type: {
          summary: "列表配置项"
        },
        defaultValue: { summary: "[]" }
      },
      defaultValue: [
        {
          title: "cataLog",
          group: "B",
          key: "cataLog",
          disabled: true
        }
      ],
      control: { type: "array" }
    },
    method: {
      name: "method",
      table: {
        type: {
          summary: "列表请求方式"
        },
        defaultValue: { summary: "GET" }
      },
      defaultValue: "GET",
      control: { type: "text" }
    },
    headers: {
      name: "headers",
      title: "列表请求的请求头",
      table: {
        type: {
          summary: "列表请求的请求头，默认会带上链接或者localStorage中的token"
        }
      },
      control: { type: "object" }
    },
    autoFetch: {
      name: "autoFetch",
      title: "是否一进入就请求",
      table: {
        type: {
          summary: "控制toolBar的显示与隐藏"
        },
        defaultValue: { summary: "true" }
      },
      defaultValue: true,
      control: { type: "boolean" }
    },
    pageSize: {
      name: "pageSize",
      title: "分页数量",
      table: {
        type: {
          summary: "分页数量"
        },
        defaultValue: { summary: "10" }
      },
      defaultValue: 10,
      control: { type: "number" }
    },
    title: {
      name: "title",
      title: "笔筒",
      table: {
        type: {
          summary: "查询栏标题"
        },
        defaultValue: { summary: "查询列表" }
      },
      defaultValue: "查询列表",
      control: { type: "text" }
    },
    map: {
      name: "map",
      table: {
        type: {
          summary: "主数据和分页映射 "
        },
        defaultValue: {
          summary: "dataPath:主数据路径;\n totalPath:分页路径"
        }
      },
      defaultValue: {
        dataPath: "data",
        totalPath: "totalRows"
      },
      control: { type: "object" }
    },
    format: {
      table: {
        type: {
          summary:
            '格式化分页请求,支持string和fn,例如: formatCurrent: "(page.current - 1) * page.pageSize"'
        }
      },
      control: { type: "text" }
    },
    data: {
      name: "data",
      table: {
        type: {
          summary: "列表主数据,可通过 @dataChange 获取"
        }
      },
      defaultValue: [],
      control: { type: "array" }
    },
    submitForm: {
      table: {
        type: {
          summary: "新增按钮提交表单"
        }
      },
      control: { type: "text" }
    },
    hide: {
      table: {
        type: {
          summary: "控制各个元素的显示和隐藏"
        },
        defaultValue: {
          summary: "默认都显示"
        }
      },
      defaultValue: {
        search: false,
        toolBar: false,
        table: false,
        pages: false
      },
      control: { type: "object" }
      // default() {
      //   return { search: false, table: false, pages: false };
      // }
    },
    search: {
      action: "search"
    },
    searchReset: {
      action: "searchReset"
    }
    // method: {
    //   default: "GET"
    // },
    // size: {
    //   control: { type: "select" },
    //   options: ["small", "medium", "large"]
    // }
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ProTable },
  template:
    '<pro-table v-bind="$props" @search="search" @searchReset="searchReset"/>'
});

export const 基本配置 = Template.bind({});

export const 表单穿透 = Template.bind({});
export const 事件回调 = Template.bind({});

表单穿透.args = {
  form: {
    labelPosition: "right"
  }
};
事件回调.args = {};
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
// Primary.args = {
//   primary: true,
//   label: "Button"
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: "Button"
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: "large",
//   label: "Button"
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: "small",
//   label: "Button"
// };
