<template>
  <div style="display: flex">
    <div style="margin-right: 20px">
      <el-date-picker
        v-model="startDate"
        type="date"
        :placeholder="startPlaceholder"
        :disabled-date="startDisableDate"
        v-bind="$attrs.startOptions"
      />
    </div>
    <div>
      <el-date-picker
        v-model="endDate"
        type="date"
        :placeholder="endPlaceholder"
        :disabled="endDateDisabled"
        :disabled-date="endDisableDate"
        v-bind="$attrs.endOptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const { disableToday } = defineProps({
  startPlaceholder: {
    type: String,
    default: "请选择开始日期",
  },
  endPlaceholder: {
    type: String,
    default: "请选择开始日期",
  },
  disableToday: {
    type: Boolean,
    default: true,
  },
});

const chooseDateEmits = defineEmits(["startChange", "endChange"]);

const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);
const endDateDisabled = computed(() => {
  return !startDate.value;
});

function startDisableDate(time: Date) {
  if (disableToday) {
    return time.getTime() < Date.now() - 1000 * 60 * 60 * 24;
  }
}
function endDisableDate(time: Date) {
  if (startDate.value) {
    return time.getTime() < startDate.value.getTime() + 1000 * 60 * 60 * 24;
  }
}
watch(startDate, (val) => {
  if (!val) {
    endDate.value = null;
  } else {
    chooseDateEmits("startChange", val);
  }
});
watch(endDate, (val) => {
  if (val) {
    chooseDateEmits("endChange", {
      startDate: startDate.value,
      endDate: val,
    });
  }
});
</script>

<style scoped></style>
