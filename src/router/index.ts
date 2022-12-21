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
    ],
  },
];

export default createRouter({
  routes,
  history: createWebHistory(),
});
