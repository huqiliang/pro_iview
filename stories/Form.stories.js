import Vue from "vue";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import ProForm from "../packages/components/ProForm.vue";

import "../examples/libs/http";
Vue.use(ViewUI);
// Vue.use(ProComponents);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Example/ProForm",
  component: ProForm,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    value: {
      description: "表单的值 支持v-model",
      table: {
        defaultValue: { summary: "{}" }
      },
      control: { type: "object" }
    },
    type: {
      description: "表单类型",
      table: {
        defaultValue: { summary: "edit" }
      },
      defaultValue: "edit",
      control: { type: "text" }
    },
    labelWidth: {
      description: "表单类型",
      table: {
        defaultValue: { summary: 110 }
      },
      defaultValue: 90,
      control: { type: "number" }
    },
    formLineNum: {
      description: "一行的个数",
      table: {
        defaultValue: { summary: 1 }
      },
      defaultValue: 1,
      control: { type: "number" }
    },
    labelPosition: {
      description: "label的方向",
      table: {
        defaultValue: { summary: "left" }
      },
      defaultValue: "left",
      control: {
        type: "select",
        options: ["left", "right"]
      }
    },
    columns: {
      description: "列表配置项",
      table: {
        defaultValue: { summary: "[]" }
      },
      defaultValue: [
        {
          title: "cataLog",
          key: "cataLog"
        }
      ],
      control: { type: "array" }
    }
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ProForm },
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
  formLineNum: 2,
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

export const 自定义渲染 = Template.bind({});

自定义渲染.args = {
  formLineNum: 2,
  columns: [
    {
      title: "基础配置1",
      group: "分组1",
      formLineNum: 1,
      key: "first",
      renderForm: {
        type: "DatePicker"
      }
    },
    {
      title: "基础配置2",
      formLineNum: 1,
      group: "分组1",
      key: "second",
      renderForm() {
        return <div>自定义渲染</div>;
      }
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
