import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import MenuManage from "@/components/MenuManage";
// import CameraManage from "@/components/CameraManage";
// import MenuManage from "@/components/MenuManage";
// import ajax from 'axios'
Vue.use(Router);


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/api/v1',
      name: 'Login',
      component: () => import("@/components/Login"),
    },
    {
      path: '/api/v1/Menu',
      name: 'MenuManage',
      component: () => import("@/components/MenuManage"),
    }
  ]

  // routes: [
  //   {
  //     path: '/login',
  //     name: 'Login',
  //     component: () => import("@/components/Login"),
  //   },
  //   {
  //     path: '/index',
  //     name: 'MenuManage',
  //     component: () => import("@/components/MenuManage"),
  //   }
  // ]
})

