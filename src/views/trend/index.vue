<template>
  <div>
    <div class="section">
      <div class="title">
        <span>普通用法</span>
      </div>
      <div class="flex">
        <m-trend text="营业额"></m-trend>
        <m-trend text="销售额" type="down"></m-trend>
      </div>
    </div>
    <div class="section">
      <div class="title">
        <span>颜色反转</span>
      </div>
      <div class="flex">
        <m-trend text="营业额" reverseColor></m-trend>
        <m-trend text="销售额" type="down" reverseColor></m-trend>
      </div>
    </div>
    <div class="section">
      <div class="title">
        <span>自定义颜色</span>
      </div>
      <div class="flex">
        <m-trend
          text="营业额"
          upIconColor="#00f"
          upTextColor="#fbb957"
        ></m-trend>
        <m-trend
          text="销售额"
          type="down"
          downIconColor="#5a191b"
          downTextColor="#229453"
        ></m-trend>
      </div>
    </div>
    <div class="section">
      <div class="title">
        <span>自定义图标</span>
      </div>
      <div class="flex">
        <m-trend text="营业额" upIcon="CaretTop"></m-trend>
        <m-trend text="销售额" type="down" downIcon="CaretBottom"></m-trend>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.section {
  border-bottom: 1px solid #ccc;
  margin-bottom: 15px;
  .title {
    display: flex;
    justify-content: center;
    span {
      font-size: 14px;
      padding: 5px;
      border: 1px solid #ccc;
    }
  }
  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    margin: 20px 0;
  }
}
</style>
