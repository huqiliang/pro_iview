<template>
  <Select
    transfer
    v-model="innerValue"
    clearable
    v-bind="$attrs"
    v-on="$listeners"
  >
    <Option
      :value="item[map.valuePath]"
      v-for="item in innerList"
      :key="item[map.valuePath]"
      >{{ getExpText(item) }}</Option
    >
  </Select>
</template>

<script>
import _ from "lodash";
import customRequest from "../libs/request";
import { template } from "../libs/util";

export default {
  name: "ProSelect",
  data() {
    return {
      innerList: []
    };
  },
  props: {
    //请求数据
    request: {},
    //数据路径映射
    map: {
      type: Object,
      default() {
        return {
          dataPath: "data",
          titlePath: "title",
          valuePath: "value"
        };
      }
    },
    first: {
      type: Boolean,
      default() {
        return false;
      }
    },
    list: {
      type: Array
    },
    propValue: {}
  },
  methods: {
    getExpText(item) {
      if (!_.includes(this.map.titlePath, "{")) {
        return _.get(item, this.map.titlePath);
      } else {
        return template(this.map.titlePath, item);
      }
    },
    async fetchList() {
      if (this.list) {
        this.innerList = this.list;
      } else {
        if (this.request) {
          const res = await customRequest({
            request: this.request
          });
          if (res) {
            this.innerList = _.get(res, this.map.dataPath);
          }
        }
      }
      if (this.first) {
        this.innerValue = _.get(_.first(this.innerList), this.map.valuePath);
      }
    }
  },
  model: {
    prop: "propValue",
    event: "change"
  },
  mounted() {
    this.fetchList();
  },
  computed: {
    innerValue: {
      get() {
        const { multiple } = this.$attrs;
        return multiple ? this.propValue?.split(",") : this.propValue;
      },
      set(val) {
        const { multiple } = this.$attrs;
        const value = multiple ? val.toString() : val;
        this.$emit("change", value);
      }
    }
  },
  watch: {
    list(value) {
      this.innerList = value;
    }
  }
};
</script>

<style></style>
