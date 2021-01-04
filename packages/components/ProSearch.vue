<template>
  <Form inline v-bind="$attrs" v-on="$listeners" class="prosearch">
    <div class="inputs">
      <FormItem
        v-for="item in columns"
        :key="item.key"
        :label="item.title + ' :'"
      >
        <Input clearable v-model="value[item.key]" class="input" />
      </FormItem>
    </div>
    <div class="buttons">
      <Button @click="reset" class="ml10">重置</Button>
      <Button @click="search" class="ml10" type="primary">查询</Button>
      <span class="ml10 text">收起</span>
    </div>
  </Form>
</template>

<script>
export default {
  props: {
    columns: {
      required: true
    },
    value: {},
    num: {
      default: 1
    }
  },
  methods: {
    reset() {
      this.$emit("input", {});
      this.$emit("reset");
    },
    search() {
      this.$emit("search");
    }
  }
};
</script>

<style lang="less">
.prosearch {
  margin: 0 10px;

  .inputs {
    display: flex;
    .input {
      margin-right: 10px;
    }
  }
  .ml10 {
    margin-left: 10px;
  }
  .text {
    vertical-align: middle;
    cursor: pointer;
  }
}
</style>
