import Vue from "vue";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import ProComponents from "../packages/index";

import "../examples/libs/http";
Vue.use(ViewUI);
Vue.use(ProComponents);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Example/ProTable",
  // component: ProComponents,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    request: {
      table: {
        type: {
          summary: "API接口请求地址"
        }
      },
      defaultValue: "http://192.168.0.38:3000/mock/106/api/table"
    },
    toolBar: {
      name: "toolBar",
      ttile: "是否显示标题栏",
      table: {
        type: {
          summary: "控制toolBar的显示与隐藏"
        },
        defaultValue: { summary: "true" }
      },
      defaultValue: true,
      control: { type: "boolean" }
    }
    // size: {
    //   control: { type: "select" },
    //   options: ["small", "medium", "large"]
    // }
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  // components: { ProComponents },
  template: '<pro-table v-bind="$props"/>'
});

export const Base = Template.bind({});
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
