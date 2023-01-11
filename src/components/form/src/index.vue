<template>
  <el-form
    v-bind="$attrs"
    :model="model"
    :rules="rules"
    :validate-on-rule-change="false"
  >
    <template v-for="item in options" :key="item.label">
      <el-form-item
        v-if="!item.children || !item.children.length"
        :prop="item.prop"
        :label="item.label"
      >
        <component
          :is="`el-${item.type}`"
          v-model="model[item.prop]"
          v-bind="item.attrs"
        />
      </el-form-item>
      <el-form-item v-else :prop="item.prop" :label="item.label">
        <component
          :is="`el-${item.type}`"
          v-model="model[item.prop]"
          :placeholder="item.placeholder"
          v-bind="item.attrs"
        >
          <component
            v-for="child in item.children"
            :key="child.label"
            :is="`el-${child.type}`"
            :label="child.label"
            :value="child.value"
            v-bind="child.attrs"
          ></component>
        </component>
      </el-form-item>
    </template>
  </el-form>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref, watch } from "vue";
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

let initForm = () => {
  if (options && options.length) {
    let m: any = {};
    let r: any = {};
    options.map((item) => {
      m[item.prop] = item.value;
      r[item.prop] = item.rules;
    });
    model.value = cloneDeep(m);
    rules.value = cloneDeep(r);
  }
};
onMounted(() => {
  initForm();
});

watch(
  () => options,
  () => {
    initForm();
  },
  {
    deep: true,
  }
);
</script>

<style scoped lang="scss"></style>
