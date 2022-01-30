import "reflect-metadata";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import dayjs from "dayjs";
import { DependencyContainerHelper } from "./helpers";

DependencyContainerHelper.buildDependencyContainer();

// Create Vue instance
const app = createApp(App);

app.use(router);

app.config.globalProperties.$dayjs = dayjs;

// Mount Vue instance
app.mount("#app");
