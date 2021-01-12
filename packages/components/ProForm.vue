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
        <ProTypeItem
          :renderItem="item.renderForm"
          v-if="item.renderForm"
          v-model="value[item.key]"
          class="input"
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

<style lang="less" scoped>
.proform {
  .input {
    width: 100%;
  }
}
</style>
