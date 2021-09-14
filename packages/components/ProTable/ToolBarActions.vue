<script>
import _ from "lodash";
import RowSetting from "./RowSetting.vue";
export default {
  render() {
    return [
      {
        key: "new",
        renderItem: () => {
          return (
            <Button
              type="primary"
              onclick={() => {
                this.tableAction({ type: "new" });
              }}
            >
              <Icon type="md-add" class="buttonIcon" />
              <span>{this.t("pro.common.new")}</span>
            </Button>
          );
        }
      },
      {
        key: "refresh",
        renderItem: () => {
          return (
            <Tooltip
              transfer
              placement="top"
              content={this.$t("pro.common.refresh")}
            >
              <Icon
                onclick={() => {
                  this.fetch();
                }}
                class="table_icon"
                type="md-refresh"
                size="20"
              />
            </Tooltip>
          );
        }
      },
      {
        key: "fullscreen",
        renderItem: () => {
          return (
            <Tooltip
              transfer
              placement="top"
              content={this.t("pro.common.fullscreen")}
            >
              <Icon
                onclick={() => {
                  this.fullscreen = !this.fullscreen;
                }}
                class="table_icon"
                type="ios-expand"
                size="20"
              />
            </Tooltip>
          );
        }
      },
      {
        key: "rowSetting",
        renderItem: () => {
          return (
            <RowSetting
              columns={this.tableColumns}
              onChange={keys => {
                _.map(this.columns, item => {
                  this.$set(
                    item,
                    "notShowTable",
                    _.includes(keys, item.key) ? false : true
                  );
                });
              }}
            ></RowSetting>
          );
        }
      }
    ];
  }
};
</script>

<style></style>
