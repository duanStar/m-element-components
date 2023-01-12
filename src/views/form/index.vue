<template>
  <m-form
    :options="options"
    label-width="100px"
    @on-preview="handlePreview"
    @on-remove="handleRemove"
    @before-remove="beforeRemove"
    @on-exceed="handleExceed"
    @on-success="handleSuccess"
    @on-error="handleError"
    @on-change="handleChange"
  >
    <template #uploadArea>
      <div>
        <el-button type="primary" size="small">点击上传</el-button>
      </div>
    </template>
    <template #uploadTip>
      <div style="color: #ccc; font-size: 12px">
        jpg/png 文件，大小不超过 500kb
      </div>
    </template>
    <template #action="scope">
      <el-button type="primary" @click="onSubmit(scope)">提交</el-button>
      <el-button @click="resetForm(scope)">重置</el-button>
    </template>
  </m-form>
</template>

<script setup lang="ts">
import { FormOptions } from "@/components/form/src/types/types";
import { IDomEditor } from "@wangeditor/core";
import { ElMessage, ElMessageBox, FormInstance } from "element-plus";

interface Scope {
  form: FormInstance;
  model: any;
  editor: IDomEditor;
}

let options: FormOptions[] = [
  {
    type: "input",
    value: "admin",
    label: "用户名",
    prop: "username",
    rules: [
      {
        required: true,
        message: "用户名不能为空",
        trigger: "blur",
      },
      {
        min: 2,
        max: 6,
        message: "用户名长度在 2 到 6 个字符",
      },
    ],
    attrs: {
      clearable: true,
    },
  },
  {
    type: "input",
    value: "123456",
    label: "密码",
    prop: "password",
    rules: [
      {
        required: true,
        message: "密码不能为空",
        trigger: "blur",
      },
      {
        min: 6,
        max: 15,
        message: "密码长度在 6 到 15 个字符",
      },
    ],
    attrs: {
      showPassword: true,
      clearable: true,
    },
  },
  {
    type: "select",
    value: "1",
    placeholder: "请选择职位",
    rules: [
      {
        required: true,
        message: "职位不能为空",
        trigger: "blur",
      },
    ],
    prop: "job",
    label: "职位",
    attrs: {
      style: {
        width: "100%",
      },
    },
    children: [
      {
        type: "option",
        label: "经理",
        value: "1",
      },
      {
        type: "option",
        label: "主管",
        value: "2",
      },
      {
        type: "option",
        label: "员工",
        value: "3",
      },
    ],
  },
  {
    type: "checkbox-group",
    value: ["足球"],
    prop: "like",
    label: "爱好",
    rules: [
      {
        required: true,
        message: "爱好不能为空",
        trigger: "change",
      },
    ],
    children: [
      {
        type: "checkbox",
        label: "足球",
        value: "1",
      },
      {
        type: "checkbox",
        label: "篮球",
        value: "2",
      },
      {
        type: "checkbox",
        label: "排球",
        value: "3",
      },
    ],
  },
  {
    type: "radio-group",
    value: "男",
    prop: "gender",
    label: "性别",
    rules: [
      {
        required: true,
        message: "性别不能为空",
        trigger: "blur",
      },
    ],
    children: [
      {
        type: "radio",
        label: "男",
        value: "1",
      },
      {
        type: "radio",
        label: "女",
        value: "2",
      },
    ],
  },
  {
    type: "upload",
    label: "头像",
    prop: "photo",
    uploadAttrs: {
      action: "http://jsonplaceholder.typicode.com/posts",
      limit: 3,
      multiple: true,
    },
  },
  {
    type: "editor",
    value: "描述",
    prop: "desc",
    label: "描述",
    rules: [
      {
        required: true,
        message: "描述不能为空",
        trigger: "blur",
      },
    ],
    editorAttrs: {
      toolbarConfig: {},
      editorConfig: {
        placeholder: "请输入描述",
      },
    },
  },
];

const handleRemove = ({ file, fileList }: any) => {
  console.log(file, fileList);
};

const handlePreview = (file: any) => {
  console.log(file);
};

const handleExceed = ({ files, fileList }: any) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + fileList.length
    } totally`
  );
};

const beforeRemove = ({ file, fileList }: any) => {
  return ElMessageBox.confirm(`Cancel the transfert of ${file.name} ?`).then(
    () => true,
    () => false
  );
};

const handleSuccess = ({ response, file, fileList }: any) => {
  console.log(response, file, fileList);
};

const handleError = ({ err, file, fileList }: any) => {
  console.log(err, file, fileList);
};

const handleChange = ({ file, fileList }: any) => {
  console.log(file, fileList);
};
const onSubmit = (scope: Scope) => {
  if (scope.form) {
    scope.form.validate((valid) => {
      if (valid) {
        ElMessage.success("上传成功");
        console.log(scope.model);
      } else {
        ElMessage.error("表单填写有误请重新检查");
      }
    });
  }
};
const resetForm = (scope: Scope) => {
  if (scope.form) {
    scope.form.resetFields();
  }
};
</script>

<style scoped></style>
