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
        <el-icon-arrow-down
          :style="{
            transform: visible ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'all 0.3s',
          }"
        ></el-icon-arrow-down>
      </div>
    </template>
    <div class="container">
      <el-row align="center">
        <el-col :span="10">
          <el-radio-group v-model="radioValue">
            <el-radio-button label="按城市"></el-radio-button>
            <el-radio-button label="按省份"></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="12" :offset="2">
          <el-select v-model="selectValue" filterable placeholder="请选择">
            <el-option label="1" value="1" />
          </el-select>
        </el-col>
      </el-row>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { ref } from "vue";
const result = ref<string>("请选择");
const visible = ref<boolean>(false);
const radioValue = ref<string>("按城市");
const selectValue = ref<string>("");
</script>

<style scoped lang="scss">
.reference {
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
}
svg {
  width: 1em;
  height: 1em;
}
</style>
