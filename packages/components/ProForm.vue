<template>
  <div class="proform">
    <Form
      ref="form"
      :model="value"
      :label-width="labelWidth"
      :label-position="labelPosition"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div v-for="(columns, index) in groupColunms" :key="index">
        <span class="groupTitle" v-if="index != 'undefined'">{{ index }}</span>
        <div
          class="formContain"
          :class="{ p10: groupColunms && Object.keys(groupColunms).length > 1 }"
        >
          <!-- <Icon type="md-bookmark" /> -->
          <FormItem
            :key="item.key"
            :prop="propItem(item)"
            :rules="ruleChange(item)"
            v-for="item in columns"
            @click.native="itemClick(item)"
          >
            <span slot="label">
              <Icon type="md-bookmark" v-if="item.icons && item.icons.form" />
              {{ item.title + " :" }}
            </span>
            <ProTypeItem
              v-if="item.renderForm"
              :item="item"
              :outData="outData"
              :renderItem="item.renderForm"
              :value="getValue(value, item)"
              @input="change(item, $event)"
              class="input ivu-input-wrapper"
            ></ProTypeItem>
            <div v-else-if="type === 'view'">{{ getValue(value, item) }}</div>
            <Input
              v-else
              type="text"
              clearable
              :disabled="item.disabled"
              :readonly="item.readonly"
              :value="getValue(value, item)"
              :placeholder="item.title"
              @input="change(item, $event)"
            >
            </Input>
          </FormItem>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import ProTypeItem from "./ProTypeItem/ProTypeItem";
import _ from "lodash";
export default {
  name: "ProForm",
  props: {
    type: {
      type: String,
      default() {
        return "edit";
      }
    },
    labelWidth: {
      type: Number,
      default() {
        return 110;
      }
    },
    labelPosition: {
      type: String,
      default() {
        return "left";
      }
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      default() {
        return {};
      }
    }
  },
  computed: {
    outData() {
      return { dialogType: this.type, dialogForm: this.value };
    },
    groupColunms() {
      return _.groupBy(this.columns, "group");
    }
  },
  methods: {
    itemClick(item) {
      this.$emit("itemClick", item);
    },
    ruleChange(item) {
      const rules = item.rules || item.validate;
      _.map(rules, val => {
        if (val.pattern && _.isString(val.pattern)) {
          val.pattern = new RegExp(val.pattern);
        }
      });
      return rules;
    },
    getValue(value, item) {
      return _.get(value, item.key);
    },
    propItem(item) {
      let key = item.key;
      if (key && key.indexOf(".") > -1) {
        key = _.replace(key, ".", "-");
      }
      return key;
    },
    change(item, value) {
      const copyValue = _.cloneDeep(this.value);
      _.set(copyValue, item.key, value);
      this.$emit("input", copyValue);
      // this.$set(this.value, copyValue);
    },
    reset(fn) {
      this.$refs["form"].resetFields(fn);
    },
    validate(fn) {
      this.$refs["form"].validate(fn);
    }
  },
  components: {
    ProTypeItem
  }
};
</script>
<style lang="less" scoped>
.groupTitle {
  font-size: 20px;
  font-weight: bold;
}
.p10 {
  padding: 20px 0 0 20px;
}
/deep/ .ivu-input[disabled],
fieldset[disabled] {
  color: #666 !important;
}
</style>
