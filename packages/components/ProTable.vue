<template>
  <div class="protable">
    <slot name="search">
      <ProSearch
        :columns="searchColumns"
        :loading="loading"
        v-model="form"
        @search="search"
        @reset="reset"
        v-bind="attrs.search"
        v-on="listeners.search"
      ></ProSearch>
    </slot>
    <Table
      :loading="loading"
      :columns="tableColumns"
      :data="proData"
      class="table"
      border
      v-bind="attrs.table"
      v-on="listeners.table"
    >
      <div v-if="toolBar" slot="header" class="tableHeader">
        <div class="title">{{ tableTitle }}</div>
        <div class="buttons">
          <Button @click="tableAction({ type: 'new' })" type="primary"
            ><Icon type="md-add" />{{ t("pro.common.new") }}</Button
          >
        </div>
      </div>
    </Table>
    <div class="page">
      <Page
        v-if="proData"
        :total="total"
        :current="this.page.current"
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"
        transfer
        show-total
        show-sizer
        v-bind="attrs.page"
        v-on="listeners.page"
      />
    </div>
    <Modal
      :loading="formDialog.formLoading"
      @on-ok="submit"
      @on-cancel="cancel"
      v-model="formDialog.show"
      :title="formDialog.isEdit ? t('pro.common.edit') : t('pro.common.new')"
    >
      <div class="content">
        <ProForm
          ref="proForm"
          :columns="formColumns"
          v-model="formDialog.proFormData"
          v-bind="attrs.form"
          v-on="listeners.form"
        ></ProForm>
      </div>
    </Modal>
  </div>
</template>

<script>
// import axios from "axios";
import _, { get, map, has } from "lodash";
import customRequest from "../libs/request";
import ProSearch from "./ProSearch";
import ProForm from "./ProForm";
import Locale from "../mixin/locale";

export default {
  name: "ProTable",
  mixins: [Locale],
  data() {
    return {
      formDialog: {
        show: false,
        isEdit: true,
        proFormData: {},
        formLoading: true
      },
      loading: false,
      proData: [],
      form: {},
      total: null,
      usedRow: null,
      page: {
        current: 1,
        pageSize: 10
      }
    };
  },
  props: {
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
    map: {
      default() {
        return {
          dataPath: "data",
          totalPath: "totalRows"
        };
      }
    },
    submitForm: {}
  },
  computed: {
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
    }
  },
  components: {
    ProSearch,
    ProForm
  },
  created() {
    this.fetch();
  },
  methods: {
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
          if (!(value.key === "action" && showType !== "notShowTable")) {
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
        console.warn("未定义类型");
      }
    },
    async tableAction(val, params) {
      this.usedRow = { val, params };
      switch (val.type) {
        case "new":
          this.formDialog.proFormData = {};
          this.formDialog.isEdit = false;
          this.formDialog.show = true;
          break;
        case "edit":
          this.formDialog.proFormData = _.cloneDeep(params.row);
          this.formDialog.isEdit = true;
          this.formDialog.show = true;
          break;
        case "delete":
          await customRequest({ request: val, datas: params.row });
          this.fetch();
          break;
        default:
          break;
      }
    },
    pageChange(current) {
      this.page.current = current;
      this.fetch();
    },
    pageSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      if (this.page.current == 1) {
        this.fetch();
      }
    },
    search() {
      this.page = {
        current: 1,
        pageSize: 10
      };
      this.fetch();
    },
    reset() {
      this.page = {
        current: 1,
        pageSize: 10
      };
      this.$refs["proForm"].reset();
      this.formDialog.proFormData = {};
      this.fetch();
    },
    cancel() {
      this.$refs["proForm"].reset();
    },
    async fetch(fn) {
      if (!_.isEmpty(this.request)) {
        this.loading = true;
        const res = await customRequest({
          request: this.request,
          datas: {
            ...this.page,
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
            this.total = null;
            msg = {
              code: -1,
              status: "fail",
              data: res.data,
              msg: "请检查数据路径和分页配置"
            };
          }
        } else {
          this.proData = [];
          this.total = null;
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
    submit() {
      this.formDialog.formLoading = false;
      this.$refs["proForm"].validate(async valid => {
        if (valid) {
          let res = {};
          const { val } = this.usedRow;
          const { method } = val;
          const request = val.type === "new" ? this.submitForm : val;
          res = await customRequest({
            request,
            method,
            datas: this.formDialog.proFormData
          });
          if (res.data) {
            this.$Message.success({
              content: res.data.msg || this.$t("pro.common.success")
            });
            this.formDialog.show = false;
            this.$refs["proForm"].reset();
            this.fetch();
          }
          this.formDialog.formLoading = true;
        } else {
          setTimeout(() => {
            this.formDialog.formLoading = true;
          }, 100);
        }
      });
    }
  }
};
</script>

<style lang="less">
.content {
  width: 80%;
  margin: 0 auto;
}
.protable {
  .tableHeader {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    .title {
      font-weight: bold;
      font-size: 16px;
    }
  }
  .table {
    margin: 10px;
  }
  .page {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
  }
  .actions {
    font-size: 12px;
    .button {
      margin-right: 10px;
    }
  }
}
</style>
