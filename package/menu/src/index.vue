<template>
  <el-menu :default-active="defaultActive" :router="router" v-bind="$attrs">
    <template v-for="(item, index) in data" :key="index">
      <el-menu-item
        v-if="!item.children || !item.children.length"
        :index="item.index"
      >
        <el-icon>
          <component v-if="item.icon" :is="`el-icon${toLine(item.icon)}`" />
        </el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
      <el-sub-menu v-else :index="item.index">
        <template #title>
          <el-icon>
            <component v-if="item.icon" :is="`el-icon${toLine(item.icon)}`" />
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="(item1, index1) in item.children"
          :key="index1"
          :index="item1.index"
        >
          <el-icon>
            <component v-if="item1.icon" :is="`el-icon${toLine(item1.icon)}`" />
          </el-icon>
          <span>{{ item1.name }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { toLine } from "../../utils";
import { PropType } from "vue";
import { MenuItem } from "./types";

const { data, defaultActive, router } = defineProps({
  data: {
    type: Array as PropType<MenuItem[]>,
    required: true,
  },
  defaultActive: {
    type: String,
    default: "",
  },
  router: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
