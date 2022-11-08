<template>
  <div class="proform">
    <UIEditFrame
      type="all"
      :uiEdit="uiEdit"
      uiText="全局配置"
      :noBorder="true"
      @config="uiConfig('all')"
    >
      <Form
        ref="form"
        :model="value"
        :label-width="labelPosition !== 'top' ? labelWidth : 0"
        :label-position="labelPosition"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <div v-for="(columns, index) in groupColunms" :key="index">
          <span class="groupTitle" v-if="index != 'undefined'">{{
            index
          }}</span>
          <div
            class="formContain"
            :style="{
              'grid-template-columns': `repeat(${formLineNum},minmax(auto,${100 /
                formLineNum +
                '%'}))`
            }"
            :class="{
              p10: groupColunms && Object.keys(groupColunms).length > 1
            }"
          >
            <!-- <Icon type="md-bookmark" /> -->
            <template v-for="item in columns">
              <UIEditFrame
                :key="item.key"
                :uiEdit="uiEdit"
                :data="item"
                :uiActive="item.uiActive"
                uiText="删除"
                @choose="uiChoose(item)"
                @config="uiConfig(item)"
                :style="{
                  'grid-column-start': `span ${item.formLineNum}`
                }"
              >
                <FormItem
                  :style="{
                    'grid-column-start': `span ${item.formLineNum}`
                  }"
                  :label-width="
                    labelPosition !== 'top' && item.title ? labelWidth : 0
                  "
                  class="item"
                  :prop="propItem(item)"
                  :rules="ruleChange(item)"
                  v-if="showColumns(item)"
                  @click.native="itemClick(item)"
                >
                  <span
                    slot="label"
                    v-if="item.title"
                    :style="
                      labelPosition !== 'top' ? '' : 'white-space: nowrap;'
                    "
                  >
                    <Icon
                      type="md-bookmark"
                      v-if="item.icons && item.icons.form"
                    />
                    {{ item.title ? item.title + " :" : "" }}
                  </span>
                  <ProTypeItem
                    v-if="item.renderForm"
                    :item="item"
                    :outData="outData"
                    :renderItem="item.renderForm"
                    :value="getValue(value, item)"
                    @input="change(item, $event)"
                    @wapperInput="wapperInput(item, $event)"
                    class="input ivu-input-wrapper"
                    :style="{
                      width: `${
                        item.formWidth > 100
                          ? item.formWidth + 'px'
                          : item.formWidth + '%'
                      }`
                    }"
                  ></ProTypeItem>
                  <div v-else-if="type === 'view'">
                    {{ getValue(value, item) }}
                  </div>

                  <Input
                    v-else
                    type="text"
                    clearable
                    :disabled="item.disabled"
                    :readonly="item.readonly"
                    :value="getValue(value, item)"
                    :placeholder="item.title"
                    @input="change(item, $event)"
                    :style="{
                      width: `${
                        item.formWidth > 100
                          ? item.formWidth + 'px'
                          : item.formWidth + '%'
                      }`
                    }"
                  >
                  </Input>
                </FormItem>
              </UIEditFrame>
            </template>
          </div>
        </div>
        <slot name="footer" v-if="submitForm && !submitForm.hide">
          <FormItem :style="{ textAlign: submitForm.position }">
            <Button type="primary" @click="submit">确定</Button>
            <Button @click="reset" style="margin-left: 8px">重置</Button>
          </FormItem>
        </slot>
      </Form>
    </UIEditFrame>
  </div>
</template>

<script>
import ProTypeItem from "./ProTypeItem/ProTypeItem";
import Locale from "../mixin/locale";
import _ from "lodash";
import UIEditFrame from "../components/LayOut/UIEditFrame.vue";
import customRequest from "../libs/request";

export default {
  name: "ProForm",
  mixins: [Locale],
  props: {
    uiEdit: Boolean,
    submitForm: Object,
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
    formLineNum: {
      type: Number,
      default() {
        return 1;
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
      return {
        ...this.$attrs,
        dialogType: this.type,
        dialogForm: this.value
      };
    },
    groupColunms() {
      return _.groupBy(this.columns, "group");
    }
  },
  methods: {
    submit() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          const res = await customRequest({
            ...this.submitForm,
            datas: this.value
          });
          this.submitForm.complete && this.submitForm.complete(res);
        }
      });
    },
    uiChoose(item) {
      this.$emit("uiChoose", item);
    },
    uiConfig(item) {
      this.$emit("uiConfig", item);
    },
    showColumns(item) {
      if (!item.showForm) {
        return true;
      } else {
        if (_.isArray(item.showForm)) {
          return _.includes(item.showForm, this.type);
        } else if (_.isFunction(item.showForm)) {
          return item.showForm({
            value: this.value,
            type: this.type,
            config: item
          });
        }
        return true;
      }
    },
    itemClick(item, type) {
      this.$emit("itemClick", item, type);
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
      _.set(copyValue, item.key, _.isString(value) ? _.trim(value) : value);
      this.$emit("input", copyValue);
      //单项验证 避免验证问题
      if (this.propItem(item)) {
        this.$nextTick(() => {
          this.validateField(this.propItem(item));
        });
      }
    },
    wapperInput(item, { wapper, value }) {
      console.log(item, value);
      const copyValue = _.cloneDeep(this.value);
      _.set(copyValue, item.key, _.isString(value) ? _.trim(value) : value);
      console.log(copyValue);
      this.$emit("input", { ...copyValue, ...wapper });
      //单项验证 避免验证问题
      // if (this.propItem(item)) {
      //   this.$nextTick(() => {
      //     this.validateField(this.propItem(item));
      //   });
      // }
    },
    reset(fn) {
      this.$refs["form"].resetFields(fn);
    },
    validate(fn) {
      this.$refs["form"].validate(fn);
    },
    validateField(prop, fn) {
      this.$refs["form"].validateField(prop, fn);
    }
  },
  components: {
    ProTypeItem,
    UIEditFrame
  }
};
</script>
<style lang="less" scoped>
.proform {
  /deep/ .ivu-form-label-top .ivu-form-item-label {
    display: flex;
    align-items: center;
  }
  .formContain {
    display: grid;

    grid-column-gap: 10px;
  }
  .groupTitle {
    font-size: 20px;
    font-weight: bold;
  }
  .p10 {
    padding: 20px 0 0 0;
  }
  /deep/ .ivu-input[disabled],
  fieldset[disabled] {
    color: #666 !important;
  }
}
</style>
