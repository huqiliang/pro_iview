<template>
  <div class="table">
    <div>datas:{{ datas }}</div>
    <pro-table v-bind="config" v-model="datas"></pro-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: [],
      config: {
        toolBarActions: ["new", "refresh", "fullscreen", "rowSetting"],
        request: "http://192.168.0.38:3000/mock/106/api/table",
        columns: [
          {
            title: "isHalt",
            key: "isHalt",
            renderSearch: {
              type: "DatePicker",
              props: { type: "daterange" },
              format: {
                formatWapper: true,
                value:
                  "{start:this.$dayjs(value[0]).format('YYYY-MM-DD'),end:this.$dayjs(value[1]).format('YYYY-MM-DD')}"
              }
            }
          },
          { title: "descriptEn", key: "descriptEn", notShowTable: true },
          { title: "sss", key: "descriptEn", notShowSearch: true },
          {
            title: "descriptEn",
            key: "descriptEn",
            notShowTable: true,
            notShowSearch: true
          },
          { title: "createUser", key: "createUser" },
          { title: "createDatetime", key: "createDatetime" },
          { title: "modifyDatetime", key: "modifyDatetime" },
          { title: "id", key: "id" },
          { title: "cataLog", key: "cataLog" },
          { title: "item", key: "item" },
          { title: "setValue", key: "setValue" },
          { title: "defValue", key: "defValue" },
          { title: "isMod", key: "isMod" },
          { title: "", key: "remark" },
          { title: "descript", key: "descript" },
          { title: "createUser8", key: "createUser8" }
        ],
        map: { dataPath: "data", totalPath: "data[1].descript" },
        hide: { search: false },
        search: { position: "left" },
        submitForm: {
          request: "http://192.168.0.38:3000/mock/106/api/save",
          method: "POST"
        }
      },
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
            renderForm: {
              type: "DatePicker",
              props: {
                type: "daterange"
              }
            },
            renderSearch: {
              type: "DatePicker",
              format: "this.$dayjs(value).format('YYYY-MM-DD')"
            },
            rules: [
              {
                title: "日期起止必填",
                code: "requiredDatePicker",
                type: "array",
                required: true,
                fields: {
                  0: {
                    type: "date",
                    required: true,
                    message: "请选择起止日期"
                  },
                  1: { type: "date", required: true, message: "请选择起止日期" }
                },
                trigger: "blur,change"
              }
            ]
          },
          {
            title: "body",
            key: "body",
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
            renderSearch: ({ value, input }) => {
              return (
                <Select value={value} oninput={input} clearable>
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
