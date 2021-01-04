<template>
  <div class="protable">
    <ProSearch
      v-model="form"
      :columns="formColumns"
      v-bind="$attrs"
      v-on="$listeners"
      :loading="loading"
      @search="search"
      @reset="reset"
    ></ProSearch>
    <Table
      :loading="loading"
      :columns="tableColumns"
      :data="proData"
      v-bind="$attrs"
      v-on="$listeners"
      class="table"
      border
    ></Table>
    <div class="page">
      <Page
        v-if="proData"
        :total="total"
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"
        transfer
        show-total
        show-sizer
        v-bind="$attrs"
        v-on="$listeners"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { isString, isObject, get, map, has } from "lodash";
import ProSearch from "./ProSearch";
export default {
  name: "ProTable",
  data() {
    return {
      loading: false,
      proData: [],
      form: {},
      total: null,
      page: {
        current: 1,
        pageSize: 10
      }
    };
  },
  props: {
    columns: {
      required: true
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
    }
  },
  computed: {
    tableColumns() {
      return this.columnFilter("table");
    },
    formColumns() {
      return this.columnFilter("form");
    }
  },
  components: {
    ProSearch
  },
  created() {
    this.fetch();
  },
  methods: {
    columnFilter(type) {
      let arr = [];
      const showType = type === "table" ? "notShowTable" : "notShowForm";
      const renderType = type === "table" ? "renderTable" : "renderTable";
      map(this.columns, value => {
        if (!value[showType]) {
          if (has(value, renderType)) {
            value.render = value.renderTable;
          }
          arr.push(value);
        }
      });
      return arr;
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
      this.fetch();
    },
    reset() {
      this.fetch();
    },
    async fetch() {
      let res;
      this.loading = true;
      if (isString(this.request)) {
        res = await axios.get(this.request, {
          params: { ...this.page, ...this.form }
        });
      } else if (isObject(this.request)) {
        res = await this.request({
          ...this.page,
          ...this.form
        });
      }
      this.loading = false;

      this.proData = get(res.data, this.map.dataPath);
      this.total = get(res.data, this.map.totalPath);
    }
  }
};
</script>

<style lang="less">
.protable {
  .table {
    margin: 10px;
  }
  .page {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
