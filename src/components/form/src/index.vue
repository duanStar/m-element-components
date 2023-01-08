<template>
  <el-form
    v-bind="$attrs"
    :model="model"
    :rules="rules"
    :validate-on-rule-change="false"
  >
    <el-form-item
      v-for="item in options"
      :key="item.label"
      :prop="item.prop"
      :label="item.label"
    >
      <component
        :is="`el-${item.type}`"
        v-model="model[item.prop]"
        v-bind="item.attrs"
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref } from "vue";
import { FormOptions } from "./types/types";
import { cloneDeep } from "lodash";

const { options } = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
});

let model = ref<any>({});
let rules = ref<any>({});

onMounted(() => {
  let m: any = {};
  let r: any = {};
  options.map((item) => {
    m[item.prop] = item.value;
    r[item.prop] = item.rules;
  });
  model.value = cloneDeep(m);
  rules.value = cloneDeep(r);
});
</script>

<style scoped lang="scss"></style>
