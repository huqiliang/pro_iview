<template>
  <div class="build">
    <!-- <pro-table :request="config" :columns="columns" :map="map"> </pro-table> -->

    <Form inline>
      <FormItem>
        <Select v-model="config.method">
          <Option v-for="item in methods" :key="item" :value="item">{{
            item
          }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Input v-model="config.url"></Input>
      </FormItem>
      <Button type="primary" @click="send">请求</Button>
    </Form>
    <div class="tree">
      <VueJsonPretty
        :path="'res'"
        :data="datas"
        selectableType="single"
        v-model="config.path"
        showLine
        showDoubleQuotes
        highlightSelectedNode
        showSelectController
      ></VueJsonPretty>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

export default {
  data() {
    return {
      methods: ["GET", "POST"],
      map: {
        dataPath: "data",
        totalPath: "totalRows"
      },
      datas: [],
      config: {
        url: "https://yapi.ihotel.cn/mock/67/sys/sysOptionList",
        method: "GET",
        path: ""
      }
    };
  },
  components: {
    VueJsonPretty
  },
  computed: {
    columns() {
      let arr = [];
      if (
        !_.isEmpty(this.config.path) &&
        _.isArray(this.datas[_.replace(this.config.path, "res.", "")]) &&
        this.datas[_.replace(this.config.path, "res.", "")].length > 0
      ) {
        _.map(
          this.datas[_.replace(this.config.path, "res.", "")][0],
          (val, key) => {
            arr.push({
              title: key,
              key
            });
          }
        );
        return arr;
      }
      return [];
    }
  },
  methods: {
    async send() {
      const res = await axios(this.config);
      this.datas = res.data;
    }
  }
};
</script>

<style>
.tree {
  text-align: left;
}
</style>
