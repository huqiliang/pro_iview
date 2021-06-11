import axios from "axios";
import _ from "lodash";

const pick = ({ method, datas, keys }) => {
  try {
    let params = {},
      data = {};
    const md = method ? _.toUpper(method) : "GET";
    //_.has(request, "keys")
    const datasPick = !_.isEmpty(keys) ? _.pick(datas, keys) : datas;
    if (md === "GET") {
      params = datasPick;
    } else {
      data = datasPick;
    }
    return { params, data };
  } catch (error) {
    console.log(error);
  }
};

export default ({ request, method, keys, datas }) => {
  // 字符串 是request:"/url"
  if (_.isString(request)) {
    return axios({ url: request, method, ...pick({ method, keys, datas }) });
  }
  // 对象 是request:{url:"/url"}
  else if (_.isObjectLike(request)) {
    const keyOption = _.has(request, "keys") ? request.keys : keys;
    if (_.has(request, "request") && !_.has(request, "url")) {
      if (_.isFunction(request.request)) {
        return request.request(datas);
      }
      request.url = request.request;
    }
    const myMethod = method ? method : request.method;
    return axios({
      ...request,
      ...pick({ method: myMethod, keys: keyOption, datas })
    });
  }
  // 对象本身就是axios
  else if (_.isFunction(request)) {
    return request(datas);
  }
  return new Promise(({ resolve }) => {
    resolve({ data: { type: "error", msg: "something is wrong" } });
  });
};
