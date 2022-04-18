/*
 * @Autor: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-04-02 16:33:18
 * @FilePath: \vue_manage\src\store\modules\pemission.js
 */
import { constantRouterMap, asyncRouterMap } from "@/router";
import { GENERATE_ROUTES } from "@/store/types";

//判断是否有权限访问该菜单
function hasPermission(menus, route) {
  if (route.name) {
    let currMenu = getMenu(route.name, menus);
    if (currMenu != null) {
      //设置菜单的标题、图标和可见性
      if (currMenu.title != null && currMenu.title !== "") {
        route.meta.title = currMenu.title;
      }
      if (currMenu.icon != null && currMenu.title !== "") {
        route.meta.icon = currMenu.icon;
      }
      if (currMenu.hidden != null) {
        route.hidden = currMenu.hidden !== 0;
      }
      if (currMenu.sort != null && currMenu.sort !== "") {
        route.sort = currMenu.sort;
      }
      return true;
    } else {
      route.sort = 0;
      if (route.hidden !== undefined && route.hidden === true) {
        route.sort = -1;
        return true;
      } else {
        return false;
      }
    }
  } else {
    return true;
  }
}

//根据路由名称获取菜单
function getMenu(name, menus) {
  for (let i = 0; i < menus.length; i++) {
    let menu = menus[i];
    if (name === menu.name) {
      return menu;
    }
  }
  return null;
}

//对菜单进行排序
function sortRouters(accessedRouters) {
  for (let i = 0; i < accessedRouters.length; i++) {
    let router = accessedRouters[i];
    if (router.children && router.children.length > 0) {
      router.children.sort(compare("sort"));
    }
  }
  accessedRouters.sort(compare("sort"));
}

//降序比较函数
function compare(p) {
  return function (m, n) {
    let a = m[p];
    let b = n[p];
    return b - a;
  };
}

const state = {
  routers: constantRouterMap,
  addRouters: [],
};

const getters = {};

const mutations = {
  [GENERATE_ROUTES](state, payload) {
    let accessedRouters = asyncRouterMap.filter((item) => {
      if (hasPermission(payload, item)) {
        if (item.children && item.children.length > 0) {
          item.children = item.children.filter((child) => {
            if (hasPermission(payload, child)) {
              return child;
            }
            return false;
          });
          return item;
        } else {
          return item;
        }
      }
      return false;
    });
    //对菜单进行排序
    sortRouters(accessedRouters);

    state.addRouters = accessedRouters;
    state.routers = constantRouterMap.concat(accessedRouters);
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};