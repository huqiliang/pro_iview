<template>
  <Form v-on="$listeners" class="prosearch" @submit.native.prevent>
    <div
      class="search"
      :style="{
        'grid-template-columns': `repeat(${searchLineNum}, minmax(auto,${100 /
          searchLineNum +
          '%'}))`
      }"
    >
      <div
        class="item"
        v-for="(item, i) in columns"
        v-show="itemShow(i)"
        :style="{
          'grid-column-start': `span ${
            item.searchLineNum ? item.searchLineNum : 1
          }`
        }"
        :class="position"
        :key="item.key"
        :label="item.title ? item.title + ' :' : ''"
      >
        <label
          v-if="item.title"
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
          :placeholder="
            `${t('pro.common.enter')}${item.title ? item.title : ''}`
          "
          v-model="value[item.key]"
          @keypress.native.enter="search"
          v-else
        />
      </div>
      <div
        class="item"
        :style="{
          'grid-column-start': `span ${downItemSapn}`
        }"
      >
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
import _ from "lodash";
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
    itemShow(i) {
      if (this.isDown) {
        return true;
      } else {
        if (i + 2 > this.searchLineNum && i != 0) {
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
  },
  computed: {
    downItemSapn() {
      let x = 0;
      const list = this.isDown
        ? this.columns
        : _.slice(this.columns, 0, this.searchLineNum - 1);
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (element.searchLineNum) {
          if (element.searchLineNum >= this.searchLineNum) {
            x = 0;
          } else {
            x += element.searchLineNum;
          }
        } else {
          x += 1;
        }
      }
      const yu = x % this.searchLineNum;
      const num = yu == 0 ? this.searchLineNum : this.searchLineNum - yu;
      return num;
    }
  }
};
</script>

<style lang="less" scoped>
.prosearch {
  margin: 0 10px;

  .item {
    margin-bottom: 20px;
    .itemLabel {
      white-space: nowrap;
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
    display: grid;
    grid-column-gap: 10px;
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
