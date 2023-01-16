import { App } from "vue";
import ChooseDate from "./src/index.vue";

export default {
  install(app: App) {
    app.component("m-choose-date", ChooseDate);
  },
};
