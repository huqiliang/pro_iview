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
          renderForm() {},
          renderTable: () => {
            return <div>aaa</div>;
          }
        },
        {
          title: "createUser",
          // notShowTable: true,
          key: "createUser"
        },
        {
          title: "descript",
          key: "descript"
        }
      ],
      request(options) {
        console.log(options);
        return axios.get("https://yapi.ihotel.cn/mock/67/sys/sysOptionList", {
          params: { ...options }
        });
      },
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
