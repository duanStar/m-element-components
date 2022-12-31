<template>
  <div>
    <m-choose-time
      @start-change="handleStartChange"
      @end-change="handleEndChange"
      :startOptions="startOption"
    ></m-choose-time>
    <div style="margin-top: 20px">
      <m-choose-date
        @start-change="handleStartDateChange"
        @end-change="handleEndDateChange"
      ></m-choose-date>
    </div>
  </div>
</template>

<script setup lang="ts">
interface endTimeValue {
  startTime: string;
  endTime: string;
}
interface endDateValue {
  startDate: string;
  endDate: string;
}
function handleStartChange(val: string) {
  console.log("start-change:", val);
}
function handleEndChange(val: endTimeValue) {
  console.log("end-change:", val);
}

function handleStartDateChange(val: string) {
  console.log("start-change:", val);
}
function handleEndDateChange(val: endDateValue) {
  console.log("end-change:", val);
}

const startOption = {
  clearable: true,
};
</script>

<style scoped></style>
