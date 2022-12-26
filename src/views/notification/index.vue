<template>
  <div class="notification-container">
    <m-notification :value="12" :max="50">
      <m-list
        :list="list"
        :actions="actions"
        @clickItem="handleClickItem"
        @clickAction="handleClickAction"
      ></m-list>
    </m-notification>
    <m-notification :value="50" :max="30"></m-notification>
    <m-notification :value="50" :max="30" is-dot></m-notification>
    <m-notification :value="12" :max="50" icon="ChatRound"></m-notification>
  </div>
</template>

<script setup lang="ts">
import { list, actions } from "./data";
const handleClickItem = (val: any) => {
  console.log(val);
};
const handleClickAction = (val: any) => {
  console.log(val);
};
</script>

<style scoped>
.notification-container {
  display: inline-flex;
  flex-direction: column;
  gap: 20px;
}
</style>
