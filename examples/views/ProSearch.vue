<template>
  <div>
    {{ cc }}
    <ProSearch :columns="columns" v-model="cc"></ProSearch>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cc: {},
      columns: [
        {
          title: "aaa",
          key: "aaa",
          renderSearch: {
            type: "DatePicker",
            props: {
              type: "daterange"
            },
            format: {
              formatWapper: true,
              value:
                "{start:this.$dayjs(value[0]).format('YYYY-MM-DD'),end:this.$dayjs(value[1]).format('YYYY-MM-DD')}"
            }
          }
        },
        {
          title: "aaa2",
          key: "aaa2"
        },
        {
          title: "aaa3",
          key: "aaa3"
        },
        {
          title: "aaa4",
          key: "aaa4"
        },
        {
          title: "aaa5",
          key: "aaa5"
        }
      ]
    };
  }
};
</script>
