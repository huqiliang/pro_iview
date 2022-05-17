import Vue from "vue";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import ProComponents from "../packages/index";

import "../examples/libs/http";
Vue.use(ViewUI);
Vue.use(ProComponents);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Example/ProForm",
  // component: ProComponents,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    value: {
      table: {
        type: {
          summary: "表单的值 支持v-model"
        }
      },
      control: { type: "object" }
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
          key: "cataLog"
        }
      ],
      control: { type: "array" }
    },
    type: {
      table: {
        type: {
          summary: "表单类型"
        },
        defaultValue: { summary: "edit" }
      },
      defaultValue: "edit",
      control: { type: "text" }
    },
    labelWidth: {
      table: {
        type: {
          summary: "label的宽度"
        },
        defaultValue: { summary: 110 }
      },
      defaultValue: 110,
      control: { type: "number" }
    },
    formLineNum: {
      table: {
        type: {
          summary: "一行的个数"
        },
        defaultValue: { summary: 1 }
      },
      defaultValue: 1,
      control: { type: "number" }
    },
    labelPosition: {
      table: {
        type: {
          summary: "left"
        },
        defaultValue: { summary: "left" }
      },
      defaultValue: "left",
      control: {
        type: "select",
        options: ["left", "right"]
      }
    }
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  // components: { ProComponents },
  template: '<pro-form v-bind="$props"/>'
});

export const 基本配置 = Template.bind({});
export const 一行多个 = Template.bind({});

一行多个.args = {
  formLineNum: 2,
  columns: [
    {
      title: "基础配置1",
      formLineNum: 1,
      key: "first"
    },
    {
      title: "基础配置2",
      formLineNum: 1,
      key: "second"
    }
  ]
};

export const 分组 = Template.bind({});

分组.args = {
  formLineNum: 3,
  columns: [
    {
      title: "基础配置1",
      group: "分组1",
      formLineNum: 1,
      key: "first"
    },
    {
      title: "基础配置2",
      formLineNum: 2,
      group: "分组1",
      key: "second"
    },
    {
      title: "基础配置3",
      group: "分组2",
      key: "third"
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
