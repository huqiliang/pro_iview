<template>
  <Form v-on="$listeners" class="prosearch">
    <div class="search">
      <div
        class="item"
        :class="position"
        v-for="(item, i) in columns"
        v-show="itemShow(i)"
        :style="[offset(i), widthCalc()]"
        :key="item.key"
        :label="item.title + ' :'"
      >
        <label
          class="ivu-form-item-label"
          :style="{ width: position === 'top' ? '100%' : '100px' }"
          >cataLog :</label
        >
        <ProTypeItem
          :renderItem="item.renderSearch"
          v-if="item.renderSearch"
          v-model="value[item.key]"
          class="input"
        ></ProTypeItem>
        <Input clearable v-model="value[item.key]" v-else />
      </div>
      <div :style="widthCalc()" class="item" style="flex:auto">
        <label
          v-show="
            position === 'top' &&
              (!isDown || (columns && columns.length % searchLineNum !== 0))
          "
          class="ivu-form-item-label"
        >
          <pre></pre>
        </label>
        <div class="input" style="clear:both;text-align:right">
          <Button @click="reset" class="ml10">{{
            t("pro.common.reset")
          }}</Button>
          <Button
            @click="search"
            :loading="loading"
            class="ml10"
            type="primary"
            >{{ t("pro.common.search") }}</Button
          >
          <a
            v-if="columns && columns.length > searchLineNum"
            class="text"
            @click="upDown"
          >
            {{ isDown ? t("pro.common.packUp") : t("pro.common.spread") }}
            <Icon :type="isDown ? 'ios-arrow-up' : 'ios-arrow-down'" />
          </a>
        </div>
      </div>
    </div>
  </Form>
</template>

<script>
import ProTypeItem from "./ProTypeItem/ProTypeItem";
import Locale from "../mixin/locale";

export default {
  name: "ProSearch",
  mixins: [Locale],
  data() {
    return {
      isDown: true
    };
  },
  props: {
    position: {
      default: "left"
    },
    loading: {
      default: false
    },
    columns: {
      required: true
    },
    value: {
      default() {
        return {};
      }
    },
    searchLineNum: {
      default: 3
    }
  },
  methods: {
    offset(index) {
      if (index % this.searchLineNum !== 0) {
        return {
          marginLeft: "15px"
        };
      }
    },
    widthCalc(isFull) {
      return {
        width: isFull
          ? "100%"
          : `calc((100% - ${15 * (this.searchLineNum - 1)}px) / ${
              this.searchLineNum
            })`
      };
    },
    itemShow(i) {
      if (this.isDown) {
        return true;
      } else {
        if (i + 2 > this.searchLineNum) {
          return false;
        }
        return true;
      }
    },
    upDown() {
      this.isDown = !this.isDown;
    },
    reset() {
      this.$emit("input", {});
      this.$emit("reset");
    },
    search() {
      this.$emit("search");
    }
  },
  components: {
    ProTypeItem
  }
};
</script>

<style lang="less">
.prosearch {
  margin: 0 10px;
  .item {
    margin-bottom: 20px;
  }
  .left {
    display: flex;
    text-align: left;
  }
  .top {
    position: relative;
    .ivu-form-item-label {
      text-align: left;
    }
  }
  .buttons {
    text-align: right;
  }
  .search {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }
  .ml10 {
    margin-left: 10px;
  }
  .text {
    vertical-align: middle;
    position: relative;
    left: 12px;
  }
  .input {
    width: 100%;
    height: 32px;
    line-height: 34px;
    text-align: left;
  }
}
</style>
