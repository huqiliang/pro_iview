# 组件总览

ProIview 是基于 iview 而开发的高阶组件，提供了更高级别的抽象支持，开箱即用。可以显著的提升制作 CRUD 页面的效率，更加专注于页面。


- ProTable 表格模板组件，抽象网络请求和表格格式化
- ProForm 表单模板组件，预设常见布局和行为
- ProSearch 搜索模板组件，预设常见布局和行为

这三种组件的每一项目的底层都是以 proItem 为基础开发,所以都设计了同一种数据结构,这种数据结构贯穿了pro_iview,具体参考一下示例。
## 单项数据

```js
{
    "title": "cataLog",     // 单项名称 
    "group": "B",           // 分组名称 只在 pro_form 中有效，可分成多种展示，配置成同名即可
    "key": "cataLog",       // 当前项的 key ,自动同步到外层v-model中
    "disabled": true,       // 禁用启用当前项
    "renderSearch": {       // 对象方式快捷 -- 简易模式
        "type": "Radio"         // 配置单项渲染,自动支持v-model,生成器生成的即为此类代码
    },
    "renderForm": {         // 对象方式快捷 -- 复杂模式
        "type": "DatePicker",
        "style": {          // 修改样式
            "width": "100%"
        },
        "props": {          // 传入组件属性
            "placeholder": "lastDate",
            "format": "yyyy-MM-dd hh:mm:ss"
        },
        format(value) {     // 格式化当前v-model的值,请注意与上面的format区分
            return value ? dayjs(value).format("YYYY-MM-DD hh:mm:ss") : "";
        }
    },
    "rules": [                // 验证规则,也可以写成 validate
        {                           //在form上加ref后调用 this.$refs.form.validate进行验证
            required: true,
            message: "不能为空"
        },
        {
            pattern: /.*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,  // 正则表达式验证
            message: "邮箱格式不正确",
            trigger: "blur,change",
        },
    ],
    renderTable: () => {    // 自定义Table显示 建议直接使用jsx模式
        return (
            <Button onclick={() => {
                console.log("aaa");
            }}>
                aaa
            </Button>
        );
    },
    renderForm: () => {},
    renderSearch: () => {},
}
```