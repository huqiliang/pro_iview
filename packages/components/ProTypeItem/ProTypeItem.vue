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
          ...this.renderItem.props
        },
        on: {
          input: value => {
            if (value) {
              this.input(value);
            }
          },
          ...this.renderItem.on
        }
      });
    } else if (_.isFunction(this.renderItem)) {
      return this.renderItem({ h, input: this.input, value: this.value });
    }
    return null;
  }
};
</script>
