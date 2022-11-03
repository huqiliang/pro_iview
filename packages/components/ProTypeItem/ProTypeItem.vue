<script>
import _ from "lodash";
import componetsFillAll from "./comFillArr";
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
        this.$emit("input", this.renderItem.format(value));
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
            type,
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
      return this.renderItem({
        h,
        input: this.input,
        value: this.value,
        row: this.item,
        outData: this.outData
      });
    }
    return null;
  }
};
</script>
<style scoped>
.w100 {
  width: 100%;
}
</style>
