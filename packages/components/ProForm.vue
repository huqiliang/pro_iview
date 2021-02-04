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
        :prop="item.key"
        :key="item.key"
        :label="item.title + ' :'"
        :rules="item.rules"
        v-for="item in columns"
      >
        <ProTypeItem
          :renderItem="item.renderForm"
          v-if="item.renderForm"
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
import { get } from "lodash";
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
      return get(value, item.key);
    },
    change(item, value) {
      this.value[item.key] = value;
      // this.$emit("input", value);
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
