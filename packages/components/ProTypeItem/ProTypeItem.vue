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
      let children = [];
      if (this.renderItem.children) {
        _.map(this.renderItem.children, val => {
          children.push(
            h(val.type, {
              props: val.props,
              class: {
                w100: !_.includes(componetsFillAll, this.renderItem.type)
              }
            })
          );
        });
      }
      return (
        <span>
          {h(
            this.renderItem.type,
            {
              props: {
                value: this.value,
                clearable: true,
                ...this.renderItem.props
              },
              class: {
                w100: !_.includes(componetsFillAll, this.renderItem.type)
              },
              style: {
                ...this.renderItem.style
              },
              on: {
                input: value => {
                  //删除是否为空的判断 不确定是否会产生bug
                  this.input(value);
                },
                ...this.renderItem.on
              }
            },
            [children]
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
