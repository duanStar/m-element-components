import { RuleItem } from "./rule";

export interface FormOptions {
  type:
    | "text"
    | "cascader"
    | "checkbox"
    | "checkbox-group"
    | "checkbox-button"
    | "color-picker"
    | "input"
    | "input-number"
    | "radio"
    | "radio-group"
    | "radio-button"
    | "rate"
    | "select"
    | "option"
    | "slider"
    | "switch"
    | "time-picker"
    | "time-select"
    | "transfer"
    | "upload";
  value: any;
  label?: string;
  prop: string;
  rules?: RuleItem[];
  // 不同表单特有属性
  attrs?: {
    clearable?: boolean;
    showPassword?: boolean;
    disabled?: boolean;
  };
  placeholder?: string;
}
