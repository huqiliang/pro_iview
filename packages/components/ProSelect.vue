<script>
import _ from "lodash";
import customRequest from "../libs/request";
import { template } from "../libs/util";

export default {
  name: "ProSelect",
  render() {
    return (
      <div>
        {this.innerValue}
        <i-select
          transfer
          clearable
          filterable
          value={this.innerValue}
          {...{
            props: this.$attrs,
            on: {
              ...this.$listeners,
              input: val => {
                const { multiple } = this.$attrs;
                const value = multiple
                  ? this.isStringType
                    ? val.toString()
                    : val
                  : val;
                this.$emit("input", value);
              }
            }
          }}
        >
          {_.map(this.innerList, item => {
            return (
              <i-option
                value={item[this.map.valuePath]}
                key={item[this.map.valuePath]}
              >
                {this.getExpText(item)}
              </i-option>
            );
          })}
        </i-select>
      </div>
    );
  },
  data() {
    return {
      innerList: [],
      isStringType: true
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
    value: {},
    valueType: {
      type: String
    }
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
      if (this.first && (_.isEmpty(this.value) || !this.value)) {
        const value = _.get(_.first(this.innerList), this.map.valuePath);
        this.$emit("input", value);
      }
    }
  },
  mounted() {
    this.isStringType = this.valueType === "string" || _.isString(this.value);
    this.fetchList();
  },
  computed: {
    innerValue: {
      get() {
        const { multiple } = this.$attrs;
        return multiple
          ? _.isArray(this.value)
            ? this.value
            : this.value?.split(",")
          : this.value;
      },
      set() {}
    }
  },
  watch: {
    list(value) {
      this.innerList = value;
    }
  }
};
</script>

<style scoped>
.ivu-select {
  text-align: left;
}
</style>
