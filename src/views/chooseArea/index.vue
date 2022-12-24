<template>
  <m-choose-area @change="handleAreaChange"></m-choose-area>
</template>

<script setup lang="ts">
const handleAreaChange = (val: string) => {
  console.log(val);
};
</script>

<style scoped></style>
