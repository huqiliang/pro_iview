<template>
  <div class="proform">
    <Form ref="form" :model="form" inline>
      <FormItem
        :prop="item.key"
        v-for="item in formList"
        :key="item.key"
        :label="item.title + ' :'"
        :label-width="70"
      >
        <Input type="text" v-model="item.value" placeholder="Username"> </Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  props: {
    form: {}
  },
  data() {
    return {
      formList: [
        {
          title: "12",
          key: "a",
          value: 1
        }
      ]
    };
  }
};
</script>

<style></style>
