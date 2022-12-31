import { App } from "vue";
import chooseArea from "./chooseArea";
import chooseIcon from "./chooseIcon";
import trend from "./trend";
import notification from "./notification";
import List from "./list";
import Menu from "./menu";
import Progress from "./progress";
import ChooseTime from "./chooseTime";

const components = [
  chooseArea,
  chooseIcon,
  trend,
  notification,
  List,
  Menu,
  Progress,
  ChooseTime,
];

export default {
  install(app: App) {
    components.forEach((item) => {
      app.use(item);
    });
  },
};
