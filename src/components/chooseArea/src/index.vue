<template>
  <div>
    <el-select
      placeholder="请选择省份"
      v-model="province"
      clearable
      size="large"
    >
      <el-option
        v-for="item in areas"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select
      :disabled="!province"
      placeholder="请选择城市"
      v-model="city"
      clearable
      size="large"
    >
      <el-option
        v-for="item in selectedCities"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select
      :disabled="!city || !province"
      placeholder="请选择区域"
      v-model="area"
      clearable
      size="large"
    >
      <el-option
        v-for="item in selectedAreas"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import allAreas from "../lib/pca-code.json";

export interface AreaItem {
  name: string;
  code: string;
  children?: AreaItem[];
}
export interface AreaData {
  name: string;
  code: string;
}
const chooseAreaEmits = defineEmits(["change"]);

let province = ref<string>("");
let city = ref<string>("");
let area = ref<string>("");

let areas = ref(allAreas);
let selectedCities = ref<AreaItem[]>([]);
let selectedAreas = ref<AreaItem[]>([]);

watch(province, (val) => {
  if (!val) {
    city.value = "";
    area.value = "";
    return;
  }
  selectedCities.value =
    areas.value.find((item) => item.code === province.value)?.children || [];
});
watch(city, (val) => {
  if (!val) {
    area.value = "";
    return;
  }
  selectedAreas.value =
    selectedCities.value.find((item) => item.code === city.value)?.children ||
    [];
});

watch(area, (val) => {
  if (!val) return;
  let provinceData: AreaData = {
    name: allAreas.find((item) => item.code === province.value)?.name || "",
    code: province.value,
  };
  let cityData: AreaData = {
    name:
      selectedCities.value.find((item) => item.code === city.value)?.name || "",
    code: city.value,
  };
  let areaData: AreaData = {
    name:
      selectedAreas.value.find((item) => item.code === area.value)?.name || "",
    code: val,
  };
  chooseAreaEmits("change", {
    province: provinceData,
    city: cityData,
    area: areaData,
  });
});
</script>

<style scoped>
.el-select {
  margin-right: 20px;
}
</style>
