<template>
  <div class="proform">
    <Form
      ref="form"
      :model="value"
      :label-width="110"
      label-position="left"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <FormItem
        :prop="item.key"
        :key="item.key"
        :label="item.title + ' :'"
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
  components: {
    ProTypeItem
  }
};
</script>
