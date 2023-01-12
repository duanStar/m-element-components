<template>
  <el-form
    ref="form"
    v-bind="$attrs"
    :model="model"
    :rules="rules"
    :validate-on-rule-change="false"
  >
    <template v-for="item in options" :key="item.label">
      <el-form-item
        v-if="!item.children || !item.children.length"
        :prop="item.prop"
        :label="item.label"
      >
        <component
          v-if="item.type !== 'upload'"
          :is="`el-${item.type}`"
          v-model="model[item.prop]"
          v-bind="item.attrs"
        />
        <el-upload
          v-else
          v-bind="item.uploadAttrs"
          :on-preview="onPreview"
          :on-change="onChange"
          :on-error="onError"
          :on-progress="onProgress"
          :on-success="onSuccess"
          :on-remove="onRemove"
          :on-exceed="onExceed"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
        >
          <slot name="uploadArea"></slot>
          <template #tip>
            <slot name="uploadTip"></slot>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item v-else :prop="item.prop" :label="item.label">
        <component
          :is="`el-${item.type}`"
          v-model="model[item.prop]"
          :placeholder="item.placeholder"
          v-bind="item.attrs"
        >
          <component
            v-for="child in item.children"
            :key="child.label"
            :is="`el-${child.type}`"
            :label="child.label"
            :value="child.value"
            v-bind="child.attrs"
          ></component>
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="action" :form="form" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref, watch } from "vue";
import { FormOptions } from "./types/types";
import { cloneDeep } from "lodash";
import {
  UploadRawFile,
  UploadUserFile,
  UploadFile,
  UploadFiles,
  UploadProgressEvent,
  FormInstance,
} from "element-plus";

const { options } = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
});
const formEmits = defineEmits([
  "on-preview",
  "on-change",
  "on-error",
  "on-progress",
  "on-success",
  "on-remove",
  "before-upload",
  "before-remove",
  "on-exceed",
]);

let model = ref<any>({});
let rules = ref<any>({});
const form = ref<FormInstance | null>(null);

let initForm = () => {
  if (options && options.length) {
    let m: any = {};
    let r: any = {};
    options.map((item) => {
      m[item.prop] = item.value;
      r[item.prop] = item.rules;
    });
    model.value = cloneDeep(m);
    rules.value = cloneDeep(r);
  }
};

let onPreview = (file: UploadFile) => {
  formEmits("on-preview", file);
};
let onChange = (file: UploadFile, fileList: UploadFiles) => {
  formEmits("on-change", {
    file,
    fileList,
  });
};
let onError = (err: Error, file: UploadFile, fileList: UploadFiles) => {
  formEmits("on-error", {
    err,
    file,
    fileList,
  });
};
let onProgress = (
  event: UploadProgressEvent,
  file: UploadFile,
  fileList: UploadFiles
) => {
  formEmits("on-progress", {
    event,
    file,
    fileList,
  });
};
let onSuccess = (response: any, file: UploadFile, fileList: UploadFiles) => {
  let uploadItem = options.find((item) => item.type === "upload");
  model.value[uploadItem!.prop] = {
    response,
    file,
    fileList,
  };
  formEmits("on-success", {
    response,
    file,
    fileList,
  });
};
let onRemove = (file: UploadFile, fileList: UploadFiles) => {
  formEmits("on-remove", {
    file,
    fileList,
  });
};
let onExceed = (files: File[], fileList: UploadUserFile[]) => {
  formEmits("on-exceed", {
    files,
    fileList,
  });
};
let beforeUpload = (file: UploadRawFile) => {
  formEmits("before-upload", file);
};
let beforeRemove = (file: UploadFile, fileList: UploadFiles) => {
  formEmits("before-remove", {
    file,
    fileList,
  });
};

onMounted(() => {
  initForm();
});

watch(
  () => options,
  () => {
    initForm();
  },
  {
    deep: true,
  }
);
</script>

<style scoped lang="scss"></style>
