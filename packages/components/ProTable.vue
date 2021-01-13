<template>
  <div class="protable">
    <slot name="search">
      <ProSearch
        :columns="searchColumns"
        :loading="loading"
        v-model="form"
        @search="search"
        @reset="reset"
        v-bind="$attrs"
        v-on="$listeners"
      ></ProSearch>
    </slot>
    <Table
      :loading="loading"
      :columns="tableColumns"
      :data="proData"
      class="table"
      border
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div v-if="toolBar" slot="header" class="tableHeader">
        <div class="title">{{ title }}</div>
        <div class="buttons">
          <Button @click="tableAction({ type: 'new' })" type="primary"
            ><Icon type="md-add" />新建</Button
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
        v-bind="$attrs"
        v-on="$listeners"
      />
    </div>
    <Modal
      :loading="formDialog.formLoading"
      @on-ok="submit"
      v-model="formDialog.show"
      :title="formDialog.isEdit ? '修改' : '新建'"
    >
      <div class="content">
        <ProForm
          :columns="formColumns"
          v-model="formDialog.proFormData"
          v-bind="$attrs"
          v-on="$listeners"
        ></ProForm>
      </div>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
import _, { isString, isObject, isFunction, get, map, has } from "lodash";
import ProSearch from "./ProSearch";
import ProForm from "./ProForm";
export default {
  name: "ProTable",
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
    toolBar: {
      default: true
    },
    title: {
      default: "表格标题"
    },
    columns: {
      required: true
    },
    method: {
      default: "GET"
    },
    request: {
      required: true
    },
    map: {
      required: true,
      default: {
        dataPath: "", //数据映射路径
        totalPath: ""
      }
    },
    submitForm: {}
  },
  computed: {
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
                    return (
                      <a
                        class="button"
                        onClick={() => {
                          if (val.action) {
                            val.action(params);
                          } else if (val.type) {
                            this.tableAction(val, params);
                          } else {
                            console.warn("未定义类型");
                          }
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
    customRequest(val, params) {
      if (isString(val.request)) {
        return axios({
          url: val.request,
          method: val.method ? val.method : "delete",
          params: { id: params.row[val.requestParams] }
        }).then(this.fetch);
      } else {
        return val.request(params);
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
          this.formDialog.proFormData = params.row;
          this.formDialog.isEdit = true;
          this.formDialog.show = true;
          break;
        case "delete":
          await this.customRequest(val, params);
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
      this.formDialog.proFormData = {};
      this.fetch();
    },
    async fetch() {
      let res;
      this.loading = true;
      if (isString(this.request)) {
        res = await axios({
          url: this.request,
          method: this.method,
          params: { ...this.page, ...this.form }
        });
      } else if (isObject(this.request)) {
        res = await this.request({
          ...this.page,
          ...this.form
        });
      }
      this.loading = false;
      if (res && res.data) {
        const data = get(res.data, this.map.dataPath);
        if (data) {
          this.proData = data;
          this.total = get(res.data, this.map.totalPath);
        } else {
          this.proData = [];
          this.total = null;
          console.warn("未获取到数据");
        }
      } else {
        this.proData = [];
        this.total = null;
        console.error("出错了");
      }
    },
    async submit() {
      let res;
      this.formDialog.formLoading = false;
      if (has(this.usedRow.val, "request")) {
        const { val, params } = this.usedRow;
        res = await this.customRequest(val, params);
      } else {
        if (isFunction(this.submitForm)) {
          res = await this.submitForm(this.formDialog.proFormData);
        } else {
          res = await axios({
            url: !this.submitForm
              ? this.request
              : isString(this.submitForm)
              ? this.submitForm
              : this.request,
            method: "POST",
            data: this.formDialog.proFormData
          });
        }
      }
      if (res.data) {
        this.$Message.success({
          content: res.data.msg || "成功"
        });
        this.formDialog.show = false;
        this.fetch();
      }
      this.formDialog.formLoading = true;
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
