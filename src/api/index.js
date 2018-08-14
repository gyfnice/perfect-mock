     //接口管理中心
import axios from "axios";
import {Polly} from "@pollyjs/core"; 

const polly = new Polly('<Recording Name>', {
  adapters: ['xhr'],
  mode: 'record'
});

const devMode = false; //一键切换开发环境 用户名： admin  111111

//所有请求路径的地址
const router = {
  Region: {
    findAllRegions: 'Region/findAllRegions'
  },
  houseSailWebsite: {
    listRegion: 'houseSailWebsite/listRegion'
  },
  contentSailWebsite: {
    topList: 'contentSailWebsite/topList'
  },
  dictionary: {
    selectByPCode: "dictionary/selectByPCode", //获取公寓形式/付款方式下拉列表
  }
};

function interceptorsMethod(store, context) {
  //全局Ajax监控
  axios.interceptors.response.use(
    response => {
      if (response.data.code !== 10000) {}
      return response;
    },
    error => {
      console.log("error");
      Promise.resolve(error.response);
    }
  );

  axios.interceptors.request.use(
    request => {
      return request;
    },
    error => {
      console.log(error);
      Promise.reject(error);
    }
  );
}

function requestMethod(method, uri, data = null) {
  //全局ajax请求方式
  if (!method) {
    console.error("API function call requires method argument");
    return;
  }

  if (!uri) {
    console.error("API function call requires uri argument");
    return;
  }
  var url = uri;

  if (method === "get") {
    return axios.get(url, {
      params: data,
      timeout: 200000
    }).then(res => {
      polly.stop();
      return res;
    });
  }
  return axios({ method, url, data, timeout: 10000 }).then(res => {
    polly.stop();
    return res;
  });
}

export default {
  getURL: url => {
    url = url.replace(/^\//, "");
    const [path, subPath] = url.match(/\w+/g);
    //请求路径
    //return "/sail-web/" + router[path][subPath];
    return 'http://47.93.117.57:8081/' + router[path][subPath];
  },
  interceptorsMethod: interceptorsMethod,
  request: requestMethod
};
