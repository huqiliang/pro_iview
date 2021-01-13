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
  methods: {
    emit(value) {
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
              this.emit(value);
            }
          },
          "on-change": this.emit,
          ...this.renderItem.on
        }
      });
    } else if (_.isFunction(this.renderItem)) {
      return this.renderItem();
    }
    return null;
  }
};
</script>
