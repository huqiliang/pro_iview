<template>
  <pro-table v-bind="config"></pro-table>
</template>

<script>
export default {
  data() {
    return {
      config: {
        toolBarActions: ["new", "refresh", "fullscreen", "rowSetting"],
        request: "http://192.168.0.38:3000/mock/106/api/table",
        columns: [
          {
            title: "userId",
            key: "userId",
            renderForm: { type: "Input" },
            formWidth: 60,
            validate: [
              {
                title: "必填",
                code: "required",
                required: true,
                message: "输入框必填",
                trigger: "change",
                type: null
              }
            ]
          },
          { title: "id", key: "id" },
          { title: "body", key: "body" },
          {
            minWidth: 90,
            formWidth: 20,
            align: "center",
            title: "状态",
            key: "createUser8",
            renderTable: {
              type: "i-switch",
              props: {
                disabled: true,
                "true-value": "T",
                "false-value": "F"
              }
            },
            // renderSearch: { type: "Select", props: {} },
            renderSearch: ({ value, input }) => {
              return (
                <Select value={value} oninput={input} clearable>
                  <Option value="F">开</Option>
                  <Option value="T">关</Option>
                </Select>
              );
            },
            renderForm: ({ value, input }) => {
              return (
                <i-switch value={value} oninput={input} clearable>
                  <span value="F" slot="open">
                    开
                  </span>
                  <span value="T" slot="close">
                    关
                  </span>
                </i-switch>
              );
            }
          }
        ],
        map: {
          current: "firstResult",
          pageSize: "page",
          dataPath: "data",
          totalPath: "totalRows",
          message: "message"
          // success: "code===3004"
        }
      }
    };
  }
};
</script>

<style></style>
