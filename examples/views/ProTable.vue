<template>
  <div class="table">
    <div>datas:{{ datas }}</div>
    <div>{{ gg }}</div>
    <pro-table v-bind="config2" v-model="datas"></pro-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gg: "gg",
      datas: [],
      config2: {
        modal: {
          "mask-closable": false
        },
        toolBarActions: ["new", "refresh", "fullscreen", "rowSetting"],
        request: "http://192.168.0.38:3000/mock/106/api/table",
        columns: [
          {
            title: "userId",
            key: "userId",
            notShowLabel: true,
            renderSearch: {
              type: "DatePicker",
              props: {
                type: "daterange"
              },
              format: {
                formatWapper: true,
                value:
                  "{start:this.$dayjs(value[0]).format('YYYY-MM-DD'),end:this.$dayjs(value[1]).format('YYYY-MM-DD')}"
              }
            },
            renderForm: {
              type: "DatePicker"
              // props: {
              //   type: "daterange"
              // }
              // format: {
              //   formatWapper: true,
              //   value:
              //     "{start:this.$dayjs(value[0]).format('YYYY-MM-DD'),end:this.$dayjs(value[1]).format('YYYY-MM-DD')}"
              // }
            },
            form: {
              labelPosition: "right",
              formLineNum: 2,
              value: { createUser8: false }
            },
            formWidth: 60,
            rules: [
              {
                title: "必填",
                code: "required",
                required: true,
                pattern: ".+",
                message: "输入框必填",
                trigger: "blur,change"
              }
            ]
          },
          {
            title: "id",
            key: "id",
            notShowTable: true,
            notShowRowSetting: true,
            renderForm: {
              type: "DatePicker",
              props: {
                type: "daterange"
              }
            },
            renderSearch: {
              type: "DatePicker",
              format: "this.$dayjs(value).format('YYYY-MM-DD')"
            }
          },
          {
            title: "body",
            key: "body",
            notShowTable: true,
            rules: [
              {
                title: "必填",
                code: "required",
                required: true,
                message: "输入框必填",
                trigger: "blur,change"
              }
            ]
          },
          {
            minWidth: 90,
            formWidth: 20,
            align: "center",
            title: "状态",
            key: "createUser8",
            // renderSearch: { type: "Select", props: {} },
            renderSearch() {
              return (
                <Select>
                  <Option value="F">开</Option>
                  <Option value="T">关</Option>
                </Select>
              );
            },
            renderForm: {
              type: "i-switch",
              props: {
                value: "F",
                "true-value": "T",
                "false-value": "F"
              },
              scopedSlots: [
                {
                  name: "open",
                  title: "开"
                },
                {
                  name: "close",
                  title: "关"
                }
              ]
            }
            // renderForm: ({ value, input }) => {
            //   return (
            //     <i-switch value={value} oninput={input} clearable>
            //       <span value="F" slot="open">
            //         开
            //       </span>
            //       <span value="T" slot="close">
            //         关
            //       </span>
            //     </i-switch>
            //   );
            // }
          }
        ]
        // map: {
        //   current: "firstResult",
        //   pageSize: "page",
        //   dataPath: "data",
        //   totalPath: "totalRows",
        //   message: "message"
        //   // success: "code===3004"
        // }
      }
    };
  }
};
</script>

<style></style>
