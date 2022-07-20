<template>
  <div>
    <div
      v-if="uiEdit"
      class="UIEditFrame"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
      :style="{ border: noBorder ? 'none' : '1px dashed #d97706' }"
    >
      <div
        @click="choose"
        class="bg"
        :style="{
          background: type !== 'all' && active ? '#93C5FD' : ''
        }"
      ></div>
      <div
        class="edit"
        :style="{
          left: type === 'all' ? '10px' : 'auto',
          top: type === 'all' ? '-20px' : 'auto'
        }"
      >
        <Button
          @click="config"
          size="small"
          :type="active ? 'primary' : 'default'"
          >{{ uiText ? uiText : type != "all" ? "配置" : "全局配置" }}</Button
        >
      </div>
      <slot></slot>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  props: {
    uiText: String,
    uiEdit: Boolean,
    type: String,
    noBorder: Boolean
  },
  data() {
    return {
      active: false
    };
  },
  methods: {
    choose() {
      this.$emit("choose", {
        type: this.type
      });
    },
    config() {
      this.$emit("config", {
        type: this.type
      });
    },
    mouseenter() {
      this.active = true;
    },
    mouseleave() {
      this.active = false;
    }
  }
};
</script>

<style lang="less">
.UIEditFrame {
  border: 1px dashed #d97706;
  position: relative;
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 900;
    opacity: 0.2;
  }
  .edit {
    z-index: 998;
    position: absolute;
    text-align: center;
    background: #fff;
    width: 40px;
    right: 10px;
    top: -10px;
  }
}
</style>
