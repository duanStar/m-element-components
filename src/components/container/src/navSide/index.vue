<template>
  <el-menu class="el-menu-vertical" default-active="1" :collapse="isCollapse">
    <el-menu-item index="1">
      <el-icon>
        <el-icon-menu />
      </el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon>
        <el-icon-menu />
      </el-icon>
      <span>图标选择器</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon>
        <el-icon-menu />
      </el-icon>
      <span>省市区选择</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon>
        <el-icon-menu />
      </el-icon>
      <span>趋势标记</span>
    </el-menu-item>
    <el-menu-item index="5">
      <el-icon>
        <el-icon-menu />
      </el-icon>
      <span>时间选择器</span>
    </el-menu-item>
    <el-menu-item index="6">
      <el-icon>
        <el-icon-menu />
      </el-icon>
      <span>通知菜单</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
// @ts-ignore
let props = defineProps<{
  isCollapse: boolean;
}>();
</script>

<style scoped></style>
