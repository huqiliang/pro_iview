import axios from "axios";
import _ from "lodash";
export default (request, datas) => {
  // 字符串 是request:"/url"
  if (_.isString(request)) {
    return axios.get(request, { params: datas });
  }
  // 对象 是request:{url:"/url"}
  if (_.isObjectLike(request)) {
    let params = {},
      data = {};
    const method = request.method ? _.toUpper(request.method) : "GET";
    const datasPick = _.has(request, "keys")
      ? _.pick(datas, request.keys)
      : datas;

    if (method === "GET") {
      params = datasPick;
    } else {
      data = datasPick;
    }
    return axios({ ...request, params, data });
  }
  // 对象本身就是axios
  if (_.isFunction(request)) {
    return request(datas);
  }
  return { type: "error", msg: "something is wrong" };
};
