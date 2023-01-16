import { App } from "vue";
import Trend from "./src/index.vue";

export default {
  install(app: App) {
    app.component("m-trend", Trend);
  },
};
