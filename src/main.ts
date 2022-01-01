import "reflect-metadata";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import dayjs from "dayjs";
import GlobalComponents from "./includes/_globals";
import { DependencyContainerHelper } from "./helpers";

DependencyContainerHelper.buildDependencyContainer();

// Create Vue instance
const app = createApp(App);

app.use(router);
app.use(GlobalComponents);

app.config.globalProperties.$dayjs = dayjs;

// Mount Vue instance
app.mount("#app");
