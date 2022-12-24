<template>
  <div class="header">
    <span @click="toggle">
      <el-icon-expand v-if="isCollapse" style="margin-right: 10px" />
      <el-icon-fold v-else></el-icon-fold>
    </span>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
const props = defineProps<{
  isCollapse: boolean;
}>();
const emits = defineEmits(["update:is-collapse"]);

let toggle = () => {
  emits("update:is-collapse", !props.isCollapse);
};
</script>

<style scoped>
.header {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
</style>
