<template>
  <el-table
    v-loading="isLoading"
    :data="props.data"
    v-bind="$attrs"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-background="elementLoadingBackground"
    :element-loading-svg-view-box="elementLoadingSvgViewBox"
  >
    <template v-for="item in tableOptions" :key="item.label">
      <el-table-column
        v-if="!item.slot"
        :label="item.label"
        :align="item.align"
        :prop="item.prop"
        :width="item.width"
      ></el-table-column>
      <el-table-column
        v-else
        :label="item.label"
        :align="item.align"
        :prop="item.prop"
        :width="item.width"
      >
        <template #default="scope">
          <slot :name="item.slot" :scope="scope"></slot>
        </template>
      </el-table-column>
    </template>
    <el-table-column
      v-if="actionOptions"
      :label="actionOptions.label"
      :align="actionOptions.align"
      :width="actionOptions.width"
    >
      <template #default="scope">
        <slot name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { TableOptions } from "./types";

const props = defineProps({
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true,
  },
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  elementLoadingText: {
    type: String,
  },
  elementLoadingSpinner: {
    type: String,
  },
  elementLoadingBackground: {
    type: String,
  },
  elementLoadingSvg: {
    type: String,
  },
  elementLoadingSvgViewBox: {
    type: String,
  },
});

let tableOptions = computed(() => {
  return props.options.filter((item) => !item.action);
});

let actionOptions = computed(() => {
  return props.options.find((item) => item.action);
});

let isLoading = computed(() => {
  // return props.data.length === 0 || !props.data;
  return true;
});
</script>

<style scoped></style>
