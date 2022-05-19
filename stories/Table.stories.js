import Vue from "vue";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import ProTable from "../packages/components/ProTable";

import "../examples/libs/http";

import dayjs from "dayjs";
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
      description: "API接口请求地址",
      table: {
        type: {
          summary: "string"
        }
      },
      control: { type: null },
      defaultValue: "https://yapi.ihotel.cn:8443/mock/106/api/table"
    },
    columns: {
      description: "列表配置项",
      table: {
        type: {
          summary: "arrayObject"
        },
        defaultValue: { summary: "[]" }
      },
      defaultValue: [
        {
          title: "descriptEn",
          group: "B",
          key: "descriptEn",
          disabled: true
        }
      ],
      control: { type: "array" }
    },
    method: {
      description: "列表请求方式",
      table: {
        type: {
          summary: "string"
        },
        defaultValue: { summary: "GET" }
      },
      defaultValue: "GET",
      control: { type: "text" }
    },
    headers: {
      description: "列表请求的请求头，默认会带上链接或者localStorage中的token",
      table: {
        type: {
          summary: "object"
        }
      },
      control: { type: "object" }
    },
    autoFetch: {
      description: "控制toolBar的显示与隐藏",
      table: {
        type: {
          summary: "boolean"
        },
        defaultValue: { summary: "true" }
      },
      defaultValue: true,
      control: { type: "boolean" }
    },
    pageSize: {
      description: "分页数量",
      table: {
        type: {
          summary: "number"
        },
        defaultValue: { summary: "10" }
      },
      defaultValue: 10,
      control: { type: "number" }
    },
    title: {
      description: "查询栏标题",
      table: {
        type: {
          summary: "string"
        },
        defaultValue: { summary: "查询列表" }
      },
      defaultValue: "查询列表",
      control: { type: "text" }
    },
    map: {
      description: "主数据和分页映射",
      table: {
        type: {
          summary: "object"
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
      description:
        '格式化分页请求,支持string和fn,例如: formatCurrent: "(page.current - 1) * page.pageSize"',
      table: {
        type: {
          summary: "string"
        }
      },
      control: { type: "text" }
    },
    data: {
      description:
        "列表主数据,可通过 @dataChange 获取,如传递此参数,则将关闭自动请求",
      table: {
        type: {
          summary: "object"
        }
      },
      defaultValue: null,
      control: { type: "array" }
    },
    submitForm: {
      description: "新增按钮提交表单",
      table: {
        type: {
          summary: "string"
        }
      },
      control: { type: "text" }
    },
    toolBarActions: {
      description: "toolBar栏按钮控制",
      table: {
        type: {
          summary: "array"
        }
      },
      control: { type: "array" }
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
const Template = (args, { argTypes }) => {
  console.log("====================================");
  console.log(Object.keys(argTypes));
  console.log("====================================");
  return {
    props: Object.keys(argTypes),
    components: { ProTable },
    template:
      '<pro-table v-bind="$props" @search="search" @searchReset="searchReset"/>'
  };
};

export const 基本配置 = Template.bind({});
export const 界面显隐 = Template.bind({});
export const 字段显隐 = Template.bind({});
export const 表单穿透 = Template.bind({});
export const 多种自定义 = Template.bind({});
export const 格式化 = Template.bind({});
export const 事件回调 = Template.bind({});

界面显隐.args = {
  hide: {
    search: true,
    table: false,
    toolBar: false
  }
};
字段显隐.args = {
  columns: [
    {
      title: "second",
      notShowTable: true,
      key: "cataLog"
    },
    {
      title: "second2",
      notShowSearch: true,
      key: "cataLog"
    }
  ]
};

表单穿透.args = {
  form: {
    labelPosition: "right",
    modalWidth: "500",
    formLineNum: 1,
    value: { cataLog: "我是传入的值" }
  }
};
事件回调.args = {};

多种自定义.args = {
  columns: [
    {
      title: "first",
      key: "first",
      renderSearch: {
        type: "DatePicker"
      },
      renderTable(h, params) {
        console.log(params);
        return <Button type="primary">按钮</Button>;
      },
      renderForm: {
        type: "Radio"
      }
    },
    {
      title: "second",
      key: "cataLog"
    }
  ]
};

格式化.args = {
  columns: [
    {
      title: "createUser",
      key: "createUser",
      renderSearch: {
        type: "DatePicker",
        format(value) {
          return dayjs(value).format("YYYY-MM-DD");
        }
      }
    },
    {
      title: "second",
      key: "cataLog"
    }
  ]
};
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
