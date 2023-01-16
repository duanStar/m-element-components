<template>
  <el-dialog
    :class="{ 'm-choose-icon-dialog-body-height': isScroll }"
    v-model="dialogVisible"
    v-bind="$attrs"
  >
    <template #default>
      <m-form
        :options="options"
        ref="form"
        label-width="80px"
        @on-preview="onPreview"
        @on-remove="onRemove"
        @before-remove="beforeRemove"
        @on-exceed="onExceed"
        @on-success="onSuccess"
        @on-error="onError"
        @on-change="onChange"
        @before-upload="beforeUpload"
        @on-progress="onProgress"
      >
        <template #uploadArea>
          <slot name="uploadArea"></slot>
        </template>
        <template #uploadTip>
          <slot name="uploadTip"></slot>
        </template>
      </m-form>
    </template>
    <template #footer>
      <slot name="footer" :form="form"></slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { FormOptions } from "@/components/form/src/types/types";
import { UploadRawFile } from "element-plus";
import { PropType, ref, watch } from "vue";

let props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  onPreview: {
    type: Function,
    default: () => () => {},
  },
  onRemove: {
    type: Function,
    default: () => () => {},
  },
  beforeRemove: {
    type: Function,
    default: () => () => {},
  },
  onExceed: {
    type: Function,
    default: () => () => {},
  },
  onError: {
    type: Function,
    default: () => () => {},
  },
  onSuccess: {
    type: Function,
    default: () => () => {},
  },
  onChange: {
    type: Function,
    default: () => () => {},
  },
  beforeUpload: {
    type: Function,
    default: () => () => {},
  },
  onProgress: {
    type: Function,
    default: () => () => {},
  },
  isScroll: {
    type: Boolean,
    default: false,
  },
});

const dialogVisible = ref<boolean>(props.visible);
const form = ref<any>(null);

const modalFormEmits = defineEmits(["update:visible"]);

watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val;
  }
);

watch(dialogVisible, (val) => {
  modalFormEmits("update:visible", val);
});
</script>

<style scoped></style>
