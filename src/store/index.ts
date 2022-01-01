import { createStore } from "vuex";
import TracksVuexModule from "@/store/modules/TracksVuexModule";

export default createStore({
  modules: {
    tracksVuexModule: TracksVuexModule,
  }
});
