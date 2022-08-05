<template>
  <Tooltip transfer placement="top" :content="rowContent">
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
            :indeterminate="
              myColumns.length > 0 && myColumns.length !== columns.length
            "
            :value="checkAll"
            @click.prevent.native="handleCheckAll"
            >{{ rowContent }}</Checkbox
          >
          <a @click="reset">{{ resetContent }}</a>
        </div>

        <CheckboxGroup v-model="myColumns">
          <DropdownItem v-for="item in columns" :key="item.key">
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
    rowContent: {
      type: String
    },
    resetContent: {
      type: String
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    storage: {
      type: String
    }
  },
  data() {
    return {
      visible: false
    };
  },
  mounted() {
    if (this.storage) {
      try {
        const lc = JSON.parse(
          localStorage.getItem(`ProRowSetting:${this.storage}`)
        );
        this.$emit("change", lc);
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    checkAll() {
      return this.myColumns.length == this.columns.length;
    },
    myColumns: {
      get() {
        return _.map(
          _.filter(this.columns, val => !val.notShowTable),
          "key"
        );
      },
      set(val) {
        let arr = [];
        _.map(this.columns, item => {
          arr.push({
            ...item,
            notShowTable: _.includes(val, item.key) ? false : true
          });
        });
        this.$emit("change", arr);
        // this.$emit("change", val);
      }
    }
  },
  methods: {
    reset() {
      this.setShowTableAll(false);
    },
    setShowTableAll(notShowTable) {
      let arr = [];
      _.map(this.columns, item => {
        arr.push({
          ...item,
          notShowTable
        });
      });
      // this.checkAll = !notShowTable;
      this.$emit("change", arr);
    },
    handleOpen() {
      this.visible = !this.visible;
    },
    handleCheckAll() {
      console.log(this.myColumns.length, this.columns.length);
      if (this.myColumns.length != this.columns.length) {
        this.reset();
      } else {
        this.setShowTableAll(true);
      }
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
