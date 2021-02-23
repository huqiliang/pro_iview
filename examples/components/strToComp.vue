<script>
import Vue from "vue";
export default {
  props: {
    datas: Object,
    html: String
  },
  render(h) {
    const com = Vue.extend({
      data: () => {
        return this.datas;
      },
      template: this.html
    });
    return h(com, {});
  }
};
</script>
