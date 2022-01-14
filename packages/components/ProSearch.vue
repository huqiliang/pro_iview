<template>
  <Form v-on="$listeners" class="prosearch">
    <div class="search">
      <div
        class="item"
        v-for="(item, i) in columns"
        v-show="itemShow(i)"
        :class="position"
        :style="[offset(i), widthCalc(searchLineNum)]"
        :key="item.key"
        :label="item.title + ' :'"
      >
        <label
          class="ivu-form-item-label itemLabel"
          :style="{
            width:
              position === 'top'
                ? '100%'
                : searchLableWidth
                ? `${searchLableWidth}px`
                : 'auto'
          }"
          >{{ item.title }}:
        </label>
        <ProTypeItem
          :renderItem="item.renderSearch"
          v-if="item.renderSearch"
          v-model="value[item.key]"
          @keypress.native.enter="search"
          class="input"
        ></ProTypeItem>
        <Input
          clearable
          v-model="value[item.key]"
          @keypress.native.enter="search"
          v-else
        />
      </div>
      <div :style="widthCalc(searchLineNum)" class="item" style="flex:auto">
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
          <Button @click="reset" class="ml10">
            <Icon type="md-refresh" class="buttonIcon" />
            <span>{{ t("pro.common.reset") }}</span>
          </Button>
          <Button
            @click="search"
            :loading="loading"
            class="ml10"
            type="primary"
          >
            <Icon v-if="!loading" type="ios-search" class="buttonIcon" />
            <span>{{ t("pro.common.search") }}</span>
          </Button>
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
    searchLableWidth: {},
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
      // this.$emit("input", {});
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

<style lang="less" scoped>
.prosearch {
  margin: 0 10px;

  .item {
    margin-bottom: 20px;
    .itemLabel {
      text-align: left;
      padding: 10px 10px 10px 0;
    }
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
