<template>
  <div class="trend">
    <div class="text" :style="{ color: textColor }">
      <slot v-if="slots.default"></slot>
      {{ (!slots.default && text) || "" }}
    </div>
    <div class="icon">
      <component
        :is="`el-icon${toLine(activeIcon)}`"
        :style="{ color: iconColor }"
      ></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toLine } from "@/utils";
import { useSlots, computed } from "vue";
const {
  type,
  text,
  upIconColor,
  downIconColor,
  reverseColor,
  upTextColor,
  downTextColor,
  upIcon,
  downIcon,
} = defineProps({
  type: {
    type: String,
    default: "up",
  },
  text: {
    type: String,
    default: "文字",
  },
  upIcon: {
    type: String,
    default: "ArrowUp",
  },
  downIcon: {
    type: String,
    default: "ArrowDown",
  },
  upIconColor: {
    type: String,
    default: "#f5222d",
  },
  downIconColor: {
    type: String,
    default: "#52c41a",
  },
  reverseColor: {
    type: Boolean,
    default: false,
  },
  upTextColor: {
    type: String,
    default: "#000",
  },
  downTextColor: {
    type: String,
    default: "#000",
  },
});

const slots = useSlots();

const textColor = computed(() => {
  return type === "up" ? upTextColor : downTextColor;
});
const iconColor = computed(() => {
  if (reverseColor) {
    return type === "up" ? "#52c41a" : "#f5222d";
  }
  return type === "up" ? upIconColor : downIconColor;
});
const activeIcon = computed(() => {
  return type === "up" ? upIcon : downIcon;
});
</script>

<style scoped lang="scss">
.trend {
  display: flex;
  align-items: center;
  .text {
    font-size: 14px;
    margin-right: 4px;
  }
  .icon {
    svg {
      width: 0.8em;
      height: 0.8em;
    }
  }
}
</style>
