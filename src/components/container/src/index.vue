<template>
  <el-container>
    <el-aside width="auto">
      <NavSide :is-collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <NavHeader v-model:is-collapse="isCollapse" />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
// @ts-ignore
import NavHeader from "./navHeader/index.vue";
// @ts-ignore
import NavSide from "./NavSide/index.vue";

let isCollapse = ref(false);
</script>

<style scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-header {
  padding: 0;
  border-bottom: 1px solid #eee;
}
</style>
