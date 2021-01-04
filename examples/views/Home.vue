<template>
  <div class="home">
    <pro-table :request="request"></pro-table>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      request: "https://yapi.ihotel.cn/mock/55/invoice/invoiceList"
    };
  },
  components: {}
};
</script>
