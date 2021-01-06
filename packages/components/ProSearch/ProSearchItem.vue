<script>
import _ from "lodash";
export default {
  props: {
    value: {
      default() {
        return null;
      }
    },
    render: {
      default() {
        return null;
      }
    }
  },
  render(h) {
    const isFunction = _.isFunction(this.render);
    if (_.isEmpty(this.render)) {
      return null;
    }
    if (_.isObject(this.render)) {
      return h(this.render.type, {
        props: {
          value: this.value
        },
        on: {
          input: value => {
            this.$emit("input", value);
          },
          "on-change": value => {
            this.$emit("input", value);
          }
        }
      });
    }
    return isFunction ? this.render() : null;
  }
};
</script>
