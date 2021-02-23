<template>
  <div class="proform">
    <Form
      ref="form"
      :model="value"
      :label-width="labelWidth"
      label-position="left"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <FormItem
        :key="item.key"
        :label="item.title + ' :'"
        :prop="propItem(item)"
        :rules="item.rules"
        v-for="item in columns"
      >
        <ProTypeItem
          v-if="item.renderForm"
          :renderItem="item.renderForm"
          :value="getValue(value, item)"
          @input="change(item, $event)"
          class="input ivu-input-wrapper"
        ></ProTypeItem>
        <Input
          v-else
          type="text"
          :value="getValue(value, item)"
          :placeholder="item.title"
          @input="change(item, $event)"
        >
        </Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import ProTypeItem from "./ProTypeItem/ProTypeItem";
import _ from "lodash";
export default {
  name: "ProForm",
  props: {
    labelWidth: {
      type: Number,
      default() {
        return 110;
      }
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      default() {
        return {};
      }
    }
  },
  methods: {
    getValue(value, item) {
      return _.get(value, item.key);
    },
    propItem(item) {
      let key = item.key;
      if (key.indexOf(".") > -1) {
        key = _.replace(key, ".", "-");
      }
      return key;
    },
    change(item, value) {
      const copyValue = _.cloneDeep(this.value);
      _.set(copyValue, item.key, value);
      this.$emit("input", copyValue);
      // this.$set(this.value, copyValue);
    },
    reset(fn) {
      this.$refs["form"].resetFields(fn);
    },
    validate(fn) {
      this.$refs["form"].validate(fn);
    }
  },
  components: {
    ProTypeItem
  }
};
</script>
