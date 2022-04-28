/*
 * @Autor: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-04-02 14:09:20
 * @FilePath: \admin\src\utils\request.js
 */
import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import { getToken, removeToken } from "@/utils/auth";

// 创建axios实例
const service = axios.create({
  // baseURL: "http://www.qcpjfwcx.com:8099/api/index/", // api的base_url
  baseURL: "http://127.0.0.1:8000/api/summery/", // api的base_url
  timeout: 30000, // 请求超时时间
  headers: {
    "Content-Type": "application/json",
  },
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 让每个请求携带自定义token
    if (store.state.user.token) {
      config.headers["Authorization"] = getToken();
    }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log("err" + error);
    Message({
      message: error.message,
      type: "error",
    });
    removeToken();
    location.reload(); // 为了重新实例化vue-router对象 避免bug
    return Promise.reject(error);
  }
);

export default service;
