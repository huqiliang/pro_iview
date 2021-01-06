<template>
  <Form
    v-bind="$attrs"
    label-position="left"
    v-on="$listeners"
    class="prosearch"
  >
    <div class="search">
      <FormItem
        class="item"
        :style="[offset(i), widthCalc()]"
        v-for="(item, i) in columns"
        v-show="itemShow(i)"
        :key="item.key"
        :label="item.title + ' :'"
      >
        <ProSearchItem
          :render="item.renderSearch"
          v-if="item.renderSearch"
          v-model="value[item.key]"
          class="input"
        ></ProSearchItem>
        <Input clearable v-model="value[item.key]" v-else class="input" />
      </FormItem>
      <FormItem class="item" style="margin-left:15px" :style="widthCalc()">
        <label class="ivu-form-item-label">
          <pre></pre>
        </label>
        <div class="input" style="clear:both;text-align:right">
          <Button @click="reset" class="ml10">重置</Button>
          <Button @click="search" :loading="loading" class="ml10" type="primary"
            >查询</Button
          >
          <a class="text" @click="upDown">
            {{ isDown ? "收起" : "展开" }}
            <Icon :type="isDown ? 'ios-arrow-up' : 'ios-arrow-down'" />
          </a>
        </div>
      </FormItem>
    </div>
  </Form>
</template>

<script>
import ProSearchItem from "./ProSearch/ProSearchItem";
export default {
  data() {
    return {
      isDown: true
    };
  },
  props: {
    loading: {
      default: false
    },
    columns: {
      required: true
    },
    value: {},
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
    widthCalc() {
      return {
        width: `calc((100% - ${15 * (this.searchLineNum - 1)}px) / ${
          this.searchLineNum
        })`
      };
    },
    itemShow(i) {
      if (this.isDown) {
        return true;
      } else {
        if (i > 1) {
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
    ProSearchItem
  }
};
</script>

<style lang="less">
.prosearch {
  margin: 0 10px;
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
    cursor: pointer;
    margin-left: 12px;
  }
  .input {
    width: 100%;
  }
}
</style>
