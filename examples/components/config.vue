<template>
  <div class="config">
    <Button @click="rightDrawer = true" type="primary">页面配置</Button>
    <Drawer
      class="drawer"
      v-model="rightDrawer"
      width="700"
      :mask-closable="false"
    >
      <Tabs value="datas" style="width:100%">
        <TabPane label="数据源配置" name="datas">
          <pro-form
            :label-width="90"
            :columns="datasFormcolumns"
            :value="value"
            @input="input"
          ></pro-form>
          <Button type="primary" @click="reget">重新请求</Button>
        </TabPane>
        <TabPane label="数据项配置" name="base">
          <Button @click="addList" type="primary">增加</Button>
          {{ value.columns }}
          <Table :columns="sourceTableColoumns" :data="value.columns"></Table>
        </TabPane>
        <TabPane label="表单配置" name="form">表单配置的内容</TabPane>
      </Tabs>
      <div class="config-footer">
        <span style="margin-right:10px;font-size:12px;">( 同步至服务器 )</span>
        <Button style="margin-right: 8px" @click="value3 = false">重置</Button>
        <Button type="primary" @click="value3 = false">保存</Button>
      </div>
    </Drawer>
    <Modal @on-ok="change" v-model="renderModal" title="自定义render">
      <pro-form :columns="renderColumns" v-model="renderValues"></pro-form>
    </Modal>
  </div>
</template>
<script>
import _ from "lodash";
import StrToComp from "./strToComp";

export default {
  props: {
    value: Object
  },
  data() {
    return {
      renderModal: false,
      rightDrawer: true,
      selectedItem: {},
      renderValues: {},
      sourceTableColoumns: [
        {
          title: "Key",
          key: "key"
        },
        {
          title: "标题",
          key: "title",
          render: (h, params) => {
            return (
              <Input
                value={params.row.title}
                onInput={value => {
                  this.$set(this.value.columns[params.index], "title", value);
                }}
              >
                <Button
                  onclick={() => {
                    this.restore(params);
                  }}
                  slot="append"
                  size="small"
                  type="primary"
                >
                  恢复
                </Button>
              </Input>
            );
          }
        },
        {
          renderHeader: () => {
            const list = [
              {
                title: "NT",
                content: "不在table显示(NotShowTable)"
              },
              {
                title: "NS",
                content: "不在Search显示(NotShowSearch)"
              },
              {
                title: "NF",
                content: "不在Form显示(NotShowForm)"
              }
            ];
            return _.map(list, value => {
              return (
                <Tooltip
                  key={value.title}
                  transfer
                  class="toolTip"
                  style="margin-right:5px"
                  content={value.content}
                >
                  {value.title}
                </Tooltip>
              );
            });
          },
          render: (h, params) => {
            const list = ["notShowTable", "notShowSearch", "notShowForm"];
            return (
              <div>
                {_.map(list, type => {
                  return (
                    <Checkbox
                      value={params.row[type]}
                      onInput={value => {
                        this.$set(
                          this.value.columns[params.index],
                          type,
                          value
                        );
                      }}
                    ></Checkbox>
                  );
                })}
              </div>
            );
          }
        },
        {
          title: "自定义",
          render: (h, params) => {
            return (
              <Button
                onclick={() => {
                  this.showRenderModal(params);
                }}
                slot="append"
                size="small"
                type="primary"
              >
                配置
              </Button>
            );
          }
        }
      ],
      renderColumns: [
        {
          title: "Table自定义",
          key: "renderTable",
          renderForm: {
            type: "Input",
            props: {
              type: "textarea",
              maxlength: 2000,
              showWordLimit: true
            }
          }
        },
        {
          title: "Search自定义",
          key: "renderSearch",
          renderForm: {
            type: "i-input",
            props: {
              type: "textarea",
              maxlength: 2000,
              showWordLimit: true
            }
          }
        },
        {
          title: "Form自定义",
          key: "renderForm",
          renderForm: {
            type: "i-input",
            props: {
              type: "textarea",
              maxlength: 2000,
              showWordLimit: true
            }
          }
        }
      ],
      datasFormcolumns: [
        {
          title: "配置方式",
          key: "request",
          rules: {
            required: true
          }
        },
        {
          title: "请求配置",
          key: "method",
          renderForm({ value, input }) {
            return (
              <Select value={value} onInput={input}>
                <Option value="GET">GET</Option>
                <Option value="POST">POST</Option>
              </Select>
            );
          }
        },
        {
          title: "数据路径",
          key: "map.dataPath",
          rules: {
            required: true
          }
        },
        { title: "分页总数", key: "map.totalPath" }
      ]
    };
  },
  methods: {
    addList() {
      this.value.columns.unshift({
        title: "ee",
        notShowTable: true,
        notShowSearch: true,
        notShowForm: true,
        render() {
          return <Input />;
        }
      });
    },
    setValue(type) {
      const value = _.get(this.renderValues, type);
      let obj = {};
      if (value) {
        console.log(type);
        console.log(value);

        const html = _.cloneDeep(value);
        obj[type] = () => {
          return <StrToComp html={html}></StrToComp>;
        };
        console.log(this.value.columns[this.selectedItem.index]);
        console.log(obj[type]);
        this.$set(this.value.columns[this.selectedItem.index], type, obj[type]);
      }
    },
    change() {
      this.setValue("renderTable");
      this.setValue("renderSearch");
      this.setValue("renderForm");
    },
    showRenderModal(params) {
      this.selectedItem = params;
      this.renderModal = true;
    },
    restore(params) {
      this.$set(this.value.columns[params.index], "title", params.row.key);
    },
    input(value) {
      this.$emit("input", value);
    },
    reget() {
      this.$emit("reget");
    }
  }
};
</script>
<style lang="less">
.ivu-drawer-body {
  padding: 16px 0 !important;
}
.ivu-tabs-tabpane {
  padding: 0 20px;
}
.drawer {
  .config-footer {
    height: 50px;
    width: 700px;
    position: fixed;
    bottom: 0;
    right: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }
}
.columnItem {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.configPane {
  height: calc(100vh - 200px);
  overflow: scroll;
  .columnsConfig {
    display: flex;
    line-height: 33px;
    justify-content: space-between;
    margin: 5px 0;
    padding: 5px 10px;
    .left,
    .right,
    .configAdd {
      width: 100px;
    }
    .middle {
      width: 180px;
    }
  }
  .fsAdd {
    font-weight: bold;
    font-size: 14px;
  }
  .columnsConfigOnly:hover {
    background: #eee;
  }
}
</style>
