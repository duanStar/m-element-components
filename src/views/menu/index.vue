<template>
  <div class="container">
    <div style="width: 200px">
      <m-menu :data="data1"></m-menu>
    </div>
    <div style="width: 200px">
      <m-infinite-menu
        :data="data2"
        background-color="#545c64"
        text-color="#fff"
      ></m-infinite-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
let data1 = [
  {
    name: "导航1",
    index: "1",
    icon: "Document",
  },
  {
    name: "导航2",
    index: "2",
    icon: "Document",
  },
  {
    name: "导航3",
    index: "3",
    icon: "Document",
    children: [
      {
        name: "导航3-1",
        index: "3-1",
        icon: "Document",
      },
      {
        name: "导航3-2",
        index: "3-2",
        icon: "Document",
      },
    ],
  },
];

let data2 = [
  {
    name: "导航1",
    index: "1",
    icon: "Document",
  },
  {
    name: "导航2",
    index: "2",
    icon: "Document",
  },
  {
    name: "导航3",
    index: "3",
    icon: "Document",
    children: [
      {
        name: "导航3-1",
        index: "3-1",
        icon: "Document",
        children: [
          {
            name: "导航3-1-1",
            index: "3-1-1",
            icon: "Document",
            children: [
              {
                name: "导航3-1-1-1",
                index: "3-1-1-1",
                icon: "Document",
              },
              {
                name: "导航3-1-1-2",
                index: "3-1-1-2",
                icon: "Document",
                children: [
                  {
                    name: "导航3-1-1-2-1",
                    index: "3-1-1-2-1",
                    icon: "Document",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "导航3-2",
        index: "3-2",
        icon: "Document",
      },
    ],
  },
];
</script>

<style scoped>
.container {
  display: flex;
  column-gap: 150px;
}
</style>
