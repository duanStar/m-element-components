<template>
  <el-button @click="handleClick" type="primary">
    <slot></slot>
  </el-button>
  <el-dialog v-model="dialogVisible" :title="title">
    <el-scrollbar height="450px">
      <div class="container">
        <div
          class="item"
          v-for="(item, index) in Object.keys(Icons)"
          :key="index"
          @click="handleItemClick(`el-icon${toLine(item)}`)"
        >
          <div>
            <component :is="`el-icon${toLine(item)}`" />
          </div>
          <div>{{ item }}</div>
        </div>
      </div>
    </el-scrollbar>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import * as Icons from "@element-plus/icons-vue";
import { toLine } from "../../utils";
import { useCopy } from "../../hooks";

const { title, visible } = defineProps<{
  title: string;
  visible: boolean;
}>();
const chooseIconEmits = defineEmits(["update:visible"]);

let dialogVisible = ref<boolean>(visible);

const handleClick = () => {
  dialogVisible.value = !dialogVisible.value;
};
const handleItemClick = (name: string) => {
  dialogVisible.value = !dialogVisible.value;
  useCopy(name);
};

watch(dialogVisible, (val) => {
  chooseIconEmits("update:visible", val);
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .item {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
    svg {
      width: 2em;
      height: 2em;
    }
  }
}
</style>
