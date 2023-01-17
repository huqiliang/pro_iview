<template>
  <div>
    <div>{{ config }}</div>
    <div>{{ form }}</div>
    <pro-form
      :submitForm="submitForm"
      :formLineNum="2"
      :columns="config"
      v-model="form"
    ></pro-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { gg: "" },
      submitForm: {
        position: "left",
        request: "/api/pages",
        complete(res) {
          console.log(res);
        }
      },
      config: [
        {
          title: "cc",
          key: "gg.cc",
          rules: [{ required: true, message: "报表类型必填" }],
          renderForm: {
            type: "ProSelect",
            props: {
              list: [
                {
                  title: "数据报表",
                  value: "REPORT"
                },
                {
                  title: "数据看板",
                  value: "LOOKUP"
                }
              ]
            }
          }
        },
        {
          renderForm() {
            return (
              <pro-select
                list={[
                  { value: "large", title: "大" },
                  { value: "small", title: "小" },
                  { value: "default", title: "默认" }
                ]}
              ></pro-select>
            );
          },
          default_value: null,
          formLineNum: 2,
          uuid: "2",
          component_id: "71f67661c7d34249aa38d263fe7dea97",
          type: "pro-select",
          title: " ",
          required: false,
          key: "size",
          values: "large,small,default",
          value_type: null,
          descript: "开关的尺寸"
        },
        {
          title: "aa",
          key: "aa",
          renderForm() {
            return (
              <span>
                <Button>确定</Button>
              </span>
            );
          }
        },
        {
          title: "Bbb",
          key: "cbb",
          renderForm() {
            return <DatePicker></DatePicker>;
          }
        },
        {
          renderForm({ value, input }) {
            return (
              <pro-select
                request={{
                  url: "http://192.168.0.38:3000/mock/106/api/table",
                  method: "get"
                }}
                method="POST"
                value={value}
                onInput={input}
                map={{
                  // 请求数据路径映射
                  dataPath: "data",
                  // 数据显示 支持es6表达式 例如${descriptEn} - ${descript} 或者 (${descriptEn})
                  titlePath: "remark",
                  // 链接v-model定义的数据项
                  valuePath: "isHalt"
                }}
              ></pro-select>
            );
          }
        },
        {
          renderForm({ value, input }) {
            return (
              <pro-select
                request={{
                  url: "http://192.168.0.38:3000/mock/106/api/table2",
                  method: "get"
                }}
                value={value}
                onInput={input}
                map={{
                  // 请求数据路径映射
                  dataPath: "data",
                  // 数据显示 支持es6表达式 例如${descriptEn} - ${descript} 或者 (${descriptEn})
                  titlePath: "descriptEn",
                  // 链接v-model定义的数据项
                  valuePath: "isHalt"
                }}
              ></pro-select>
            );
          }
        }
      ]
    };
  }
};
</script>

<style></style>
