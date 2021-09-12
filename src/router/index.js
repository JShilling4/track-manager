import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Tracks from "../views/Tracks.vue";
import Lists from "../views/Lists.vue";
import Calendar from "../views/Calendar.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/tracks",
        name: "Tracks",
        component: Tracks,
    },
    {
        path: "/lists",
        name: "Lists",
        component: Lists,
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
