<script>
import _ from "lodash";
import customRequest from "../libs/request";
import { template } from "../libs/util";

export default {
  name: "ProSelect",
  render() {
    return (
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
              this.$emit(
                "change",
                !multiple
                  ? _.find(this.innerList, { [this.map.valuePath]: value })
                  : _.filter(this.innerList, val => {
                      return value.includes(val[this.map.valuePath]);
                    })
              );
            }
          }
        }}
      >
        {_.map(this.innerList, item => {
          return !_.isUndefined(item[this.map.valuePath]) ? (
            <i-option
              value={item[this.map.valuePath]}
              key={item[this.map.valuePath]}
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              {item.icon ? (
                <Icon type={item.icon} style={{ marginRight: "3px" }} />
              ) : null}
              {this.getExpText(item)}
            </i-option>
          ) : null;
        })}
      </i-select>
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
    init() {
      this.isStringType = this.valueType === "string" || _.isString(this.value);
      this.fetchList();
    },
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
            this.innerList = this.map.dataPath
              ? _.get(res, this.map.dataPath)
              : res;
          }
        }
      }
      if (this.first && (_.isEmpty(this.value) || !this.value)) {
        const first = _.first(this.innerList);
        const value = _.get(first, this.map.valuePath);
        this.$emit("input", value);
        this.$emit("change", first);
      }
    },
    getValue() {
      const { multiple } = this.$attrs;
      return multiple
        ? _.isArray(this.value)
          ? this.value
          : this.value?.split(",")
        : this.value;
    }
  },
  mounted() {
    this.init();
  },
  computed: {
    innerValue: {
      get() {
        return this.getValue();
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  watch: {
    list(value) {
      this.innerList = value;
    },
    value(value) {
      this.innerValue = value;
    }
  }
};
</script>

<style scoped>
.ivu-select {
  text-align: left;
}
</style>
