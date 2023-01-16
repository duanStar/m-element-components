<template>
  <div class="list-tabs__item">
    <el-tabs>
      <el-tab-pane
        v-for="(item, index) in list"
        :key="index"
        :label="item.title"
      >
        <el-scrollbar max-height="300px">
          <div
            class="container"
            v-for="(item1, index1) in item.content"
            @click="handleClickItem(item1, index)"
            :key="index1"
          >
            <div class="avatar" v-if="item1.avatar">
              <el-avatar size="small" :src="item1.avatar" />
            </div>
            <div class="content">
              <div v-if="item1.title" class="title">
                <div>{{ item1.title }}</div>
                <el-tag v-if="item1.tag" size="small" :type="item1.tagType">{{
                  item1.tag
                }}</el-tag>
              </div>
              <div class="time" v-if="item1.description">
                {{ item1.description }}
              </div>
              <div class="time" v-if="item1.time">{{ item1.time }}</div>
            </div>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
    <div class="actions">
      <div
        class="a-item"
        :class="{ border: index < actions.length - 1 }"
        v-for="(item, index) in actions"
        :key="index"
        @click="handleActionClick(item, index)"
      >
        <div class="a-icon" v-if="item.icon">
          <component :is="`el-icon${toLine(item.icon)}`" />
        </div>
        <div class="a-text">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toLine } from "../../utils";
import { PropType } from "vue";
import { ActionOptions, ListOptions, ListItem } from "./types";

const { list, actions } = defineProps({
  list: {
    type: Array as PropType<ListOptions[]>,
    required: true,
  },
  actions: {
    type: Array as PropType<ActionOptions[]>,
    default: () => [],
  },
});

const listEmits = defineEmits(["clickItem", "clickAction"]);

const handleClickItem = (item: ListItem, index: number) => {
  listEmits("clickItem", item, index);
};
const handleActionClick = (action: ActionOptions, index: number) => {
  listEmits("clickAction", action, index);
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  &:hover {
    background: #e6f6ff;
  }
  .avatar {
    flex: 1;
  }
  .content {
    flex: 3;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .time {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
}
.actions {
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  .a-item {
    height: 50px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .a-icon {
      margin-right: 4px;
      position: relative;
      top: 2px;
    }
  }
}
.border {
  border-right: 1px solid #eee;
}
</style>
