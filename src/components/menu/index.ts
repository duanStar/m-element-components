import { App } from "vue";
import Menu from "./src/index.vue";
import InfiniteMenu from "./src/menu";

export default {
  install(app: App) {
    app.component("m-menu", Menu);
    app.component("m-infinite-menu", InfiniteMenu);
  },
};
