<script>
import _ from "lodash";
import customRequest from "../libs/request";
import { template } from "../libs/util";

export default {
  name: "ProCheckBox",
  render() {
    return (
      <CheckboxGroup
        value={this.innerValue}
        {...{
          props: this.$attrs,
          on: {
            ...this.$listeners,
            input: val => {
              this.innerValue = !this.multiple ? [val[1]] : val;
              //   console.log(val.toString());
              //   const value =
              //     this.isStringType === "string" ? val.toString() : val;
              //   this.$emit("input", value);
              //   this.$emit(
              //     "change",
              //     _.find(this.innerList, { [this.map.valuePath]: value })
              //   );
            }
          }
        }}
      >
        {_.map(this.innerList, item => {
          return !_.isUndefined(item[this.map.valuePath]) ? (
            <Checkbox label={item[this.map.valuePath]}>
              {item.icon ? (
                <Icon type={item.icon} style={{ marginRight: "3px" }} />
              ) : null}
              {this.getExpText(item)}
            </Checkbox>
          ) : null;
        })}
      </CheckboxGroup>
    );
  },
  data() {
    return {
      innerList: [],
      isStringType: false
    };
  },
  props: {
    //请求数据
    request: {},
    multiple: {
      default: true
    },
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
    }
  },
  mounted() {
    this.init();
  },
  computed: {
    innerValue: {
      get() {
        const val = _.isEmpty(this.value)
          ? []
          : this.valueType === "string"
          ? this.value?.split(",")
          : this.value;

        return val;
      },
      set(val) {
        const value = this.valueType === "string" ? val.toString() : val;
        this.$emit("input", value);
        this.$emit(
          "change",
          _.find(this.innerList, { [this.map.valuePath]: value })
        );
      }
    }
  },
  watch: {
    request: {
      handler(newValue, oldValue) {
        if (!_.isEqual(newValue, oldValue) && !_.isFunction(oldValue)) {
          this.init();
        }
      },
      deep: true
    },
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
