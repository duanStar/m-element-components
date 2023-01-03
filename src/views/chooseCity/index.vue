<template>
  <div>
    <m-choose-city
      @changeProvince="handleChangeProvince"
      @changeCity="handleChangeCity"
    ></m-choose-city>
  </div>
</template>

<script setup lang="ts">
const handleChangeCity = (value: any) => {
  console.log(value);
};
const handleChangeProvince = (value: string) => {
  console.log(value);
};
</script>

<style scoped></style>
