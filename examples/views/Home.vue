<template>
  <div class="home">
    <!-- <pro-form :columns="autoData.columns" v-model="autoData.value"></pro-form> -->
    <Button @click="click">修改数据并刷新</Button>
    <Button @click="getDatas">获取所有数据</Button>
    <Button @click="push">插入</Button>
    <Tabs v-model="tabValue">
      <TabPane label="标签一" name="name1">
        <pro-table
          v-if="tabValue === 'name1'"
          v-model="value3"
          @search:searchReset="searchReset"
          @modal:on-visible-change="change"
          @on-row-click="tableAction"
          ref="table"
          :table="{ border: true }"
          :request="request"
          :map="map"
          :columns="columns"
          :search="search"
          :submitForm="submitForm"
          :format="format"
          :form="form"
          :autoFetch="true"
          :hide="hide"
          :toolBarActions="toolBarActions"
          :pageSize="pageSize"
        >
          <div slot="tableTip">this is tableTip Value</div>
        </pro-table>
      </TabPane>
      <TabPane label="标签二" name="name2">
        <pro-table v-if="tabValue === 'name2'"></pro-table>
      </TabPane>
    </Tabs>
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
      tabValue: "name1",
      value3: [],
      pageSize: 30,
      hide: { table: false },
      toolBarActions: [
        "new",
        "fullscreen",
        {
          key: "test",
          renderItem(a) {
            return (
              <Button
                type="primary"
                onclick={() => {
                  this.tableAction({ type: "new" });
                }}
              >
                自定义按钮2
              </Button>
            );
          }
        },
        "refresh",
        "rowSetting"
      ],
      search: {
        upDown: false,
        searchLineNum: 2,
        value: {
          createUser3: "gg",
          createUser: "ggg2",
          createUser10: "2012-12-10"
        }
      },
      form: {
        labelPosition: "right",
        formLineNum: 2,
        value: { createUser10: "gg" }
      },

      data: [
        {
          cataLog: "33",
          createUser: "222"
        }
      ],
      cascader_data: [
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "gugong",
              label: "故宫"
            },
            {
              value: "tiantan",
              label: "天坛"
            },
            {
              value: "wangfujing",
              label: "王府井"
            }
          ]
        }
      ],
      autoData: {
        columns: [
          {
            title: "标题",
            key: "toolBar",
            type: "radio",
            props: {
              value: true
            }
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
          title: "bbb",
          key: "arr",
          searchLineNum: "3",
          renderSearch: {
            type: "DatePicker",
            props: { type: "daterange", "split-panels": true, editable: true }
          },
          width: "200"
        },
        {
          rules: [{ required: true, message: "手机号信息必填" }],
          title: "信息必填手机号信息必填",
          notShowRowSetting: true,
          group: "B",
          key: "cataLog",
          disabled: true,
          width: 100,
          ellipsis: true,
          tooltip: true,
          tooltipMaxWidth: 300,
          toolTips: { form: true },
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
          }
          // renderTable: row => {
          //   return row.show ? (
          //     <Button
          //       onclick={() => {
          //         console.log("aaa");
          //       }}
          //     >
          //       aaa
          //     </Button>
          //   ) : null;
          // }
        },
        {
          title: "中文公共中文",
          notShowRowSetting: true,

          showForm(form) {
            return form.type == "new";
          },
          key: "createUser",
          resizable: true,
          width: 100,
          renderForm: ({ value, input }) => {
            return (
              <pro-select
                // request="http://192.168.0.38:3000/mock/106/api/table"
                map={{
                  titlePath: "userName",
                  valuePath: "userId"
                }}
                value={value}
                onInput={input}
                list={[
                  { userId: "114600704458493952", userName: "sss" },
                  { userId: "222", userName: "sss" }
                ]}
                clearable
              ></pro-select>
            );
          }
        },
        {
          title: "ccc",
          key: "form",
          width: 100,
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
          title: "createUser2",
          width: 100,
          searchLineNum: 1,
          formLineNum: 2,
          disabled: true,
          renderSearch: {
            type: "Slider"
          },
          renderForm() {
            return <DatePicker />;
          },
          // renderForm: {
          //   type: "DatePicker",
          //   style: {
          //     width: "100%"
          //   }
          // },
          //   renderTable: {
          //   type: "span",
          //   useExp: true,
          //   text: "value===200?'成功':'失败';console.log(value);",
          //   style: {
          //     color: "value==200?'#19be6b':'#ed4014'"
          //   }
          // },
          renderTable: (h, params) => {
            return (
              <span>{params.row.isAllow === "F" ? "黑名单" : "白名单"}</span>
            );
          },
          key: "createUser2"
        },
        {
          title: "createUser3",
          key: "createUser3",
          width: 100,
          searchLineNum: 1,
          renderForm: ({ value, input }) => {
            console.log("value", value);
            const arr = _.isEmpty(value)
              ? []
              : _.isString(value)
              ? value.split(",")
              : value;
            console.log("arr", arr);
            return (
              <i-select
                clearable
                multiple
                value={arr}
                onInput={(val) => {
                  console.log("val", val);
                  input(val);
                  this.$refs.addForm.validateField("unitScene");
                }}
              >
                <i-option value="a">a</i-option>;
                <i-option value="b">b</i-option>;
              </i-select>
            );
          }
        },
        {
          title: "createUser8",
          searchLineNum: 1,
          width: 100,
          renderSearch: {
            type: "InputNumber"
          },
          renderTable: {
            type: "i-switch",
            scopedSlots: [
              {
                name: "open",
                title(h, params) {
                  return <span>{params.value ? "开" : "关"}</span>;
                }
              },
              {
                name: "close",
                title: "关"
              }
            ]
          },
          renderForm: {
            type: "i-switch"
          },
          key: "createUser8"
        },
        {
          title: "createUser4",
          width: 100,
          renderForm: {
            type: "Select",
            children: []
          },
          renderSearch: ({ value, input }) => {
            return (
              <Cascader
                value={value || []}
                onInput={input}
                data={this.cascader_data}
                clearable
              ></Cascader>
            );
          },
          key: "createUser4"
        },
        {
          title: "creat4",
          rules: [{ required: true, message: "手机号信息必填" }],
          width: 100,

          renderForm: {
            type: "Cascader",
            props: {
              value: [],
              data: [
                {
                  value: "beijing",
                  label: "北京",
                  children: [
                    {
                      value: "gugong",
                      label: "故宫"
                    },
                    {
                      value: "tiantan",
                      label: "天坛"
                    },
                    {
                      value: "wangfujing",
                      label: "王府井"
                    }
                  ]
                }
              ]
            }
          },
          key: "createUs3er4"
        },
        {
          width: 100,
          title: "aaa",
          key: "descript",
          rules: [{ required: true, message: "手机号信息必填" }],
          renderTable: {
            type: "span",
            useExp: true,
            text: "value===200?'成功':'失败';console.log(value);",
            style: {
              color: "value==200?'#19be6b':'#ed4014'"
            }
          },
          renderForm: {
            type: "i-input",
            props: {
              type: "textarea",
              rows: 4
            }
          },
          // renderForm() {
          //   return (
          //     <Input
          //       maxlength="100"
          //       show-word-limit
          //       type="textarea"
          //       placeholder="Enter something..."
          //       rows={4}
          //     />
          //   );
          // },
          formLineNum: 2
        },
        {
          title: "defValue",
          width: 100,
          key: "defValue",
          renderSearch() {
            return <DatePicker></DatePicker>;
          }
        },
        {
          title: "createUser10f",
          width: 100,
          renderSearch: {
            type: "DatePicker",
            format(val) {
              // 格式化数据
              return dayjs(val).format("YYYY-MM-DD");
            }
          },
          key: "createUser10"
        },
        {
          title: "操作",
          fixed: "right",
          width: 100,
          key: "action",
          actions: [
            {
              title: "编辑2"
              // render: (params, action) => {
              //   return params.row.yourShow ? (
              //     <a
              //       style="margin-right:10px"
              //       onClick={() => {
              //         action({
              //           type: "edit",
              //         });
              //       }}
              //     >
              //       编辑
              //     </a>
              //   ) : null;
              // }
            },
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
              request: "http://192.168.0.38:3000/mock/106/api/save"
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
              request: "http://127.0.0.1:7068/api/v1/users/${id}",
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
      request: "http://192.168.0.38:3000/mock/106/api/table",
      // request(options) {
      //   // console.log(options);
      //   return axios.get("http://192.168.0.38:3000/mock/106/api/table", {
      //     headers: {
      //       nomsg: true
      //     },
      //     params: { ...options }
      //   });
      // },
      map: {
        current: "firstResult",
        pageSize: "page",
        dataPath: "data",
        totalPath: "totalRows",
        message: "message"
        // success: "code===3004"
      },
      submitForm: "http://192.168.0.38:3000/mock/106/api/save"
    };
  },
  async mounted() {
    // const res = await this.$http.get(
    //   "http://192.168.0.38:3000/mock/106/api/table",
    //   {
    //     headers: {
    //       nomsg: true
    //     }
    //   }
    // );
    // console.log(this.columns[5]);
    // console.log("====================================");
    // this.columns[5].renderForm.children = [
    //   {
    //     type: "i-option",
    //     props: {
    //       value: "aa",
    //       label: "New York"
    //     }
    //   }
    // ];
    // this.$success(res);
  },
  methods: {
    push() {
      this.value3.push({});
    },
    change(a) {
      console.log(a);
    },
    searchReset(data) {},
    getDatas() {
      console.log(this.$refs.table.getDatas());
    },
    tableAction() {
      console.log("table click");
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
