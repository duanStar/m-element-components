<template>
  <div>
    <m-table
      :data="tableData"
      :options="options"
      isEditRow
      elementLoadingText="加载中"
      elementLoadingBackground="rgba(0,0,0,.8)"
      :elementLoadingSpinner="svg"
      elementLoadingSvgViewBox="-10 -10 50 50"
      v-model:rowIndex="rowIndex"
      editRowIndex="edit"
      @confirm="handleCheck"
      @cancel="handleClose"
    >
      <template #date="{ scope }">
        <el-icon><el-icon-timer /></el-icon>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
      <template #name="{ scope }">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>name: {{ scope.row.name }}</div>
            <div>address: {{ scope.row.address }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-popover>
      </template>
      <template #action="{ scope }">
        <el-button type="primary" size="small" @click="handleEdit(scope)"
          >编辑</el-button
        >
        <el-button size="small" type="danger" @click="handleDelete(scope)"
          >删除</el-button
        >
      </template>
      <template #edit="{ scope }">
        <el-button type="primary" size="small" @click="confirm(scope)"
          >确认</el-button
        >
        <el-button size="small" type="danger" @click="cancel(scope)"
          >取消</el-button
        >
      </template>
      <template #editCell="{ scope }">
        <div style="display: flex; margin-left: 6px">
          <el-button size="small" type="primary" @click="handleConfirm(scope)"
            >确认</el-button
          >
          <el-button size="small">取消</el-button>
        </div>
      </template>
    </m-table>
  </div>
</template>

<script setup lang="ts">
import { TableOptions } from "@/components/table/src/types";
import { ref } from "vue";

const tableData = [
  {
    id: 1,
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 2,
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 3,
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 4,
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

const options: TableOptions[] = [
  {
    label: "日期",
    prop: "date",
    align: "center",
    slot: "date",
    editable: true,
  },
  {
    label: "姓名",
    prop: "name",
    align: "center",
    slot: "name",
  },
  {
    label: "地址",
    prop: "address",
    align: "center",
    editable: true,
  },
  {
    label: "操作",
    action: true,
    align: "center",
    prop: "action",
  },
];

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

let rowIndex = ref<string>("");

const handleDelete = (scope: any) => {
  console.log(scope);
};

const handleEdit = (scope: any) => {
  console.log(scope);
  rowIndex.value = "edit";
};

const handleCheck = (scope: any) => {
  console.log(scope);
};

const handleClose = (scope: any) => {
  console.log(scope);
};

const handleConfirm = (scope: any) => {
  console.log(scope);
};
const confirm = (scope: any) => {
  console.log(scope);
};
const cancel = (scope: any) => {
  console.log(scope);
};
</script>

<style scoped></style>
