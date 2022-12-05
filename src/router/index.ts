import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Tracks from "../views/Tracks.vue";
import Sets from "../views/Sets.vue";
import Calendar from "../views/Calendar.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    redirect: { name: "Tracks" },
  },
  {
    path: "/tracks",
    name: "Tracks",
    component: Tracks,
  },
  {
    path: "/sets",
    name: "Sets",
    component: Sets,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
