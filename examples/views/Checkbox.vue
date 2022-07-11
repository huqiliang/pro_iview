<template>
  <div class="value">
    {{ value2 }}
    <pro-check-box v-model="value2" v-bind="config"></pro-check-box>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value2: ["cccc"],
      config: {
        // valueType: "string",
        // 是否多选 会影响返回参数
        multiple: false,
        // 是否自动选中第一个
        // first: true,
        // 与request互斥 不需要请求 手动带入列表
        // list: [
        //   {
        //     title: "bbb",
        //     icon: "ios-ice-cream-outline",
        //     value: "cccc"
        //   },
        //   {
        //     title: "aaa",
        //     value: "0"
        //   }
        // ],
        // 数据请求
        request: "http://192.168.0.38:3000/mock/106/api/table",
        map: {
          //请求数据路径映射
          dataPath: "data",
          // 数据显示 支持es6表达式 例如${descriptEn} - ${descript} 或者 (${descriptEn})
          titlePath: "descriptEn",
          //链接v-model定义的数据项
          valuePath: "descriptEn"
        }
      }
    };
  }
};
</script>

<style></style>
