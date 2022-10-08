<template>
  <div style="width:250px">
    {{ value2 }}
    <Button @click="value2 = ['aaa']">修改</Button>
    <Button @click="changeList">修改list</Button>
    <pro-select
      :clearable="false"
      v-model="value1"
      v-bind="config"
    ></pro-select>

    <p>数字</p>
    <pro-select
      :clearable="false"
      v-model="value2"
      v-bind="config2"
    ></pro-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      value2: 111,
      config: {
        // 是否多选 会影响返回参数
        multiple: false,
        // 是否自动选中第一个
        first: true,
        // 与request互斥 不需要请求 手动带入列表
        list: [
          {
            descriptEn: "111",
            icon: "ios-ice-cream-outline",
            descript: "cccc"
          },
          {
            descriptEn: "222",
            descript: 0
          }
        ],
        // 数据请求
        // request: "http://192.168.0.38:3000/mock/106/api/table",
        map: {
          // 请求数据路径映射
          dataPath: "data",
          // 数据显示 支持es6表达式 例如${descriptEn} - ${descript} 或者 (${descriptEn})
          titlePath: "descriptEn",
          // 链接v-model定义的数据项
          valuePath: "descriptEn"
        }
      },
      config2: {
        // 是否多选 会影响返回参数
        multiple: false,
        // 是否自动选中第一个
        // first: true,
        // 与request互斥 不需要请求 手动带入列表
        list: [
          {
            descriptEn: 111,
            icon: "ios-ice-cream-outline",
            descript: "cccc"
          },
          {
            descriptEn: 222,
            descript: 0
          }
        ],
        // 数据请求
        // request: "http://192.168.0.38:3000/mock/106/api/table",
        map: {
          // 请求数据路径映射
          dataPath: "data",
          // 数据显示 支持es6表达式 例如${descriptEn} - ${descript} 或者 (${descriptEn})
          titlePath: "descriptEn",
          // 链接v-model定义的数据项
          valuePath: "descriptEn"
        }
      }
    };
  },
  methods: {
    changeList() {
      this.value2 = [];
      this.config.list = [];
    }
  }
};
</script>

<style></style>
