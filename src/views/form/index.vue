<template>
  <m-form :options="options" label-width="100px"></m-form>
</template>

<script setup lang="ts">
import { FormOptions } from "@/components/form/src/types/types";

let options: FormOptions[] = [
  {
    type: "input",
    value: "",
    label: "用户名",
    prop: "username",
    rules: [
      {
        required: true,
        message: "用户名不能为空",
        trigger: "change",
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
    value: "",
    label: "密码",
    prop: "password",
    rules: [
      {
        required: true,
        message: "密码不能为空",
        trigger: "change",
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
];
</script>

<style scoped></style>
