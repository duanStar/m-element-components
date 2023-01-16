<template>
  <el-popover
    placement="bottom"
    :width="300"
    trigger="click"
    :disabled="!slots.default"
  >
    <template #reference>
      <el-badge :value="value" :is-dot="isDot" :max="max">
        <component :is="`el-icon${toLine(icon)}`" />
      </el-badge>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { toLine } from "../../utils";
import { useSlots } from "@vue/runtime-core";

const { icon, value, max, isDot } = defineProps({
  icon: {
    type: String,
    default: "Bell",
  },
  value: {
    type: [String, Number],
    default: "",
  },
  max: {
    type: Number,
  },
  isDot: {
    type: Boolean,
    default: false,
  },
});

const slots = useSlots();
</script>

<style scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>
