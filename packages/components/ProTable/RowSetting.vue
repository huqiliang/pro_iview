<template>
  <Tooltip transfer placement="top" :content="$t('pro.table.rowSetting')">
    <Dropdown class="rowSetting" transfer trigger="custom" :visible="visible">
      <Icon
        size="20"
        class="table_icon"
        @click="handleOpen"
        type="ios-settings"
      ></Icon>
      <DropdownMenu slot="list">
        <div class="dropHeader">
          <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll"
            >列展示</Checkbox
          >
          <a @click="reset">重置</a>
        </div>
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
          <DropdownItem v-for="item in firstColunms" :key="item.key">
            <Checkbox :label="item.key">
              <span>{{ item.title }}</span>
            </Checkbox>
          </DropdownItem>
        </CheckboxGroup>
      </DropdownMenu>
    </Dropdown>
  </Tooltip>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      indeterminate: false,
      visible: false,
      firstColunms: [],
      checkAll: true,
      checkAllGroup: []
    };
  },
  mounted() {
    this.firstColunms = _.cloneDeep(this.columns);
    this.checkAllGroup = _.map(this.firstColunms, "key");
  },
  methods: {
    reset(e) {
      e.preventDefault();
      this.checkAll = true;
      this.checkAllGroup = _.map(this.firstColunms, "key");
      this.indeterminate = false;
      this.$emit("change", this.checkAllGroup);
    },
    handleOpen() {
      this.visible = !this.visible;
    },
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = _.map(this.firstColunms, "key");
      } else {
        this.checkAllGroup = [];
      }
      this.$emit("change", this.checkAllGroup);
    },
    checkAllGroupChange(data) {
      if (data.length === this.firstColunms.length) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
      console.log(this.columns);
      this.$emit("change", data);
    }
  }
};
</script>
<style lang="less" scoped>
.dropHeader {
  padding: 5px 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
}

.table_icon {
  cursor: pointer;
}
</style>
