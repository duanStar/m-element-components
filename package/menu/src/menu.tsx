import { toLine } from "../../utils";
import { defineComponent, PropType, resolveComponent } from "vue";
import { MenuItem } from "./types";

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<MenuItem[]>,
      required: true,
    },
    defaultActive: {
      type: String,
      default: "",
    },
    router: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {attrs}) {
    const { defaultActive, data, router } = props
    let renderMenu = (data: MenuItem[]) => {
      return data.map(item => {
        item.I = `el-icon${toLine(item.icon!)}`
        let Icon = resolveComponent(item.I) as JSX.Element;
        let slots = {
          title: () => {
            return <>
              <el-icon>
                {item.icon && <Icon />}
              </el-icon>
              <span>{item.name}</span>
            </>
          }
        }
        if(item.children && item.children.length) {
          return (<el-sub-menu index={item.index} v-slots={slots}>{renderMenu(item.children)}</el-sub-menu>)
        }
        return (<el-menu-item index={item.index}>
            <el-icon>
            {item.icon && <Icon />}
            </el-icon>
            <span>{item.name}</span>
        </el-menu-item>)
      })
    }
    return () => {
      return <el-menu default-active={defaultActive} router={router} {...attrs}>
        {renderMenu(data)}
      </el-menu>
    }
  },
});