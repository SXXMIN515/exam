import { createRouter, createWebHistory } from "vue-router";
import MainComponent from "@/views/MainComponent.vue";
import BoardList from "@/views/BoardList.vue";
import BoardInfo from "@/views/BoardInfo.vue";
import BoardAdd from "@/views/BoardAdd.vue";
import BoardUpdate from "@/views/BoardUpdate.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainComponent,
    },
    {
      path: "/boardList",
      name: "boardList",
      component: BoardList,
    },
    {
      path: "/boardInfo",
      name: "boardInfo",
      component: BoardInfo,
    },
    {
      path: "/boardAdd",
      name: "boardAdd",
      component: BoardAdd,
    },
    {
      path: "/boardUpdate",
      name: "boardUpdate",
      component: BoardUpdate,
    },
  ],
});

export default router;
