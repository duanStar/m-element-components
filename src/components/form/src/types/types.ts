import { UploadRequestOptions } from "element-plus";
import { CSSProperties } from "vue";
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
  value?: any;
  label?: string;
  prop: string;
  rules?: RuleItem[];
  // 不同表单特有属性
  attrs?: {
    clearable?: boolean;
    showPassword?: boolean;
    disabled?: boolean;
    style?: CSSProperties;
  };
  placeholder?: string;
  children?: Omit<FormOptions, "prop">[];
  uploadAttrs?: {
    action: string;
    headers?: string;
    method?: "POST" | "PUT" | "PATCH";
    multiple?: boolean;
    data?: any;
    name?: string;
    withCredentials?: string;
    showFileList?: boolean;
    drag?: boolean;
    accept?: string;
    thumbnailMode?: boolean;
    fileList?: any[];
    listType?: "text" | "picture" | "picture-card";
    autoUpload?: boolean;
    disabled?: boolean;
    limit?: number;
    httpRequest?: (
      options: UploadRequestOptions
    ) => XMLHttpRequest | Promise<unknown>;
  };
}
