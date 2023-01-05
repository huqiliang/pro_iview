<template>
  <Tooltip transfer placement="top" :content="rowContent">
    <Dropdown
      transfer
      class="rowSetting"
      trigger="custom"
      :visible="visible"
      v-click-outside="onClickOutside"
    >
      <Icon
        size="20"
        class="table_icon"
        @click="handleOpen"
        type="ios-settings"
      ></Icon>
      <DropdownMenu slot="list" class="proDownMenus" trigger_out="true">
        <div class="dropHeader" trigger_out="true">
          <Checkbox
            trigger_out="true"
            :indeterminate="
              myColumns.length > 0 && myColumns.length !== columns.length
            "
            :value="checkAll"
            @click.prevent.native="handleCheckAll"
            >{{ rowContent }}</Checkbox
          >
          <a trigger_out="true" @click="reset">{{ resetContent }}</a>
        </div>

        <CheckboxGroup v-model="myColumns" trigger_out="true">
          <DropdownItem
            v-for="item in computedColumns"
            :key="item.key"
            trigger_out="true"
          >
            <Checkbox :label="item.key" trigger_out="true">
              <span trigger_out="true">{{ item.title }}</span>
            </Checkbox>
          </DropdownItem>
        </CheckboxGroup>
      </DropdownMenu>
    </Dropdown>
  </Tooltip>
</template>

<script>
import _ from "lodash";
import { JSONParse } from "../../libs/util";
import vClickOutside from "v-click-outside";

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
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
        const lc = JSONParse(
          localStorage.getItem(`ProRowSetting:${this.storage}`),
          this.$createElement
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
    computedColumns() {
      const arr = _.filter(_.uniqBy(this.columns, "key"), val => {
        return val.title && !_.has(val, "notShowRowSetting");
      });
      return arr;
    },
    myColumns: {
      get() {
        return _.map(
          _.filter(this.computedColumns, val => !val.notShowTable),
          "key"
        );
      },
      set(val) {
        let arr = [];
        _.map(this.computedColumns, item => {
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
    onClickOutside(e) {
      const parent = e.target.parentNode.parentNode;
      if (
        !e.target.getAttribute("trigger_out") &&
        !parent.getAttribute("trigger_out")
      ) {
        this.visible = false;
      }
      //
    },
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
  padding: 0 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
}
.rowSetting {
  position: relative;
  text-align: left;
  .proDownMenus {
    height: 200px;
    overflow: auto;
  }
}
.table_icon {
  cursor: pointer;
}
</style>
