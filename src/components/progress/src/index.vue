<template>
  <el-progress
    :percentage="isAnimation ? activePercentage : percentage"
    v-bind="$attrs"
  >
    <template #default="{ percentage }">
      <slot :percentage="percentage"></slot>
    </template>
  </el-progress>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
const { percentage, isAnimation, time } = defineProps({
  percentage: {
    type: Number,
    default: 0,
  },
  isAnimation: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Number,
    default: 3000,
  },
});
let timer: number | null = null;
let activePercentage = ref<number>(0);
onMounted(() => {
  if (isAnimation) {
    let t = Math.ceil(time / percentage);
    timer = setInterval(() => {
      if (activePercentage.value < percentage) {
        activePercentage.value += 1;
      } else {
        timer && clearInterval(timer);
        timer = null;
      }
    }, t);
  }
});
onBeforeUnmount(() => {
  timer && clearInterval(timer);
  timer = null;
});
</script>

<style scoped></style>
