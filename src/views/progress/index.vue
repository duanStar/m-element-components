<template>
  <div class="demo-progress">
    <m-progress :percentage="60" is-animation></m-progress>
    <m-progress type="dashboard" :percentage="80">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">Progressing</span>
      </template>
    </m-progress>
    <m-progress type="circle" :percentage="100" status="success">
      <el-button type="success" circle>
        <template #icon>
          <el-icon-check></el-icon-check>
        </template>
      </el-button>
    </m-progress>
    <m-progress :text-inside="true" :stroke-width="26" :percentage="70" />
    <m-progress
      :text-inside="true"
      :stroke-width="24"
      :percentage="100"
      status="success"
    />
    <m-progress
      :text-inside="true"
      :stroke-width="22"
      :percentage="80"
      status="warning"
    />
    <m-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="50"
      status="exception"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .el-progress--circle {
  margin-right: 15px;
}
</style>
