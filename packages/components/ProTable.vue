<template>
  <div class="protable">
    <UIEditFrame type="all" :uiEdit="uiEdit" @config="uiConfig">
      <div class="tableSearch" v-if="!hide.search">
        <UIEditFrame type="search" :uiEdit="uiEdit" @config="uiConfig">
          <ProSearch
            :columns="searchColumns"
            :loading="loading"
            v-model="form"
            @search="searchAction"
            @reset="searchReset"
            v-bind="$attrs.search"
            v-on="searchListeners"
          ></ProSearch>
        </UIEditFrame>
      </div>
      <VueFullscreen :fullscreen.sync="fullscreen">
        <UIEditFrame type="toolBar" :uiEdit="uiEdit" @config="uiConfig">
          <slot name="header" class="borderHeader">
            <span v-if="hide.toolBar"></span>
            <div v-else class="tableHeader">
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
            </div> </slot
        ></UIEditFrame>
        <div class="tableTable">
          <UIEditFrame type="table" :uiEdit="uiEdit" @config="uiConfig">
            <Table
              :loading="loading"
              :columns="tableColumns"
              :data="proData"
              v-if="!hide.table"
              ref="table"
              border
              v-bind="$attrs.table"
              v-on="tableListeners"
            >
            </Table
          ></UIEditFrame>
          <div class="page">
            <UIEditFrame type="page" :uiEdit="uiEdit" @config="uiConfig">
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
                v-on="pageListeners"
            /></UIEditFrame>
          </div>
        </div>
      </VueFullscreen>
      <Modal
        :loading="formDialog.formLoading"
        @on-ok="submit"
        @on-cancel="cancel"
        v-model="formDialog.show"
        :transition-names="['pro-modal']"
        :width="$attrs.form ? $attrs.form.modalWidth : '400'"
        :title="formDialog.title"
        v-bind="$attrs.modal"
        v-on="modalListeners"
      >
        <transition name="pro-modal-content">
          <div class="content" v-if="formDialog.show">
            <ProForm
              ref="proForm"
              :columns="formColumns"
              :type="formDialog.type"
              :dialog="formDialog"
              v-model="formDialog.proFormData"
              v-bind="$attrs.form"
              v-on="formListeners"
            ></ProForm>
          </div>
        </transition>
      </Modal>
    </UIEditFrame>
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
import UIEditFrame from "../components/LayOut/UIEditFrame.vue";

export default {
  name: "ProTable",
  mixins: [Locale],
  data() {
    return {
      innerValue: [],
      showTableColumns: [],
      resData: {}, //后端返回的所有数据
      formDialog: {
        show: false,
        type: "view",
        proFormData: {},
        formLoading: true
      },
      fullscreen: false,
      loading: false,
      // proData: [],
      searchForm: {},
      // defaultSearchValue: null,
      total: 0,
      usedRow: null,
      page: {
        current: 1,
        pageSize: this.pageSize
      },
      immutableSearchValue: ""
    };
  },
  props: {
    uiEdit: Boolean,
    pageSize: {
      default() {
        return 10;
      }
    },
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
    headers: {
      type: Object
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
          current: "current",
          pageSize: "pageSize",
          dataPath: "data",
          totalPath: "totalRows"
        };
      }
    },
    format: {
      type: Object
    },
    value: {
      type: Array
    },
    hide: {
      default() {
        return { search: false, table: false, pages: false, toolBar: false };
      }
    },
    submitForm: {},
    storage: {
      default() {
        return {
          rowSetting: ""
        };
      }
    }
  },
  // model: {
  //   prop: "data",
  //   event: "dataChange"
  // },
  computed: {
    modalListeners() {
      return this.buildListeners("modal");
    },
    searchListeners() {
      return this.buildListeners("search");
    },
    formListeners() {
      return this.buildListeners("form");
    },
    pageListeners() {
      return this.buildListeners("page");
    },
    tableListeners() {
      return Object.assign({}, this.buildListeners("table"), this.$listeners);
    },
    custmerHeader() {
      return _.get(this.map, "success")
        ? { ...this.headers, nomsg: true }
        : this.headers;
    },
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
              <RowSetting
                storage={this.storage.rowSetting}
                rowContent={this.t("pro.table.rowSetting")}
                resetContent={this.t("pro.common.reset")}
                columns={
                  _.isEmpty(this.showTableColumns)
                    ? this.columns
                    : this.showTableColumns
                }
                onChange={value => {
                  if (this.storage.rowSetting) {
                    try {
                      localStorage.setItem(
                        `ProRowSetting:${this.storage.rowSetting}`,
                        JSON.stringify(value)
                      );
                    } catch (error) {
                      console.log(error);
                    }
                  }
                  this.showTableColumns = value;
                  // _.map(this.columns, item => {
                  //   this.$set(
                  //     item,
                  //     "notShowTable",
                  //     _.includes(keys, item.key) ? false : true
                  //   );
                  // });
                }}
              ></RowSetting>
            );
          }
        }
      ];
      let arr = [];
      _.map(this.toolBarActions, val => {
        if (_.isString(val)) {
          arr.push(_.find(array, { key: val }));
        } else if (_.isObject(val)) {
          arr.push({
            key: val.key,
            renderItem: val.render
              ? val.render.bind(this)
              : val.renderItem.bind(this)
          });
        }
      });
      return arr;
    },
    tableTitle() {
      return this.title || this.t("pro.table.title");
    },
    tableColumns() {
      return this.columnFilter(
        "notShowTable",
        "renderTable",
        this.showTableColumns
      );
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
    },
    proData: {
      get() {
        return this.value ? this.value : this.innerValue;
      },
      set(value) {
        if (!this.value) {
          this.innerValue = value;
        }
        this.$emit("input", value);
      }
    }
  },
  components: {
    ProSearch,
    ProForm,
    ProTypeItem,
    UIEditFrame,
    VueFullscreen: component
  },
  mounted() {
    // if (this.searchForm) {
    //   this.form = this.searchForm.value;
    // }
    this.immutableSearchValue = _.cloneDeep(this.$attrs?.search?.value || {});
    if (this.data) {
      this.proData = this.data;
    } else {
      if (this.autoFetch) {
        this.fetch();
      }
    }
  },
  methods: {
    uiConfig(options) {
      this.$emit("uiConfig", options);
    },
    buildListeners(type) {
      let obj = {};
      _.map(this.$listeners, (val, key) => {
        if (key.indexOf(type) > -1) {
          obj[key.replace(`${type}:`, "")] = val;
        }
      });
      return obj;
    },
    // dataChange() {
    //   this.$emit("input", this.proData);
    // },
    columnFilter(showType, renderType, value) {
      const columns = _.isEmpty(value)
        ? _.cloneDeep(this.columns)
        : _.cloneDeep(value);
      let arr = [];
      map(columns, value => {
        if (!value[showType]) {
          if (has(value, renderType)) {
            // value.render = value[renderType];
            if (_.isFunction(value[renderType])) {
              value.render = value[renderType];
            } else {
              value.render = (h, params) => {
                return (
                  <ProTypeItem
                    v-model={params.row[value.key]}
                    renderItem={value[renderType]}
                  ></ProTypeItem>
                );
              };
            }
          } else if (value.key === "action" && showType === "notShowTable") {
            value.render = (h, params) => {
              return (
                <div class="actions">
                  {map(value.actions, val => {
                    return val.render ? (
                      val.render(params, (myVal, myParams) => {
                        this.typeAction(
                          myVal ? myVal : val,
                          myParams ? myParams : params
                        );
                      })
                    ) : val.type === "delete" ? (
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
    async typeAction(val, params) {
      if (val.action) {
        await val.action(params);
        if (!val.prevent) {
          this.tableAction(val, params);
        }
      } else if (val.type) {
        this.tableAction(val, params);
      } else {
        if (!val.prevent) {
          this.tableAction(val, params);
        }
      }
    },
    async tableAction(val, params) {
      this.usedRow = { val, params };
      if (val.type === "delete") {
        await customRequest({
          request: val,
          datas: params.row,
          headers: this.headers
        });
        await this.fetch();
      } else {
        const value = val.type === "new" ? {} : _.cloneDeep(params.row);
        this.formDialog.proFormData = _.merge(
          {},
          this.$attrs?.form?.value,
          value
        );
        this.formDialog.type = val.type;
        this.formDialog.title =
          val.title ||
          (this.formDialog.type
            ? this.t("pro.common." + this.formDialog.type)
            : "标题");
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
        pageSize: this.pageSize
      };
      this.form = _.cloneDeep(this.immutableSearchValue);
      this.resetForm();
      // this.formDialog.proFormData = {};
      this.$nextTick(async () => {
        await this.fetch();
        this.emitActions("searchReset");
      });
    },
    resetForm() {
      if (this.$refs["proForm"]) {
        this.$refs["proForm"].reset();
        this.emitActions("formReset");
      }
    },
    emitActions(type) {
      this.$emit(type, {
        form: this.form,
        page: this.page,
        talbe: this.proData
      });
    },
    cancel() {
      this.resetForm();
    },
    async fetch(fn) {
      if (!_.isUndefined(this.request)) {
        this.loading = true;
        const { current, pageSize } = this.page;
        let pageValue = {
          [this.map.current || "current"]: current,
          [this.map.pageSize || "pageSize"]: pageSize
        };
        if (this.format && this.format.formatCurrent) {
          if (_.isFunction(this.format.formatCurrent)) {
            pageValue = this.format.formatCurrent(this.page);
          }
          if (_.isString(this.format.formatCurrent)) {
            const fn = new Function(
              "page",
              "return  " +
                `Object.assign(${JSON.stringify(pageValue)}, { ${
                  this.map.current
                }:${this.format.formatCurrent} });`
            );
            pageValue = fn(this.page);
          }
        }
        const res = await customRequest({
          request: this.request,
          method: this.method,
          headers: this.headers,
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
        if (res) {
          this.resData = res;
          const data = get(res, this.map.dataPath);
          if (data) {
            this.proData = data;
            this.total = get(res, this.map.totalPath);
          } else {
            this.proData = [];
            this.total = 0;
            msg = {
              code: -1,
              status: "fail",
              data: res,
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
        page: { ...this.page, total: this.total },
        form: this.formDialog.proFormData,
        attr: this.$attrs,
        resData: this.resData,
        dialog: this.formDialog
      };
    },
    getSelection() {
      return this.$refs.table.getSelection();
    },
    finish() {
      this.formDialog.show = false;
      this.resetForm();
      this.fetch();
    },
    success(res) {
      this.$Message.success(_.get(res, this.map.message) || "成功");
      this.finish();
    },
    submitLoading() {
      setTimeout(() => {
        this.formDialog.formLoading = false; //改变loading状态
        this.$nextTick(() => {
          this.formDialog.formLoading = true;
        });
      });
    },
    submit() {
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
                headers: this.custmerHeader,
                method: method || "POST",
                datas: this.formDialog.proFormData
              });
              console.log("res", res);
              if (res) {
                const mapSuccess =
                  _.get(this.$attrs?.form, "success") ||
                  _.get(this.map, "success");
                if (mapSuccess) {
                  const arr = mapSuccess.split(/=+/);
                  const succData = _.get(res, _.trim(arr[0]));
                  if (succData == _.trim(arr[1])) {
                    this.success(res);
                  } else {
                    this.$Message.error(
                      _.get(res, this.map?.message) || "未知错误"
                    );
                  }
                } else if (res.success) {
                  console.log("succ");
                  this.success(res);
                }
                this.submitLoading();
              }
            } catch (error) {
              console.log("致命错误:", error);
              this.submitLoading();
            }
          } else {
            this.submitLoading();
          }
        });
      } else {
        this.formDialog.show = false;
      }
    }
  },
  watch: {
    // data: {
    //   handler(value) {
    //     this.proData = value;
    //     this.$emit("dataChange", this.proData);
    //   },
    //   deep: true
    // },
    pageSize(value) {
      this.page.pageSize = value;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./ProTable/proTable.css");

/deep/ .ivu-table-title {
  height: auto;
  border-bottom: 0;
}
.content {
  width: 85%;
  margin: 0 auto;
}
.protable {
  padding: 10px 0;
  .tableSearch {
    background: #fff;
    padding: 10px 10px 0 10px;
    margin-bottom: 10px;
  }
  .tableTable {
    background: #fff;
    padding-bottom: 10px;
  }
  .fullscreen {
    background: #fff;
  }
  .tableHeader {
    display: flex;
    height: 48px;
    line-height: 48px;
    border: 1px solid #dcdee2;
    background: #fff;
    border-bottom: none;
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
