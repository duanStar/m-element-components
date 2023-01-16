import { ElMessage } from "element-plus";

export const useCopy = (text: string) => {
  if (text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        ElMessage.success(text + " 复制成功");
      })
      .catch(() => {
        ElMessage.error("复制失败");
      });
  }
};
