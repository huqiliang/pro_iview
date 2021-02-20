<template>
  <div class="config">
    <Button @click="rightDrawer = true" type="primary">页面配置</Button>
    <Drawer v-model="rightDrawer" width="700" :mask-closable="false">
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
          <div class="configPane">
            <div class="columnsConfig fsAdd">
              <div class="left">Key</div>
              <div class="middle" style="text-align:center;">
                标题
              </div>
              <div class="right">
                <Tooltip
                  v-for="item in notShowListTitle"
                  :key="item.title"
                  class="toolTip"
                  style="margin-right:5px"
                  :content="item.content"
                >
                  {{ item.title }}
                </Tooltip>
              </div>
              <div class="configAdd">
                Render
              </div>
            </div>
            <div
              class="columnsConfig columnsConfigOnly"
              v-for="item in value.columns"
              :key="item.key"
            >
              <div class="left">
                <p>{{ item.key }}</p>
              </div>
              <div class="middle">
                <Input v-model="item.title">
                  <Button
                    @click="restore(item)"
                    slot="append"
                    size="small"
                    type="primary"
                    >恢复</Button
                  >
                </Input>
              </div>
              <div class="right">
                <Checkbox v-model="item.notShowTable"></Checkbox>
                <Checkbox v-model="item.notShowSearch"></Checkbox>
                <Checkbox v-model="item.notShowForm"></Checkbox>
              </div>
              <div class="configAdd">
                <Button type="primary" @click="showRenderModal(item)"
                  >配置</Button
                >
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane label="表单配置" name="form">表单配置的内容</TabPane>
      </Tabs>
      <div class="config-footer">
        <span style="margin-right:10px;font-size:12px;">( 同步至服务器 )</span>
        <Button style="margin-right: 8px" @click="value3 = false">重置</Button>
        <Button type="primary" @click="value3 = false">保存</Button>
      </div>
    </Drawer>
    <Modal v-model="renderModal" title="自定义render">
      <p>Content of dialog</p>
      <p>
        <Input
          ref="input"
          v-model="selectedItem"
          maxlength="100"
          show-word-limit
          type="textarea"
          placeholder="Enter something..."
          style="width: 200px"
        />
      </p>
      <Button @click="change">change</Button>
      <p>Content of dialog</p>
    </Modal>
  </div>
</template>
<script>
export default {
  props: {
    value: Object
  },
  data() {
    return {
      renderModal: false,
      rightDrawer: true,
      selectedItem: "",
      seItem: {},
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
      ],
      notShowListTitle: [
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
      ]
    };
  },
  methods: {
    change() {
      console.log(new Function(this.selectedItem));
      console.log(this.seItem.renderTable);
      this.seItem.renderTable = new Function(this.selectedItem);
      console.log(this.seItem);
    },
    showRenderModal(item) {
      this.seItem = item;
      this.selectedItem = item.renderTable;
      this.renderModal = true;
    },
    restore(item) {
      item.title = item.key;
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
.config-footer {
  height: 50px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
.columnItem {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.configPane {
  height: calc(100vh- 55px);
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
