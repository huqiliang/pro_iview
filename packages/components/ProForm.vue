<template>
  <div class="proform">
    <Form ref="form" :model="value" inline>
      <FormItem
        :prop="item.key"
        :key="item.key"
        :label="item.title + ' :'"
        :label-width="100"
        v-for="item in columns"
      >
        <Input type="text" v-model="value[item.key]" :placeholder="item.title">
        </Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
// import { map } from "lodash";
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
      default: {}
    }
  }
};
</script>

<style></style>
