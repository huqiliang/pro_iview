<template>
  <div class="protable">
    <Table></Table>
  </div>
</template>

<script>
export default {
  name: "ProTable",
  props: {
    request: {
      required: true
    }
  },
  methods: {
    fetch() {}
  }
};
</script>

<style>
.protable {
  width: 100%;
}
</style>
