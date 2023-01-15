<template>
  <div>
    <m-calendar
      :events="events"
      displayEventEnd
      :eventContent="eventContent"
      @dateClick="handleDateClick"
      @eventClick="handleEventClick"
    ></m-calendar>
  </div>
</template>

<script setup lang="ts">
import { EventItem } from "@/components/calendar/src/types";
import { EventClickArg, EventContentArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { ref } from "@vue/reactivity";

let events = ref<EventItem[]>([
  {
    title: "购物",
    start: "2023-01-01 08:00",
    end: "2023-01-05 00:00",
    editable: true,
  },
  {
    title: "写代码",
    start: "2023-01-11 08:00",
    end: "2023-01-15 12:00",
  },
]);
const handleDateClick = (arg: DateClickArg) => {
  console.log(arg);
  events.value.push({
    start: arg.dateStr + " 12:00",
    end: arg.dateStr + " 18:00",
    title: "学习",
  });
};

let eventContent = (info: EventContentArg) => {
  let el = document.createElement("div");
  let timeTextArr = info.timeText.split("-");
  let start = timeTextArr[0];
  let end = timeTextArr[1];
  el.innerHTML = `
          <div>开始时间: ${start}</div>
          <div>结束时间: ${end}</div>
            <div>行程: <strong>${info.event.title}</strong></div>
        `;
  return {
    domNodes: [el],
  };
};

const handleEventClick = (arg: EventClickArg) => {
  console.log(arg);
};
</script>

<style scoped></style>
