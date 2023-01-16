import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "@/router";
import * as Icons from "@element-plus/icons-vue";
import { toLine } from "./utils";
import mUI from "@/components";
// import mUI from "../lib/index.es";
import "../lib/style.css";
import "../mock";

const app = createApp(App);

for (let i in Icons) {
  app.component(`el-icon${toLine(i)}`, (Icons as any)[i]);
}

app.use(router).use(ElementPlus).use(mUI);
app.mount("#app");
