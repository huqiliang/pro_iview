<template>
  <div class="home">
    <!-- <pro-form :columns="autoData.columns" v-model="autoData.value"></pro-form> -->
    <Button @click="click">aaa</Button>
    <pro-table
      ref="table"
      :request="request"
      :map="map"
      :toolBar="toolBar"
      :columns="columns"
      :submitForm="submitForm"
      :search="search"
      :format="format"
      @on-row-click="tableAction"
      :form="form"
      :autoFetch="true"
      :hide="hide"
      :toolBarActions="toolBarActions"
    >
    </pro-table>

    <!-- <pro-table :columns="columns" :searchLineNum="5"> </pro-table> -->
  </div>
</template>

<script>
/* eslint-disable*/
import axios from "axios";
import dayjs from "dayjs";
export default {
  name: "Home",
  data() {
    return {
      hide: { table: false },
      toolBarActions: [
        "new",
        {
          key: "test",
          renderItem() {
            return (
              <Button
                type="primary"
                onclick={() => {
                  console.log("自定义按钮");
                }}
              >
                编辑
              </Button>
            );
          }
        },
        "refresh",
        "rowSetting"
      ],
      search: { searchLineNum: 3, value: { createUser3: "gg" } },
      form: { labelPosition: "right" },
      data: [
        {
          cataLog: "33",
          createUser: "222"
        }
      ],
      toolBar: true,
      autoData: {
        columns: [
          {
            title: "标题",
            key: "toolBar",

            type: "radio"
          }
        ],
        value: {
          toolBar: false
        }
      },
      format: {
        // formatCurrent({ page }) {
        //   const { current, pageSize } = page;
        //   return { ...page, current: (current - 1) * pageSize };
        // }
        formatCurrent: "(page.current - 1) * page.pageSize"
      },
      columns: [
        {
          title: "cataLog",
          group: "B",
          key: "cataLog",
          disabled: true,
          renderSearch: {
            type: "Radio"
          },
          renderForm: {
            type: "DatePicker",
            props: {
              placeholder: "lastDate",
              format: "yyyy-MM-dd hh:mm:ss"
            },
            format(value) {
              return value ? dayjs(value).format("YYYY-MM-DD hh:mm:ss") : "";
            }
          },
          renderTable: () => {
            return (
              <Button
                onclick={() => {
                  console.log("aaa");
                }}
              >
                aaa
              </Button>
            );
          }
        },
        {
          title: "createUser",
          key: "createUser",
          renderSearch: ({ value, input }) => {
            return (
              <Select value={value} oninput={input} clearable>
                <Option value="1">1</Option>
              </Select>
            );
          }
        },
        {
          title: "form",
          key: "form",
          renderForm() {
            return (
              <Button
                onclick={() => {
                  const myData = "mu";
                  input(myData);
                }}
              >
                aaa
              </Button>
            );
          }
        },
        {
          title: "createUser3",
          disabled: true,
          renderForm: {
            type: "DatePicker",
            style: {
              width: "100%"
            }
          },
          key: "createUser2"
        },
        {
          title: "createUser3",
          renderForm: {
            type: "i-switch"
          },
          key: "createUser3"
        },
        {
          title: "createUser4",
          renderForm: {
            type: "Select",
            children: []
          },
          key: "createUser4"
        },
        {
          title: "createUs3er4",
          key: "createUs3er4"
        },
        {
          title: "descript",
          tooltip: true,
          tooltipMaxWidth: 700,
          key: "descript"
        },
        {
          title: "操作",
          key: "action",
          actions: [
            {
              title: "新增",
              type: "new"
            },
            {
              title: "测试",
              action(params) {
                console.log("====================================");
                console.log(params);
                console.log("====================================");
              }
            },
            {
              title: "编辑",
              method: "POST",
              type: "edit",
              request: "http://192.168.0.38:3000/mock/67/sys/sysOptionList"
              // request(options) {
              //   console.log(options);
              //   return axios.post(
              //     "http://192.168.0.38:3000/mock/67/sys/sysOptionList",
              //     {
              //       a: options.row.cateLog
              //     }
              //   );
              // }
            },
            {
              type: "delete",
              title: "删除",
              request: "http://127.0.0.1:7068/api/v1/users/1",
              method: "DELETE"
            }
            // {
            //   title: "删除",
            //   type: "delete",
            //   // method: "delete",
            //   // request: "/id",
            //   keys: ["id"]
            // }
          ]
        }
      ],
      // request: "http://192.168.0.38:3000/mock/106/api/table",
      request(options) {
        // console.log(options);
        return axios.get("http://192.168.0.38:3000/mock/106/api/table", {
          headers: {
            nomsg: true
          },
          params: { ...options }
        });
      },
      map: {
        dataPath: "data",
        totalPath: "totalRows"
      },
      submitForm: "http://192.168.0.38:3000/mock/106/api/table"
    };
  },
  async mounted() {
    const res = await this.$http.get(
      "http://192.168.0.38:3000/mock/106/api/table",
      {
        headers: {
          nomsg: true
        }
      }
    );
    console.log("====================================");
    console.log(this.columns[5]);
    console.log("====================================");
    this.columns[5].renderForm.children = [
      {
        type: "i-option",
        props: {
          value: "aa",
          label: "New York"
        }
      }
    ];
    console.log("====================================");
    console.log(this.columns);
    console.log("====================================");
    // this.$success(res);
  },
  methods: {
    tableAction() {
      console.log("a");
    },
    click() {
      this.$set(this.search.value, "createUser3", "123");
      this.$refs["table"].fetch();
      // this.toolBar = false;
      this.$set(this.data, 0, {
        createUser: "aa"
      });
    },
    table() {
      const ref = this.$refs.proSearch;
      console.log(ref.value);
    }
  }
};
</script>
<style>
.home {
  width: 70%;
  margin: 0 auto;
}
</style>
