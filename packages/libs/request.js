import Axios from "axios";
import _ from "lodash";
import Vue from "vue";
import qs from "qs";

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
const replactUrl = (url, data) => {
  try {
    return _.replace(url, /\${(.*)}/, (match, key) => {
      return data[key];
    });
  } catch (error) {
    return url;
  }
};
export default ({ request, method, keys, datas }) => {
  const axios = Vue.$axios || global.$http || Axios;
  if (_.isString(request)) {
    // 字符串 是request:"/url"
    const { token } = qs.parse(location.search, { ignoreQueryPrefix: true });
    return axios({
      headers: {
        Authorization: token ? token : ""
      },
      url: replactUrl(request, datas),
      method,
      ...pick({ method, keys, datas })
    });
  }
  // 对象 是request:{url:"/url"}
  else if (_.isObjectLike(request)) {
    const keyOption = _.has(request, "keys") ? request.keys : keys;
    if (_.has(request, "request") || _.has(request, "url")) {
      if (_.isFunction(request.request)) {
        return request.request(datas);
      }
      request.url = replactUrl(request.request || request.url, datas);
    }

    const myMethod = method ? method : request.method;
    const { token } = qs.parse(location.search, { ignoreQueryPrefix: true });
    return new axios({
      headers: {
        Authorization: token ? token : ""
      },
      ...request,
      ...pick({ method: myMethod, keys: keyOption, datas })
    });
  }
  // 对象本身就是axios
  else if (_.isFunction(request)) {
    return request(datas);
  }
  return new Promise(resolve => {
    resolve({ data: { type: "error", msg: "something is wrong" } });
  });
};
