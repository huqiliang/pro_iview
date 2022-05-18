import Vue from "vue";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import ProSearch from "../packages/components/ProSearch.vue";

import "../examples/libs/http";
Vue.use(ViewUI);
// Vue.use(ProComponents);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Example/ProSearch",
  component: ProSearch,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    position: { description: "显示方式" },
    loading: { description: "控制按钮是否旋转" },

    value: { description: "搜索数据集合,支持v-model" },
    searchLableWidth: { description: "单项label的宽度" },
    searchLineNum: {
      description: "一行显示几项"
    },
    columns: {
      description: "显示项配置集合",
      defaultValue: [
        {
          title: "first",
          key: "first"
        },
        {
          title: "second",
          key: "second"
        }
      ]
    }
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ProSearch },
  template: '<pro-search v-bind="$props"/>'
});

export const 基本配置 = Template.bind({});

export const 自定义渲染 = Template.bind({});

自定义渲染.args = {
  formLineNum: 2,
  columns: [
    {
      title: "first",
      formLineNum: 1,
      key: "first",
      renderForm: {
        type: "DatePicker"
      }
    },
    {
      title: "second",
      formLineNum: 1,
      key: "second",
      renderForm() {
        return <div>自定义渲染</div>;
      }
    },
    {
      title: "third",
      key: "third",
      renderSearch() {
        return <span>自定义组件</span>;
      }
    },
    {
      title: "four",
      key: "four",
      renderSearch: {
        type: "i-switch"
      }
    }
  ]
};
