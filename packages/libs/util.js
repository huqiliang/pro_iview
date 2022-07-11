import _ from "lodash";

export const template = (string, item) => {
  let reg = /\${([^{}]*)}/g;
  return string.replace(reg, (match, p1) => {
    let variable = p1.trim();
    if (variable === "") {
      //空白字符
      return "";
    } else if (!/^[a-zA-Z_$]+[\w$]*$/.test(variable)) {
      //对非法标识符做判断。由于精力有限,不判断关键字和保留字
      throw "Unexpected token " + variable;
    } else {
      //使用强大的eval函数直接将字符串按变量执行
      return _.get(item, variable);
    }
  });
};
