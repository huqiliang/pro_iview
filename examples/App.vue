<template>
  <div id="app"><router-view /></div>
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
  background: #ddd;
}
.buttonIcon {
  margin-right: 2px;
  position: relative;
  top: -1px;
}
</style>
