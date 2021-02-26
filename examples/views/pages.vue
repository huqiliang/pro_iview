<template>
  <div class="pages">
    <div class="split">
      <Split v-model="split">
        <div slot="left" class="split-pan-left">
          <div class="language">
            <Button style="margin-right:10px">项目配置</Button>
            <!-- <Button
              type="primary"
              style="margin-right:10px"
              @click="change('zh-CN')"
              >中文</Button
            >
            <Button @click="change('en-US')">English</Button> -->
          </div>
          <Tree
            :data="pageMenus"
            :render="renderContent"
            class="tree-render"
            @on-select-change="selectPage"
          ></Tree>
        </div>
        <div slot="right" class="split-pane-right">
          <config ref="config" @reget="reget" v-model="tableConfig"></config>
          <div class="tableConfig" v-show="tableConfig.columns">
            <div class="tableText">不包含此空白区域</div>
            <div class="tableText2">不包含此空白区域</div>
            <div class="tableText3">不包含此空白区域</div>
            <div class="tableText4">不包含此空白区域</div>
            <div class="tableConfigInner">
              <pro-table
                ref="proTable"
                v-bind="tableConfig"
                v-if="proTableShow"
              >
              </pro-table>
            </div>
          </div>
        </div>
      </Split>
    </div>
    <Modal
      v-model="addPageModal.show"
      title="增加页面"
      @on-ok="addPage"
      @on-cancel="cancel"
    >
      <ProForm
        style="width:80%;margin:20px auto;"
        v-model="pageName"
        :label-width="90"
        :columns="addPageModal.columns"
      ></ProForm>
    </Modal>
  </div>
</template>

<script>
import pageMenusService from "../service";
import config from "../components/config";
import _ from "lodash";
export default {
  data() {
    return {
      configTableDatas: "",
      pageName: {},
      tableConfig: {
        request: "https://yapi.ihotel.cn/mock/106/api/table",
        map: {
          dataPath: "data",
          totalPath: "totalRows"
        }
      },
      addPageModal: {
        show: false,
        columns: [
          {
            title: "页面名称",
            key: "name"
          }
        ]
      },
      split: 0.23,
      request: "",
      pageMenus: []
    };
  },
  computed: {
    proTableShow() {
      return !_.isEmpty(this.tableConfig);
    }
  },
  async mounted() {
    this.fetchPageMenus();
    if (!this.tableConfig.columns) {
      console.log(this.$refs);
      this.$refs.config.openRightDrawer();
    }
  },
  methods: {
    reget() {
      this.$refs.proTable.fetch(data => {
        this.$Message.info({
          content: data.msg
        });
        const res = this.$refs.proTable.getDatas();
        if (!_.isEmpty(res.table) && res.table.length > 0) {
          let arr = [];
          _.map(res.table[0], (val, key) => {
            arr.push({
              title: key,
              key
            });
          });
          this.$set(this.tableConfig, "columns", arr);
        }
      });
    },
    async fetchPageMenus() {
      const pageMenus = await pageMenusService.getPageMenus();
      this.pageMenus = pageMenus.data;
    },
    async removePageMenus(data) {
      const res = await pageMenusService.removePageMenus(data);
      console.log(res);
    },
    async addPage() {
      const res = await pageMenusService.addPageMenus(this.pageName);
      if (res.data) {
        this.fetchPageMenus();
        this.pageName = {};
      }
    },
    async selectPage(node, page) {
      const { id } = page;
      const res = await pageMenusService.getPageConfig(id);
      if (res.data) {
        this.tableConfig = res.data;
      }
    },
    cancel() {
      this.pageName = {};
    },
    openAddModal() {
      this.addPageModal.show = true;
    },
    renderContent(h, { node, data }) {
      return (
        <span class="tr">
          <span class="left">{data.title}</span>
          <span class="right">
            {_.isUndefined(node.parent) ? (
              <Button
                type="primary"
                icon="ios-add"
                style="width:70px"
                class="mr8"
                onclick={() => {
                  this.openAddModal(data);
                }}
              ></Button>
            ) : (
              <span>
                <Button
                  icon="ios-add"
                  onclick={() => {
                    this.openAddModal(data);
                  }}
                  class="mr8"
                ></Button>
                <Button
                  icon="ios-remove"
                  class="mr8"
                  onclick={() => {
                    this.removePageMenus(data);
                  }}
                ></Button>
              </span>
            )}
          </span>
        </span>
      );
    }
  },
  components: {
    config
  }
};
</script>
<style lang="less">
.pages {
  .language {
    border-bottom: 1px dashed #ccc;
    padding-bottom: 20px;
    margin-bottom: 10px;
  }
  .ivu-tree-arrow {
    margin-top: 5px;
  }
  .mr8 {
    margin-right: 8px;
  }
  .split {
    border: 1px solid #dcdee2;
  }
  .split-pane {
    padding: 10px;
  }
  .split-pan-left {
    padding: 10px 20px;
    height: 100%;
  }
  .split-pane-right {
    padding: 10px 20px;
  }
  .tableConfig {
    border: 1px dashed #ccc;
    margin: 20px 0;
    padding: 10px;
    position: relative;
    display: flex;
    .tableText {
      font-size: 6px;
      text-align: center;
      position: absolute;
      top: 1px;
      left: 0;
      width: 100%;
      color: #ccc;
    }
    .tableText2 {
      font-size: 6px;
      text-align: center;
      position: absolute;
      align-self: center;
      writing-mode: tb-rl;
      left: 0;
      color: #ccc;
    }
    .tableText3 {
      font-size: 6px;
      text-align: center;
      position: absolute;
      align-self: center;
      writing-mode: tb-rl;
      right: 0;
      color: #ccc;
    }
    .tableText4 {
      font-size: 6px;
      text-align: center;
      position: absolute;
      bottom: 1px;
      width: 100%;
      color: #ccc;
    }
    .tableConfigInner {
      margin: 10px;
      border: 1px dashed #eee;
    }
  }
  .tree-render .ivu-tree-title {
    width: 100%;
  }
  .tr {
    width: 100%;
    line-height: 32px;
    .left {
      width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      float: left;
    }
    .right {
      float: right;
    }
  }
}
</style>
