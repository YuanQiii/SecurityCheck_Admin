/*
 * @Autor: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-04-02 14:15:30
 * @FilePath: \admin\src\api\user.js
 */
import request from "@/utils/request";

export function loginApi(username, password) {
  return request({
    url: "/login",
    method: "post",
    data: {
      username,
      password,
    },
  });
}

export function userInfoApi() {
  return request({
    url: "/userInfo",
    method: "get",
  });
}
