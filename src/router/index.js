/*
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-04-01 21:21:41
 * @FilePath: \vue_manage\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/

const Login = () => import("@/views/login/Login.vue");
const wrongPage = () => import("@/views/404/wrongPage.vue");
const Layout = () => import("@/views/layout/Layout.vue");

const Home = () => import("@/views/home/Home.vue");
const YCList = () => import("@/views/pms/yc/YCList.vue");
const WCList = () => import("@/views/pms/wc/WCList.vue");


export const constantRouterMap = [
  {
    path: "/login",
    name: "login",
    component: Login,
    hidden: true,
  },
  {
    path: "/404",
    name: "404",
    component: wrongPage,
    hidden: true,
  },
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Layout,
    children: [
      {
        path: "",
        name: "home",
        component: Home,
        meta: {
          title: "首页",
          icon: "home",
        },
      },
    ],
  },
];

export const asyncRouterMap = [
  {
    path: "/pms",
    component: Layout,
    redirect: "/pms/product",
    name: "pms",
    meta: {
      title: "产品",
      icon: "product",
    },
    children: [
      {
        path: "yc",
        name: "yc",
        component: YCList,
        meta: {
          title: "玉柴",
          icon: "product-list",
        },
      },
      {
        path: "wc",
        name: "wc",
        component: WCList,
        meta: {
          title: "潍柴",
          icon: "product-list",
        },
      },
    ],
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRouterMap,
});

export default router;
