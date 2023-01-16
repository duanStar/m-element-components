import { App } from "vue";
import chooseArea from "./chooseArea";
import chooseIcon from "./chooseIcon";
import trend from "./trend";
import notification from "./notification";
import List from "./list";
import Menu from "./menu";
import Progress from "./progress";
import ChooseTime from "./chooseTime";
import ChooseDate from "./chooseDate";
import chooseCity from "./chooseCity";
import Form from "./form";
import ModalForm from "./modalForm";
import Table from "./table";
import Calendar from "./calendar";
import "./styles/base.scss";
import "./styles/ui.scss";
import * as Icons from "@element-plus/icons-vue";
import { toLine } from "./utils";

const components = [
  chooseArea,
  chooseIcon,
  trend,
  notification,
  List,
  Menu,
  Progress,
  ChooseTime,
  ChooseDate,
  chooseCity,
  Form,
  ModalForm,
  Table,
  Calendar,
];

export default {
  install(app: App) {
    for (let i in Icons) {
      app.component(`el-icon${toLine(i)}`, (Icons as any)[i]);
    }
    components.forEach((item) => {
      app.use(item);
    });
  },
};
