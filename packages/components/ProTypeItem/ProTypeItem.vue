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
      // let children = [];
      // if (this.renderItem.children) {
      //   _.map(this.renderItem.children, val => {
      //     if (_.isString(val)) {
      //       children.push(val);
      //     } else {
      //       console.log(val.text);
      //       children.push(
      //         h(val.type, {
      //           props: val.props,
      //           class: {
      //             w100: !_.includes(componetsFillAll, this.renderItem.type)
      //           }
      //         }),
      //         val.text
      //       );
      //     }
      //   });
      // } else {
      //   children.push([this.value]);
      // }
      const { useExp, text, type, style, props, on } = this.renderItem;
      const myStyle = useExp && style ? this.evalUse(style, this.value) : style;
      return (
        <span>
          {h(
            type,
            {
              props: {
                value: this.value,
                clearable: true,
                ...props
              },
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
