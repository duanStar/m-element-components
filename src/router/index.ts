import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home/index.vue";
import Container from "@/components/container/src/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Container,
    children: [
      {
        path: "",
        component: Home,
      },
      {
        path: "/chooseIcon",
        component: () => import("@/views/ChooseIcon/index.vue"),
      },
      {
        path: "/chooseArea",
        component: () => import("@/views/chooseArea/index.vue"),
      },
      {
        path: "/trend",
        component: () => import("@/views/trend/index.vue"),
      },
      {
        path: "/notification",
        component: () => import("@/views/notification/index.vue"),
      },
    ],
  },
];

export default createRouter({
  routes,
  history: createWebHistory(),
});
