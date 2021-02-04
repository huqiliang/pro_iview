<template>
  <div class="config">
    <Button @click="rightDrawer = true" type="primary">页面配置</Button>
    <Drawer v-model="rightDrawer" width="500" :mask-closable="false">
      <Tabs value="datas" style="width:100%">
        <TabPane
          v-for="item in configList"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        >
          {{ value }}
          <pro-form
            v-if="item.columns"
            :label-width="80"
            :columns="item.columns"
            v-model="value"
          ></pro-form>
        </TabPane>
        <!-- <TabPane label="表单配置" name="form">表单配置的内容</TabPane>
        <TabPane label="数据配置" name="datas">数据配置的内容</TabPane> -->
      </Tabs>
      <div class="config-footer">
        <Button style="margin-right: 8px" @click="value3 = false">取消</Button>
        <Button type="primary" @click="value3 = false">提交</Button>
      </div>
    </Drawer>
  </div>
</template>
<script>
export default {
  props: {
    value: Object
  },
  data() {
    return {
      rightDrawer: false,
      configList: [
        {
          name: "base",
          label: "基本配置",
          datas: []
        },
        {
          name: "form",
          label: "表单配置",
          datas: []
        },
        {
          name: "datas",
          label: "数据配置",
          columns: [
            { title: "配置方式", key: "request" },
            { title: "请求配置", key: "request2" },
            { title: "数据路径", key: "map.dataPath" },
            { title: "分页总数", key: "map.totalPath" }
          ]
        }
      ],
      data1: [
        {
          title: "parent 1",
          expand: true,
          children: [
            {
              title: "parent 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1"
                },
                {
                  title: "leaf 1-1-2"
                }
              ]
            },
            {
              title: "parent 1-2",
              expand: true,
              children: [
                {
                  title: "leaf 1-2-1"
                },
                {
                  title: "leaf 1-2-1"
                }
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>
<style lang="less">
.ivu-drawer-body {
  padding: 16px 0 !important;
}
.ivu-tabs-tabpane {
  padding: 0 20px;
}
.config-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
