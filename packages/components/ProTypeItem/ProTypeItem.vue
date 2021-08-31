<script>
import _ from "lodash";
export default {
  props: {
    item: null,
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
      return h(this.renderItem.type, {
        props: {
          value: this.value,
          clearable: true,
          ...this.renderItem.props
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
      });
    } else if (_.isFunction(this.renderItem)) {
      return this.renderItem({
        h,
        input: this.input,
        value: this.value,
        row: this.item
      });
    }
    return null;
  }
};
</script>
