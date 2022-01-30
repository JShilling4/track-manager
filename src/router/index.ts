import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { Home, Tracks, Lists, Calendar } from "../views";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/tracks",
    name: "Tracks",
    component: Tracks
  },
  {
    path: "/lists",
    name: "Lists",
    component: Lists
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
