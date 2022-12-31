<template>
  <div style="display: flex">
    <div style="margin-right: 20px">
      <el-time-select
        v-model="startTime"
        :placeholder="startPlaceholder"
        :start="startTimeStart"
        :end="startTimeEnd"
        :step="startStep"
        v-bind="$attrs.startOptions"
      ></el-time-select>
    </div>
    <div>
      <el-time-select
        v-model="endTime"
        :min-time="startTime"
        :placeholder="endPlaceholder"
        :start="endTimeStart"
        :end="endTimeEnd"
        :step="endStep"
        :disabled="endTimeDisabled"
        v-bind="$attrs.endOptions"
      ></el-time-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const { startPlaceholder, startStep, startTimeEnd, startTimeStart } =
  defineProps({
    startPlaceholder: {
      type: String,
      default: "请选择开始时间",
    },
    startTimeStart: {
      type: String,
      default: "08:00",
    },
    startStep: {
      type: String,
      default: "00:30",
    },
    startTimeEnd: {
      type: String,
      default: "24:00",
    },
    endPlaceholder: {
      type: String,
      default: "请选择结束时间",
    },
    endTimeStart: {
      type: String,
      default: "08:00",
    },
    endStep: {
      type: String,
      default: "00:30",
    },
    endTimeEnd: {
      type: String,
      default: "24:00",
    },
  });

let chooseTimeEmits = defineEmits(["startChange", "endChange"]);

let startTime = ref<string>("");
let endTime = ref<string>("");
let endTimeDisabled = computed(() => {
  return !startTime.value;
});

watch(startTime, (val) => {
  if (!val) {
    endTime.value = "";
  } else {
    chooseTimeEmits("startChange", val);
  }
});
watch(endTime, (val) => {
  if (val) {
    chooseTimeEmits("endChange", {
      startTime: startTime.value,
      endTime: val,
    });
  }
});
</script>

<style scoped></style>
