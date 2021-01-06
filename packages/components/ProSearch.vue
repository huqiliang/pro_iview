<template>
  <Form v-bind="$attrs" v-on="$listeners" class="prosearch">
    <Row>
      <Col
        span="8"
        v-for="(item, i) in columns"
        v-show="itemShow(i)"
        :key="item.key"
      >
        <FormItem class="formItem" :label="item.title + ' :'">
          <ProSearchItem
            :render="item.renderSearch"
            v-if="item.renderSearch"
            v-model="value[item.key]"
            class="input"
          ></ProSearchItem>
          <Input clearable v-model="value[item.key]" v-else class="input" />
        </FormItem>
      </Col>
      <div class="buttons">
        <Button @click="reset" class="ml10">重置</Button>
        <Button @click="search" :loading="loading" class="ml10" type="primary"
          >查询</Button
        >
        <a class="ml10 text" @click="upDown">
          {{ isDown ? "收起" : "展开" }}
          <Icon :type="isDown ? 'ios-arrow-up' : 'ios-arrow-down'" />
        </a>
      </div>
    </Row>
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
    value: {}
  },
  methods: {
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
  .ml10 {
    margin-left: 10px;
  }
  .text {
    vertical-align: middle;
    cursor: pointer;
    margin-left: 15px;
  }
  .input {
    width: 100%;
  }
}
</style>
