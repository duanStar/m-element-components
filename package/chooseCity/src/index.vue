<template>
  <el-popover
    v-model:visible="visible"
    placement="bottom-start"
    :width="450"
    trigger="click"
  >
    <template #reference>
      <div class="reference">
        <div>{{ result }}</div>
        <el-icon-arrow-down :class="{ rotate: visible }"></el-icon-arrow-down>
      </div>
    </template>
    <div class="container">
      <el-row align="middle">
        <el-col :span="10">
          <el-radio-group v-model="radioValue">
            <el-radio-button label="按城市"></el-radio-button>
            <el-radio-button label="按省份"></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="12" :offset="2">
          <el-select
            v-model="selectValue"
            filterable
            placeholder="请搜索城市"
            clearable
            :filter-method="filterMethod"
            @change="changeSelect"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>
      <template v-if="radioValue === '按城市'">
        <div class="city">
          <div
            class="city-item"
            v-for="(value, key) in cities"
            :key="key"
            @click="clickCharacter(key)"
          >
            {{ key }}
          </div>
        </div>
        <el-scrollbar max-height="300px">
          <template v-for="(value, key) in cities" :key="key">
            <el-row style="margin-bottom: 10px" :id="key">
              <el-col :span="2">{{ key }}:</el-col>
              <el-col :span="22" class="city-name">
                <div
                  class="city-name-item"
                  v-for="item in value"
                  :key="item.id"
                  @click="clickItem(item)"
                >
                  {{ item.name }}
                </div>
              </el-col>
            </el-row>
          </template>
        </el-scrollbar>
      </template>
      <template v-else>
        <div class="province">
          <div
            class="province-item"
            v-for="(value, key) in provinces"
            :key="key"
            @click="clickCharacter(key)"
          >
            {{ key }}
          </div>
        </div>
        <el-scrollbar max-height="300px">
          <template
            v-for="(item, index) in Object.values(provinces)"
            :key="index"
          >
            <template v-for="(item1, index1) in item" :key="index1">
              <el-row style="margin-bottom: 10px" :id="item1.id">
                <el-col :span="3">{{ item1.name }}:</el-col>
                <el-col :span="21" class="province-name">
                  <div
                    class="province-name-item"
                    v-for="name in item1.data"
                    :key="name"
                    @click="clickProvince(name)"
                  >
                    {{ name }}
                  </div>
                </el-col>
              </el-row>
            </template>
          </template>
        </el-scrollbar>
      </template>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import city from "../lib/city";
import province from "../lib/province.json";
import { City, Province } from "./types";

const chooseCityEmits = defineEmits(["changeCity", "changeProvince"]);

const result = ref<string>("请选择");
const visible = ref<boolean>(false);
const radioValue = ref<string>("按城市");
const selectValue = ref<string>("");
const cities = ref(city.cities);
const provinces = ref(province);
const defaultOptions = computed(() => {
  return Object.values(cities.value).flat(2);
});
const options = ref<City[]>([]);

const clickItem = (item: City) => {
  result.value = item.name;
  visible.value = false;
  chooseCityEmits("changeCity", item);
};

const clickProvince = (item: string) => {
  result.value = item;
  visible.value = false;
  chooseCityEmits("changeProvince", item);
};

const clickCharacter = (key: string) => {
  const el = document.getElementById(key);
  el?.scrollIntoView({
    behavior: "smooth",
  });
};

const filterMethod = (value: string) => {
  if (!value) {
    options.value = defaultOptions.value;
  } else {
    options.value = defaultOptions.value.filter((item) => {
      return item.name.includes(value) || item.spell.includes(value);
    });
  }
};

const changeSelect = (id: number) => {
  const item = options.value.find((item) => item.id === id);
  if (item) {
    result.value = item.name;
    visible.value = false;
    if (radioValue.value === "按城市") {
      chooseCityEmits("changeCity", item);
    } else {
      chooseCityEmits("changeProvince", item.name);
    }
  }
};

onMounted(() => {
  options.value = defaultOptions.value;
});
</script>

<style scoped lang="scss">
.reference {
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
}
.rotate {
  transform: rotate(180deg);
}
svg {
  width: 1em;
  height: 1em;
  transition: all 0.3s;
  margin-left: 4px;
}

.city,
.province {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
  &-item {
    padding: 3px 6px;
    margin-right: 8px;
    margin-bottom: 8px;
    border: 1px solid #eee;
    cursor: pointer;
  }
}

.city-name,
.province-name {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  &-item {
    margin-right: 6px;
    margin-bottom: 6px;
    cursor: pointer;
  }
}
</style>
