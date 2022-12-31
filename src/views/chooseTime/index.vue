<template>
  <div>
    <m-choose-time
      @start-change="handleStartTimeChange"
      @end-change="handleEndTimeChange"
      :startOptions="startOptions"
    ></m-choose-time>
  </div>
</template>

<script setup lang="ts">
interface endValue {
  startTime: string;
  endTime: string;
}
const handleStartTimeChange = (val: string) => {
  console.log("start-change:", val);
};
const handleEndTimeChange = (val: endValue) => {
  console.log("end-change:", val);
};

let startOptions = {
  clearable: true,
};
</script>

<style scoped></style>
