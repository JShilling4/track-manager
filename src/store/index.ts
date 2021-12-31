import { createStore } from "vuex";
import CategoriesVuexModule from "@/store/modules/CategoriesVuexModule";
import TracksVuexModule from "@/store/modules/TracksVuexModule";
import PlayerVuexModule from "@/store/modules/PlayerVuexModule";

export default createStore({
  modules: {
    categoriesVuexModule: CategoriesVuexModule,
    tracksVuexModule: TracksVuexModule,
    playerVuexModule: PlayerVuexModule
  }
});
