<template>
  <UIEditFrame
    type="all"
    :uiEdit="uiEdit"
    uiText="全局配置"
    :noBorder="true"
    @config="$emit('uiConfig', 'all')"
  >
    <Form v-on="$listeners" class="prosearch" @submit.native.prevent>
      <div
        class="search"
        :style="{
          'grid-template-columns': `repeat(${searchLineNum}, minmax(auto,${100 /
            searchLineNum +
            '%'}))`
        }"
      >
        <UIEditFrame
          :uiEdit="uiEdit"
          :key="item.key"
          :data="item"
          :uiActive="item.uiActive"
          uiText="删除"
          @choose="$emit('uiChoose', item)"
          @config="$emit('uiConfig', item)"
          class="item"
          v-for="(item, i) in columns"
          :style="{
            'grid-column-start': `span ${
              item.searchLineNum ? item.searchLineNum : 1
            }`
          }"
          v-show="itemShow(i)"
        >
          <div :class="position" :label="item.title ? item.title + ' :' : ''">
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
              :item="item"
              :renderItem="item.renderSearch"
              v-if="item.renderSearch"
              v-model="value[item.key]"
              @wapperInput="wapperInput"
              @keypress.native.enter="search"
              class="renderInput"
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
        </UIEditFrame>
        <div
          class="item"
          :style="{
            'grid-column-start': `span ${downItemSapn}`
          }"
        >
          <label
            v-if="position !== 'left'"
            class="ivu-form-item-label itemLabel"
            style="height:34px"
          ></label>
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
              @click="upDownHandle"
            >
              {{ isDown ? t("pro.common.packUp") : t("pro.common.spread") }}
              <Icon :type="isDown ? 'ios-arrow-up' : 'ios-arrow-down'" />
            </a>
          </div>
        </div>
      </div>
    </Form>
  </UIEditFrame>
</template>

<script>
import ProTypeItem from "./ProTypeItem/ProTypeItem";
import Locale from "../mixin/locale";
import _ from "lodash";
import UIEditFrame from "../components/LayOut/UIEditFrame.vue";

export default {
  name: "ProSearch",
  mixins: [Locale],
  data() {
    return {
      isDown: true
    };
  },
  props: {
    uiEdit: Boolean,
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
    },
    upDown: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  mounted() {
    this.isDown = this.upDown;
  },
  methods: {
    wapperInput({ wapper }) {
      this.$emit("input", { ...this.value, ...wapper });
    },
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
    upDownHandle() {
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
    ProTypeItem,
    UIEditFrame
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
    position: relative;
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
    left: 5px;
  }
  .renderInput {
    width: 100%;
    line-height: 34px;
    text-align: left;
  }
  .input {
    width: 100%;
    height: 32px;
    line-height: 34px;
    text-align: left;
  }
}
</style>
