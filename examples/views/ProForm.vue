<template>
  <div>
    <div>{{ config }}</div>
    <div>{{ form }}</div>
    <pro-form :formLineNum="2" :columns="config" v-model="form"></pro-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      config: [
        {
          renderForm: {
            type: "pro-select",
            props: {
              list: [
                { value: "large", title: "大" },
                { value: "small", title: "小" },
                { value: "default", title: "默认" }
              ]
            }
          },
          default_value: null,
          formLineNum: 2,
          uuid: "2",
          component_id: "71f67661c7d34249aa38d263fe7dea97",
          type: "pro-select",
          title: "大小",
          required: false,
          key: "size",
          values: "large,small,default",
          value_type: null,
          descript: "开关的尺寸"
        },
        {
          renderForm: { type: "ColorPicker" },
          default_value: null,
          uuid: "3",
          component_id: "71f67661c7d34249aa38d263fe7dea97",
          title: "打开背景",
          required: false,
          key: "true-color",
          values: null,
          value_type: null,
          descript: "自定义打开时的背景色\t"
        }
      ]
    };
  }
};
</script>

<style></style>
