<template>
  <div>
    <pro-form
      ref="addForm"
      label-position="right"
      :label-width="100"
      :columns="columns"
      v-model="addForm"
    ></pro-form>
    <Button @click="$refs.addForm.validateField('unitScene')">bbbb</Button>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  data() {
    return {
      addForm: {
        unitScene: "A,B"
      },
      add: {
        scenes: [
          {
            value: "A",
            code: "A"
          },
          {
            value: "b",
            code: "b"
          },
          {
            value: "c",
            code: "c"
          }
        ]
      },
      columns: [
        {
          title: "业态",
          key: "unitScene",
          rules: [
            {
              required: true,
              message: "业态不能为空"
            }
          ],
          renderForm: ({ value, input }) => {
            console.log("value", value);
            const arr = _.isEmpty(value)
              ? []
              : _.isString(value)
              ? value.split(",")
              : value;
            console.log("arr", this.$refs);
            this.$refs.addForm && this.$refs.addForm.validateField("unitScene");
            return (
              <i-select
                clearable
                multiple
                value={arr}
                onInput={val => {
                  input(val);
                }}
              >
                {_.map(this.add.scenes, val => {
                  return <i-option value={val.code}>{val.value}</i-option>;
                })}
              </i-select>
            );
          }
        }
      ]
    };
  }
};
</script>
