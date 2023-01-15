<template>
  <div id="calendar"></div>
</template>

<script setup lang="ts">
import { Calendar } from "@fullcalendar/core";
import { onBeforeUnmount, onMounted, ref, watch } from "@vue/runtime-core";
import dayGrid from "@fullcalendar/daygrid";
import interaction, { DateClickArg } from "@fullcalendar/interaction";
import { PropType } from "vue";
import { EventItem } from "./types";

const props = defineProps({
  local: {
    type: String,
    default: "zh-cn",
  },
  initialView: {
    type: String,
    default: "dayGridMonth",
  },
  buttonText: {
    type: Object,
    default: () => ({
      today: "今天",
      month: "月",
      week: "周",
      day: "日",
      list: "日程",
      prevYear: "上一年",
      nextYear: "下一年",
      prev: "上一月",
      next: "下一月",
    }),
  },
  headerToolbar: {
    type: Object,
    default: () => ({
      start: "title",
      center: "prevYear nextYear",
      end: "prev today next",
    }),
  },
  footerToolbar: {
    type: Object,
    default: () => ({}),
  },
  events: {
    type: Array as PropType<EventItem[]>,
    default: () => [],
  },
  displayEventEnd: {
    type: Boolean,
    default: false,
  },
  eventContent: {
    type: Function,
  },
});

const calendarEmits = defineEmits(["dateClick", "eventClick"]);

const calendar = ref<Calendar | null>(null);

const renderCalendar = () => {
  let el = document.getElementById("calendar");
  if (el) {
    calendar.value = new Calendar(el, {
      plugins: [dayGrid, interaction],
      initialView: props.initialView,
      locale: props.local,
      buttonText: props.buttonText,
      headerToolbar: props.headerToolbar,
      footerToolbar: props.footerToolbar,
      eventSources: [
        {
          events(e, callback) {
            if (props.events.length) {
              callback(props.events);
            } else {
              callback([]);
            }
          },
        },
      ],
      dateClick(info: DateClickArg) {
        calendarEmits("dateClick", info);
      },
      eventClick(info) {
        calendarEmits("eventClick", info);
      },
      displayEventEnd: props.displayEventEnd,
      eventContent: props.eventContent,
    });
    calendar.value.render();
  }
};

onMounted(() => {
  renderCalendar();
});

onBeforeUnmount(() => {
  if (calendar.value) {
    calendar.value.destroy();
  }
});

watch(
  () => props.events,
  () => {
    renderCalendar();
  },
  {
    deep: true,
  }
);
</script>

<style scoped></style>
