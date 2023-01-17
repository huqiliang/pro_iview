<script>
import _ from "lodash";
import componetsFillAll from "./comFillArr";
import { commonToFn } from "../../libs/util";
export default {
  props: {
    item: null,
    outData: {
      default() {
        return null;
      }
    },
    value: {
      default() {
        return null;
      }
    },
    renderItem: {
      default() {
        return null;
      }
    }
  },
  methods: {
    evalUse(obj, innerValue) {
      let myObj = {};
      _.map(obj, (val, key) => {
        let temp = val
          ? new Function("value", "return " + val)(innerValue)
          : val;
        myObj[key] = temp;
      });
      return myObj;
    },
    input(value) {
      if (_.has(this.renderItem, "format")) {
        const { format } = this.renderItem;
        const wapper = commonToFn(this, format, value);
        if (format && format.formatWapper) {
          this.$emit("wapperInput", { wapper, value });
        } else {
          this.$emit("input", wapper);
        }
      } else {
        this.$emit("input", value);
      }
    }
  },
  render(h) {
    if (_.isObjectLike(this.renderItem)) {
      const {
        useExp,
        text,
        type,
        style,
        props,
        on,
        scopedSlots
      } = this.renderItem;
      const myStyle = useExp && style ? this.evalUse(style, this.value) : style;

      //如果scopedSlots 是个数组 转化下
      let myScopedSlots = scopedSlots;
      if (_.isArray(scopedSlots)) {
        let obj = {};
        _.map(scopedSlots, val => {
          obj[val.name] = () =>
            _.isFunction(val.title)
              ? val.title(h, { value: this.value, props, val })
              : h("span", val.title);
        });
        myScopedSlots = obj;
      }
      return (
        <span>
          {h(
            type || "i-input",
            {
              props: {
                value: this.value,
                clearable: true,
                placeholder: this.item?.title || this.item?.value || "",
                ...props
              },
              scopedSlots: myScopedSlots,
              class: {
                w100: !_.includes(componetsFillAll, type)
              },
              style: {
                ...myStyle
              },
              on: {
                input: value => {
                  //删除是否为空的判断 不确定是否会产生bug
                  this.input(value);
                },
                ...on
              }
            },
            useExp ? new Function("value", "return " + text)(this.value) : text
          )}
        </span>
      );
    } else if (_.isFunction(this.renderItem)) {
      try {
        const renderRes = this.renderItem({
          h,
          input: this.input,
          value: this.value,
          row: this.item,
          outData: this.outData
        });

        // 如果没有自动挂载 v-model
        if (!_.has(renderRes.componentOptions, "propsData.value")) {
          _.set(renderRes.componentOptions, "propsData.value", this.value);
        }
        if (!_.has(renderRes.componentOptions, "listeners.input")) {
          _.set(renderRes.componentOptions, "listeners.input", this.input);
        }

        if (_.includes(componetsFillAll, renderRes?.tag?.split("-")[3])) {
          return <span>{renderRes}</span>;
        } else {
          return renderRes;
        }
      } catch (error) {
        console.log("宽度修改失败", error);
      }
      // return renderRes;
    }
    //  if (!_.has(renderRes.componentOptions, "propsData.value")) {
    //     _.set(renderRes.componentOptions, "propsData.value", this.value);
    //   }
    return null;
  }
};
</script>
<style scoped>
.w100 {
  width: 100%;
}
</style>
