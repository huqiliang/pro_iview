<template>
  <div class="home">
    <pro-table
      :request="request"
      :map="map"
      :columns="columns"
      :label-width="90"
    ></pro-table>
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
          notShowForm: true,
          renderSearch() {},
          renderTable: () => {
            return <div>aaa</div>;
          }
        },
        {
          title: "createUser",
          key: "createUser"
        },
        {
          title: "descript",
          key: "descript"
        },
        {
          title: "descript2",
          key: "descript2"
        },
        {
          title: "descript3",
          key: "descript3"
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
      }
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
