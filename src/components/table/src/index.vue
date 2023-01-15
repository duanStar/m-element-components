<template>
  <el-table
    v-loading="isLoading"
    :data="tableData"
    v-bind="$attrs"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-background="elementLoadingBackground"
    :element-loading-svg-view-box="elementLoadingSvgViewBox"
    @row-click="rowClick"
  >
    <template v-for="item in tableOptions" :key="item.label">
      <el-table-column
        v-if="!item.slot"
        :label="item.label"
        :align="item.align"
        :prop="item.prop"
        :width="item.width"
      >
        <template #default="scope">
          <template v-if="scope.row.rowEdit">
            <el-input size="small" v-model="scope.row[item.prop]" />
          </template>
          <template v-else>
            <template v-if="scope.$index + scope.column.id === currentEdit">
              <div
                style="display: flex; align-items: center"
                @click.stop="clickEditCell($event)"
              >
                <el-input size="small" v-model="scope.row[item.prop]" />
                <slot
                  v-if="$slots.editCell"
                  name="editCell"
                  :scope="scope"
                ></slot>
                <div v-else class="icons">
                  <el-icon-check class="check" @click="clickSave(scope)" />
                  <el-icon-close class="close" @click="clickCancel(scope)" />
                </div>
              </div>
            </template>
            <template v-else>
              <span>{{ scope.row[item.prop] }}</span>
              <component
                v-if="item.editable"
                :is="`el-icon${toLine(editIcon)}`"
                class="edit"
                @click.stop="clickEdit(scope)"
              />
            </template>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :label="item.label"
        :align="item.align"
        :prop="item.prop"
        :width="item.width"
      >
        <template #default="scope">
          <template v-if="scope.row.rowEdit">
            <el-input size="small" v-model="scope.row[item.prop]" />
          </template>
          <template v-else>
            <template v-if="scope.$index + scope.column.id === currentEdit">
              <div
                style="display: flex; align-items: center"
                @click.stop="clickEditCell($event)"
              >
                <el-input size="small" v-model="scope.row[item.prop]" />
                <slot
                  v-if="$slots.editCell"
                  name="editCell"
                  :scope="scope"
                ></slot>
                <div v-else class="icons">
                  <el-icon-check class="check" @click.stop="clickSave(scope)" />
                  <el-icon-close
                    class="close"
                    @click.stop="clickCancel(scope)"
                  />
                </div>
              </div>
            </template>
            <template v-else>
              <slot :name="item.slot" :scope="scope">
                <span>{{ scope.row[item.prop] }}</span>
              </slot>
              <component
                v-if="item.editable"
                :is="`el-icon${toLine(editIcon)}`"
                class="edit"
                @click.stop="clickEdit(scope)"
              />
            </template>
          </template>
        </template>
      </el-table-column>
    </template>
    <el-table-column
      v-if="actionOptions"
      :label="actionOptions.label"
      :align="actionOptions.align"
      :width="actionOptions.width"
    >
      <template #default="scope">
        <slot v-if="scope.row.rowEdit" name="edit" :scope="scope"></slot>
        <slot v-else name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { toLine } from "@/utils";
import { cloneDeep } from "lodash";
import { computed, onMounted, PropType, ref, watch } from "vue";
import { TableOptions } from "./types";

const props = defineProps({
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true,
  },
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  elementLoadingText: {
    type: String,
  },
  elementLoadingSpinner: {
    type: String,
  },
  elementLoadingBackground: {
    type: String,
  },
  elementLoadingSvg: {
    type: String,
  },
  elementLoadingSvgViewBox: {
    type: String,
  },
  editIcon: {
    type: String,
    default: "Edit",
  },
  isEditRow: {
    type: Boolean,
    default: false,
  },
  editRowIndex: {
    type: String,
    default: "",
  },
  rowIndex: {
    type: String,
    default: "",
  },
});

let tableEmits = defineEmits(["confirm", "cancel", "update:rowIndex"]);

let tableOptions = computed(() => {
  return props.options.filter((item) => !item.action);
});

let actionOptions = computed(() => {
  return props.options.find((item) => item.action);
});

let isLoading = computed(() => {
  return props.data.length === 0 || !props.data;
  // return true;
});

let currentEdit = ref<string>("");
let tableData = ref<any[]>(cloneDeep(props.data));
let editIndex = ref<string>(props.rowIndex);

watch(
  () => props.data,
  (val) => {
    tableData.value = cloneDeep(val);
    tableData.value.map((item) => {
      item.rowEdit = false;
    });
  },
  {
    deep: true,
  }
);

watch(
  () => props.rowIndex,
  (val) => {
    editIndex.value = val;
  }
);

onMounted(() => {
  tableData.value.map((item) => {
    item.rowEdit = false;
  });
});

const clickEdit = (scope: any) => {
  currentEdit.value = scope.$index + scope.column.id;
};

const clickSave = (scope: any) => {
  tableEmits("confirm", scope);
  currentEdit.value = "";
};

const clickCancel = (scope: any) => {
  tableEmits("cancel", scope);
  currentEdit.value = "";
};

const clickEditCell = (e: MouseEvent) => {
  if ((e.target as Element).matches("input")) return;
  currentEdit.value = "";
};

const rowClick = (row: any, column: any) => {
  if (actionOptions.value?.label === column?.label) {
    if (props.isEditRow && props.editRowIndex === editIndex.value) {
      row.rowEdit = !row.rowEdit;
      tableData.value.forEach((item) => {
        if (item !== row) {
          item.rowEdit = false;
        }
      });
      if (!row.rowEdit) {
        tableEmits("update:rowIndex", "");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.edit {
  width: 1em;
  height: 1em;
  position: relative;
  top: 2px;
  left: 4px;
  cursor: pointer;
}
.icons {
  display: flex;
  svg {
    width: 1em;
    height: 1em;
    cursor: pointer;
    margin-left: 8px;
  }
  .check {
    color: red;
  }
  .close {
    color: green;
  }
}
</style>
