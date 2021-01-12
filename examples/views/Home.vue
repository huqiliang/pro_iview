<template>
  <div class="home">
    <!-- <pro-form :columns="autoData.columns" v-model="autoData.value"></pro-form> -->
    <pro-table
      :request="request"
      :map="map"
      :columns="columns"
      :submitForm="submitForm"
    >
    </pro-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      autoData: {
        columns: [
          {
            title: "标题",
            key: "toolBar",
            type: "radio"
          }
        ],
        value: {
          toolBar: false
        }
      },
      columns: [
        {
          title: "cataLog",
          key: "cataLog",
          notShowSearch: true,
          // renderSearch: () => {
          //   return <div>aaa</div>;
          // },
          renderSearch: {
            type: "InputNumber"
          },
          renderTable: () => {
            return <div>aaa</div>;
          }
        },
        {
          title: "createUser",
          key: "createUser"
        },
        {
          title: "createUse2r2",
          key: "createUs2er2"
        },
        {
          title: "createUser3",
          key: "createUser2"
        },
        {
          title: "createUser3",
          key: "createUser3"
        },
        {
          title: "createUser4",
          key: "createUser4"
        },
        {
          title: "createUs3er4",
          key: "createUs3er4"
        },
        {
          title: "descript",
          key: "descript"
        },
        {
          title: "操作",
          key: "action",
          actions: [
            {
              title: "编辑",
              method: "POST",
              type: "edit",
              request(options) {
                console.log(options);
                return axios.post(
                  "https://yapi.ihotel.cn/mock/67/sys/sysOptionList",
                  {
                    a: options.row.cateLog
                  }
                );
              }
            },
            {
              title: "删除",
              type: "delete",
              method: "post",
              requestParams: "id"
            }
          ]
        }
      ],
      request: "https://yapi.ihotel.cn/mock/67/sys/sysOptionList",
      // request(options) {
      //   console.log(options);
      //   return axios.get("https://yapi.ihotel.cn/mock/67/sys/sysOptionList", {
      //     params: { ...options }
      //   });
      // },
      map: {
        dataPath: "data",
        totalPath: "totalRows"
      },
      submitForm: "/222"
    };
  },
  methods: {
    table() {
      const ref = this.$refs.proSearch;
      console.log(ref.value);
    }
  }
};
</script>
<style>
.home {
  width: 70%;
  margin: 0 auto;
}
</style>
