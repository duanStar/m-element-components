<template>
  <div>
    <el-button type="primary" @click="openModal">打开弹窗</el-button>
    <m-modal-form
      v-model:visible="visible"
      title="编辑用户"
      width="60%"
      :options="options"
      :onSuccess="handleSuccess"
      :onChange="handleChange"
      is-scroll
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
      <template #footer="{ form }">
        <el-button @click="cancel(form)">取消</el-button>
        <el-button type="primary" @click="confirm(form)"> 确认 </el-button>
      </template>
    </m-modal-form>
  </div>
</template>

<script setup lang="ts">
import { FormOptions } from "@/components/form/src/types/types";
import { ElMessage } from "element-plus";
import { ref } from "vue";

let visible = ref<boolean>(false);
const openModal = () => {
  visible.value = true;
};

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
        trigger: "change",
      },
    ],
    prop: "job",
    label: "职位",
    attrs: {
      style: {
        width: "100%",
      },
      clearable: true,
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
        trigger: "change",
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

const handleSuccess = ({ response, file, fileList }: any) => {
  console.log(response, file, fileList);
};

const handleChange = ({ file, fileList }: any) => {
  console.log(file, fileList);
};

const confirm = (form: any) => {
  form?.validateFields()((valid: boolean) => {
    if (valid) {
      console.log(form?.getFieldsValue());
      visible.value = false;
    } else {
      ElMessage.error("请检查表单");
    }
  });
};

const cancel = (form: any) => {
  form?.resetFields();
  visible.value = false;
};
</script>

<style scoped></style>
