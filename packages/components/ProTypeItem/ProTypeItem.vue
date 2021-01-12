<script>
import _ from "lodash";
export default {
  props: {
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
  render(h) {
    const isFunction = _.isFunction(this.renderItem);
    if (_.isEmpty(this.renderItem)) {
      return null;
    }
    if (_.isObject(this.renderItem)) {
      return h(this.renderItem.type, {
        props: {
          value: this.value,
          ...this.renderItem.props
        },
        on: {
          input: value => {
            this.$emit("input", value);
          },
          "on-change": value => {
            this.$emit("input", value);
          },
          ...this.renderItem.on
        }
      });
    }
    return isFunction ? this.renderItem() : null;
  }
};
</script>
