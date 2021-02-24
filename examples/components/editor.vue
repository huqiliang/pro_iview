<template>
  <div class="json-editor">
    <textarea ref="textarea" />
    <Button type="primary" class="button" @click="format">格式化</Button>
  </div>
</template>

<script>
import CodeMirror from "codemirror";
import "codemirror/addon/lint/lint.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/rubyblue.css"; // 主题显示，可以百度搜索其他的主题
require("script-loader!jsonlint");
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/json-lint";

export default {
  name: "JsonEditor",
  /* eslint-disable vue/require-prop-types */
  //   props: ['value'],
  data() {
    return {
      value: "",
      jsonEditor: false
    };
  },
  // 监听是否数据改变，随时更新json数据
  // watch: {
  //   value(value) {
  //     console.log(value);
  //     const editorValue = this.jsonEditor.getValue();
  //     if (value !== editorValue) {
  //       this.jsonEditor.setValue(JSON.stringify(this.value, null, 2));
  //     }
  //   },
  //   immediate: true,
  //   deep: true
  // },
  mounted() {
    // 模拟数据接口
    this.value = {
      type: "Select",
      props: ""
    };
    // CodeMirror的配置项，搜官网看这里的配置项配置
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true, // 是否显示行数
      mode: "application/json", // 接受的类型，json xml....
      gutters: ["CodeMirror-lint-markers"], // 样式的宽度
      theme: "rubyblue", // 主题
      lint: true
    });

    this.format();
    // this.jsonEditor.on("change", cm => {
    //   this.$emit("changed", cm.getValue());
    //   // 编辑json框里面的内容可以时刻监听到值，通过cm.getValue()获取到
    // });
  },
  methods: {
    format() {
      this.jsonEditor.setValue(JSON.stringify(this.value, null, 2));
    },
    getValue() {
      return this.jsonEditor.getValue();
    }
  }
};
</script>

<style scoped>
.json-editor {
  height: 100vh;
  position: relative;
}
.button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 10000;
}
.json-editor >>> .CodeMirror {
  height: auto;
}
.json-editor >>> .CodeMirror-scroll {
  min-height: 100vh;
}
.json-editor >>> .cm-s-rubyblue span.cm-string {
  color: #f08047;
}
</style>
