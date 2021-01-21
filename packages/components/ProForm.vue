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
          v-model="value[item.key]"
          class="input ivu-input-wrapper"
        ></ProTypeItem>
        <Input
          v-else
          type="text"
          v-model="value[item.key]"
          :placeholder="item.title"
        >
        </Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import ProTypeItem from "./ProTypeItem/ProTypeItem";
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
