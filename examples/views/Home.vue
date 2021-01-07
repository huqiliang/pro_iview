<template>
  <div class="home">
    <pro-table
      :request="request"
      :map="map"
      :columns="columns"
      :submitForm="submitForm"
    >
      <div slot="search"></div>
    </pro-table>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
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
              type: "edit"
            },
            {
              title: "删除",
              type: "delete",
              method: "post",
              requestParams: "id",
              request(options) {
                console.log(options);
                return axios.delete(
                  "https://yapi.ihotel.cn/mock/67/sys/sysOptionList",
                  {
                    params: { ...options }
                  }
                );
              }
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
  components: {}
};
</script>
<style>
.home {
  width: 60%;
}
</style>
