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

// 对象序列化，undefined和函数丢失问题
export const JSONStringify = option => {
  return JSON.stringify(
    option,
    (key, val) => {
      // 处理函数丢失问题
      if (typeof val === "function") {
        return `${val}`;
      }
      // 处理undefined丢失问题
      if (typeof val === "undefined") {
        return "undefined";
      }
      return val;
    },
    2
  );
};
// 对象序列化解析
export const JSONParse = (objStr, h) => {
  return JSON.parse(objStr, (k, v) => {
    if (
      typeof v === "string" &&
      v.indexOf &&
      (v.indexOf("function") > -1 ||
        v.indexOf("=>") > -1 ||
        v.indexOf("){") > -1)
    ) {
      // eval 可能在eslint中报错，需要加入下行注释
      // eslint-disable-next-line
      return new Function("h", "return  " + `${v}`)(h);
    }
    return v;
  });
};

// 通用函数 ---- 自定义字符串转函数
const nomalFn = (that, format, value) => {
  if (_.isFunction(format)) {
    return format(value);
  }
  if (_.isString(format)) {
    const fn = new Function("value", `return ${format};`).bind(that);
    return fn(value);
  }
  return false;
};
// 自定义字符串转函数
export const commonToFn = (that, format, value) => {
  let myValue = value;
  const result = nomalFn(that, format, value);
  if (!result && _.isObject(format)) {
    myValue = nomalFn(that, format.value, value);
    // pageValue = fn(this.page);
  } else {
    myValue = result;
  }
  return myValue;
};
