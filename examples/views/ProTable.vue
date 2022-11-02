<template>
  <pro-table v-bind="config"></pro-table>
</template>

<script>
export default {
  data() {
    return {
      config: {
        toolBarActions: ["new", "refresh", "fullscreen", "rowSetting"],
        request: "https://jsonplaceholder.typicode.com/posts",
        columns: [
          {
            title: "userId",
            key: "userId",
            renderForm: { type: "Input" },
            formWidth: 60,
            validate: [
              {
                title: "必填",
                code: "required",
                required: true,
                message: "输入框必填",
                trigger: "change",
                type: null
              }
            ]
          },
          { title: "id", key: "id" },
          { title: "title", key: "title" },
          { title: "body", key: "body" }
        ],
        map: {}
      }
    };
  }
};
</script>

<style></style>
