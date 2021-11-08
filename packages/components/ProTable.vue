<template>
  <div class="protable">
    <slot name="search">
      <ProSearch
        :columns="searchColumns"
        :loading="loading"
        v-if="!hide.search"
        v-model="form"
        @search="searchAction"
        @reset="searchReset"
        v-bind="$attrs.search"
        v-on="$listeners"
      ></ProSearch>
    </slot>
    <VueFullscreen :fullscreen.sync="fullscreen">
      <Table
        :loading="loading"
        :columns="tableColumns"
        :data="proData"
        v-if="!hide.table"
        ref="table"
        border
        v-bind="$attrs.table"
        v-on="$listeners"
      >
        <div v-show="toolBar" slot="header" class="tableHeader">
          <div class="title">{{ tableTitle }}</div>
          <div class="buttons">
            <template v-for="item in toolBarList">
              <ProTypeItem
                class="item_buttons"
                :key="item.key"
                :renderItem="item.renderItem"
              ></ProTypeItem>
            </template>
          </div>
        </div>
      </Table>
      <div class="page">
        <Page
          v-if="proData && !hide.page"
          :total="total"
          :current="page.current"
          :page-size="page.pageSize"
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
          transfer
          show-total
          show-sizer
          v-bind="$attrs.page"
          v-on="$listeners"
        />
      </div>
    </VueFullscreen>
    <Modal
      :loading="formDialog.formLoading"
      @on-ok="submit"
      @on-cancel="cancel"
      v-model="formDialog.show"
      :title="modalTitle"
    >
      <div class="content">
        <ProForm
          ref="proForm"
          :columns="formColumns"
          :type="formDialog.type"
          v-model="formDialog.proFormData"
          v-bind="$attrs.form"
          v-on="$listeners.form"
        ></ProForm>
      </div>
    </Modal>
  </div>
</template>

<script>
// import axios from "axios";
import { component } from "vue-fullscreen";
import _, { get, map, has } from "lodash";
import customRequest from "../libs/request";
import ProSearch from "./ProSearch";
import ProForm from "./ProForm";
import Locale from "../mixin/locale";
import ProTypeItem from "../components/ProTypeItem/ProTypeItem.vue";
import RowSetting from "../components/ProTable/RowSetting.vue";

export default {
  name: "ProTable",
  mixins: [Locale],
  data() {
    return {
      formDialog: {
        show: false,
        type: "view",
        proFormData: {},
        formLoading: true
      },
      fullscreen: false,
      loading: false,
      proData: [],
      searchForm: {},
      // defaultSearchValue: null,
      total: 0,
      usedRow: null,
      page: {
        current: 1,
        pageSize: 10
      },
      immutableSearchValue: ""
    };
  },
  props: {
    toolBarActions: {
      default() {
        return ["new", "refresh", "fullscreen", "rowSetting"];
      }
    },
    attrs: {
      default() {
        return {};
      }
    },
    listeners: {
      default() {
        return {};
      }
    },
    toolBar: {
      default: true
    },
    title: {
      default() {
        return "";
      }
    },
    columns: {
      default() {
        return [];
      }
    },
    method: {
      default: "GET"
    },
    request: {},
    autoFetch: {
      default() {
        return true;
      }
    },
    map: {
      default() {
        return {
          dataPath: "data",
          totalPath: "totalRows"
        };
      }
    },
    format: {
      type: Object
    },
    data: {
      type: Array
    },
    hide: {
      default() {
        return { search: false, table: false, pages: false };
      }
    },
    submitForm: {}
  },
  model: {
    prop: "data",
    event: "dataChange"
  },
  computed: {
    toolBarList() {
      const array = [
        {
          key: "new",
          renderItem: () => {
            return (
              <Button
                type="primary"
                onclick={() => {
                  this.tableAction({ type: "new" });
                }}
              >
                <Icon type="md-add" class="buttonIcon" />
                <span>{this.t("pro.common.new")}</span>
              </Button>
            );
          }
        },
        {
          key: "refresh",
          renderItem: () => {
            return (
              <Tooltip
                transfer
                placement="top"
                content={this.t("pro.common.refresh")}
              >
                <Icon
                  onclick={() => {
                    this.fetch();
                  }}
                  class="table_icon"
                  type="md-refresh"
                  size="20"
                />
              </Tooltip>
            );
          }
        },
        {
          key: "fullscreen",
          renderItem: () => {
            return (
              <Tooltip
                transfer
                placement="top"
                content={this.t("pro.common.fullscreen")}
              >
                <Icon
                  onclick={() => {
                    this.fullscreen = !this.fullscreen;
                  }}
                  class="table_icon"
                  type="ios-expand"
                  size="20"
                />
              </Tooltip>
            );
          }
        },
        {
          key: "rowSetting",
          renderItem: () => {
            return (
              !_.isEmpty(this.tableColumns) && (
                <RowSetting
                  rowContent={this.t("pro.table.rowSetting")}
                  resetContent={this.t("pro.common.reset")}
                  columns={this.tableColumns}
                  onChange={keys => {
                    _.map(this.columns, item => {
                      this.$set(
                        item,
                        "notShowTable",
                        _.includes(keys, item.key) ? false : true
                      );
                    });
                  }}
                ></RowSetting>
              )
            );
          }
        }
      ];
      let arr = [];
      _.map(this.toolBarActions, val => {
        if (_.isString(val)) {
          arr.push(_.find(array, { key: val }));
        } else if (_.isObject(val)) {
          arr.push(val);
        }
      });
      return arr;
    },
    modalTitle() {
      return this.formDialog.type
        ? this.t("pro.common." + this.formDialog.type)
        : "标题";
    },
    tableTitle() {
      return this.title || this.t("pro.table.title");
    },
    tableColumns() {
      return this.columnFilter("notShowTable", "renderTable");
    },
    searchColumns() {
      return this.columnFilter("notShowSearch", "renderSearch");
    },
    formColumns() {
      return this.columnFilter("notShowForm", "renderForm");
    },
    form: {
      get() {
        return this.$attrs?.search?.value || this.searchForm;
      },
      set(value) {
        this.searchForm = value;
        if (this.$attrs.search && this.$attrs.search.value) {
          this.$attrs.search.value = value;
        }
      }
    }
  },
  components: {
    ProSearch,
    ProForm,
    ProTypeItem,
    VueFullscreen: component
  },
  mounted() {
    // if (this.searchForm) {
    //   this.form = this.searchForm.value;
    // }
    this.immutableSearchValue = _.cloneDeep(this.$attrs?.search?.value);
    if (this.data) {
      this.proData = this.data;
    } else {
      if (this.autoFetch) {
        this.fetch();
      }
    }
  },
  methods: {
    dataChange() {
      this.$emit("dataChange", this.proData);
    },
    columnFilter(showType, renderType) {
      const columns = _.cloneDeep(this.columns);
      let arr = [];
      map(columns, value => {
        if (!value[showType]) {
          if (has(value, renderType)) {
            value.render = value[renderType];
          } else if (value.key === "action" && showType === "notShowTable") {
            value.render = (h, params) => {
              return (
                <div class="actions">
                  {map(value.actions, val => {
                    return val.type === "delete" ? (
                      <Poptip
                        transfer={true}
                        confirm
                        title={this.t("pro.table.deleteTip")}
                        onOn-ok={() => this.typeAction(val, params)}
                        ok-text={this.t("pro.common.yes")}
                        cancel-text={this.t("pro.common.no")}
                      >
                        <a class="button">{val.title}</a>
                      </Poptip>
                    ) : (
                      <a
                        class="button"
                        onClick={() => {
                          this.typeAction(val, params);
                        }}
                      >
                        {val.title}
                      </a>
                    );
                  })}
                </div>
              );
            };
          }
          if (
            !(
              (value.key === "action" || value.type) &&
              showType !== "notShowTable"
            )
          ) {
            //排除操作在search里面显示
            arr.push(value);
          }
        }
      });
      return arr;
    },
    typeAction(val, params) {
      if (val.action) {
        val.action(params);
      } else if (val.type) {
        this.tableAction(val, params);
      } else {
        window.console.warn("未定义的类型");
      }
    },
    async tableAction(val, params) {
      this.usedRow = { val, params };
      if (val.type === "delete") {
        await customRequest({ request: val, datas: params.row });
        await this.fetch();
      } else {
        this.formDialog.proFormData =
          val.type === "new" ? {} : _.cloneDeep(params.row);
        this.formDialog.type = val.type;
        this.formDialog.show = true;
      }
    },
    async pageChange(current) {
      this.page.current = current;
      await this.fetch();
    },
    async pageSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      if (this.page.current == 1) {
        await this.fetch();
      }
    },
    async searchAction() {
      this.hide.table = false;
      this.page = {
        ...this.page,
        current: 1
      };
      await this.fetch();
      this.$nextTick(async () => {
        this.emitActions("search");
      });
    },
    searchReset() {
      this.page = {
        current: 1,
        pageSize: 10
      };
      this.form = _.cloneDeep(this.immutableSearchValue);
      this.$refs["proForm"].reset();
      // this.formDialog.proFormData = {};
      this.$nextTick(async () => {
        await this.fetch();
        this.emitActions("searchReset");
      });
    },
    emitActions(type) {
      this.$emit(type, {
        form: this.form,
        page: this.page,
        talbe: this.proData
      });
    },
    cancel() {
      this.$refs["proForm"].reset();
    },
    async fetch(fn) {
      if (!_.isUndefined(this.request)) {
        this.loading = true;
        let pageValue = this.page;
        if (this.format && this.format.formatCurrent) {
          if (_.isFunction(this.format.formatCurrent)) {
            pageValue = this.format.formatCurrent(this.page);
          }
          if (_.isString(this.format.formatCurrent)) {
            const fn = new Function(
              "page",
              "return  " +
                `Object.assign(${JSON.stringify(this.page)}, { current:${
                  this.format.formatCurrent
                } });`
            );
            pageValue = fn(this.page);
          }
        }
        const res = await customRequest({
          request: this.request,
          method: this.method,
          datas: {
            ...pageValue,
            ...this.form
          }
        });
        this.loading = false;
        let msg = {
          code: 0,
          status: "success",
          msg: "请求成功!"
        };
        if (res && res.data) {
          const data = get(res.data, this.map.dataPath);
          if (data) {
            this.proData = data;
            this.total = get(res.data, this.map.totalPath);
          } else {
            this.proData = [];
            this.total = 0;
            msg = {
              code: -1,
              status: "fail",
              data: res.data,
              msg: "请检查数据路径和分页配置"
            };
          }
        } else {
          this.proData = [];
          this.total = 0;
          msg = {
            code: -1,
            status: "error",
            msg: "请求出错!"
          };
        }
        if (fn) {
          fn(msg);
        }
      } else {
        console.log("请求路径为空，请检查");
      }
    },
    getDatas() {
      return {
        search: this.form,
        table: this.proData,
        page: { ...this.page, total: this.total }
      };
    },
    getSelection() {
      return this.$refs.table.getSelection();
    },
    submit() {
      this.formDialog.formLoading = false;
      if (this.formDialog.type !== "view") {
        this.$refs["proForm"].validate(async valid => {
          if (valid) {
            let res = {};
            const { val } = this.usedRow;
            const { method } = val;
            const request =
              val.type === "new" ? this.submitForm || this.request : val;
            try {
              res = await customRequest({
                request,
                method: method || "POST",
                datas: this.formDialog.proFormData
              });

              this.$success(
                res,
                _.get(res, this.map.message || "data.message"),
                () => {
                  this.formDialog.show = false;
                  this.$refs["proForm"].reset();
                  this.fetch();
                }
              );
              // if (res.data) {
              //   this.$Message.success({
              //     content: _.get(res, this.map.message || "data.message")
              //   });
              // }
              this.formDialog.formLoading = true;
            } catch (error) {
              this.formDialog.formLoading = true;
            }
          } else {
            setTimeout(() => {
              this.formDialog.formLoading = true;
            }, 100);
          }
        });
      } else {
        this.formDialog.show = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .ivu-table-title {
  height: auto;
  border-bottom: 0;
}
.content {
  width: 80%;
  margin: 0 auto;
}
.protable {
  .fullscreen {
    background: #fff;
  }
  .tableHeader {
    display: flex;
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #e8eaec;
    justify-content: space-between;
    padding: 0 10px 0 20px;
    .title {
      font-weight: bold;
      font-size: 16px;
    }
    .buttons {
      display: flex;
      align-items: center;
      .item_buttons {
        margin-right: 10px;
        display: flex;
        align-items: center;
        vertical-align: middle;
      }
      .table_icon {
        cursor: pointer;
      }
    }
  }
  .page {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
  }
  /deep/ .ivu-table-cell {
    .actions {
      font-size: 12px !important;
      .button {
        margin-right: 10px;
      }
    }
  }
}
</style>
