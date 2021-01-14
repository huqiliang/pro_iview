<template>
  <div id="app">
    <Button @click="change('zh-CN')">中文</Button>
    <Button @click="change('en-US')">E文</Button>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    change(lang) {
      this.$i18n.locale = lang;
    }
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
