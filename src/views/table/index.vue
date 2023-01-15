<template>
  <div>
    <m-table
      :data="tableData"
      :options="options"
      stripe
      border
      isEditRow
      elementLoadingText="加载中"
      elementLoadingBackground="rgba(0,0,0,.8)"
      :elementLoadingSpinner="svg"
      elementLoadingSvgViewBox="-10 -10 50 50"
      v-model:rowIndex="rowIndex"
      editRowIndex="edit"
      pagination
      :total="total"
      :pageSize="pageSize"
      :currentPage="currentPage"
      paginationAlign="right"
      @confirm="handleCheck"
      @cancel="handleClose"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
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
import { onMounted, ref } from "vue";
import axios from "axios";

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

interface TableData {
  date: string;
  name: string;
  address: string;
}

let rowIndex = ref<string>("");
let currentPage = ref<number>(1);
let pageSize = ref<number>(10);
let total = ref<number>(0);
const tableData = ref<TableData[]>([]);

const getData = () => {
  axios
    .post("/api/list", {
      current: currentPage.value,
      pageSize: pageSize.value,
    })
    .then((res: any) => {
      const { rows, total: t } = res.data.data;
      console.log(res.data.data);
      tableData.value = rows;
      total.value = t;
    });
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  currentPage.value = 1;
  getData();
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getData();
};

onMounted(() => {
  getData();
});

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
