<script setup>
import { ref } from 'vue';
import FybIcon from '@/Components/Shevchenko/Cabinet/FybIcon.vue';
import FybVideoPlayer from '@/Components/Shevchenko/Cabinet/FybVideoPlayer.vue';
import ScheduleLessonsPopup from '@/Components/Shevchenko/Cabinet/ScheduleLessonsPopup.vue';
import {
  course,
  courseInfo,
  courseWeeks,
  lessonsLabel,
} from '@/Components/Shevchenko/Cabinet/cabinetData';

const popupWeek = ref(null);
const popupDay = ref(null);

function openWeekPopup(week) {
  popupWeek.value = week;
  popupDay.value = null;
}

function openDayPopup(day) {
  popupDay.value = day;
}

function backToWeek() {
  popupDay.value = null;
}

function closePopup() {
  popupWeek.value = null;
  popupDay.value = null;
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="flex flex-wrap items-center gap-2">
      <span
        class="rounded-full bg-shevchenko-gold px-3 py-1 text-[11px] font-bold tracking-[0.04em] text-white"
      >
        {{ course.badge }}
      </span>
      <span
        v-if="course.availableAfterPurchase"
        class="rounded-full bg-shevchenko-ink px-3 py-1 text-[11px] font-semibold text-white"
      >
        Доступно сразу после покупки
      </span>
    </div>

    <section
      class="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-stretch"
    >
      <div
        class="flex min-h-[200px] w-full flex-col gap-2 overflow-hidden rounded-[22px] bg-white p-2.5 lg:h-full lg:min-h-0"
      >
        <p class="shrink-0 px-1 text-[11px] font-bold uppercase tracking-[0.06em] text-shevchenko-accent">
          {{ courseInfo.videoTitle }}
        </p>
        <div class="relative min-h-[140px] flex-1 lg:min-h-0">
          <FybVideoPlayer
            video-id="intro"
            :poster="courseInfo.videoPoster"
            title="Видео-вступление"
            :caption="courseInfo.videoCaption"
            fill
          />
        </div>
      </div>

      <div
        class="flex flex-col justify-center gap-3 rounded-[22px] bg-white px-3.5 py-3.5 sm:px-4 sm:py-4"
      >
        <div class="flex flex-col gap-2">
          <h1 class="text-base font-extrabold tracking-[-0.25px] text-shevchenko-ink sm:text-lg">
            {{ courseInfo.introTitle }}
          </h1>
          <div class="space-y-1.5 text-[12px] leading-relaxed text-shevchenko-brown sm:text-[13px]">
            <p
              v-for="(paragraph, i) in courseInfo.intro"
              :key="i"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>

        <a
          :href="course.telegramUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex w-full items-center justify-center gap-2 rounded-xl bg-shevchenko-gold px-3 py-2.5 text-center text-[13px] font-bold text-white shadow-[0_6px_16px_rgba(200,171,130,0.35)] transition-transform hover:scale-[1.01]"
        >
          <span
            class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-shevchenko-accent"
          >
            <FybIcon name="telegram" :size="14" color="#FFFFFF" />
          </span>
          {{ courseInfo.telegramCta }}
          <span class="text-white/90 transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </section>

    <section
      class="relative overflow-hidden rounded-[24px] bg-white px-4 py-4 sm:px-5 sm:py-5"
    >
      <div class="relative">
        <h2 class="text-lg font-bold text-shevchenko-ink">
          {{ courseInfo.scheduleTitle }}
        </h2>
        <p class="mt-1 text-sm text-shevchenko-muted">
          {{ courseInfo.scheduleCaption }}
        </p>
        <p class="mt-1 text-xs text-shevchenko-brown">
          {{ courseInfo.scheduleHint }}
        </p>
      </div>

      <div class="relative mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        <button
          v-for="(weekItem, idx) in courseWeeks"
          :key="weekItem.id"
          type="button"
          class="flex min-h-[110px] flex-col justify-between rounded-2xl px-3.5 py-3.5 text-left transition-transform hover:-translate-y-0.5"
          :class="weekItem.isFinale
            ? 'bg-shevchenko-gold text-white'
            : idx % 2 === 0
              ? 'bg-[#F7F4F1] text-shevchenko-ink'
              : 'border border-[#F8F5F2] bg-white text-shevchenko-ink'"
          @click="openWeekPopup(weekItem)"
        >
          <div>
            <p class="text-[11px] font-bold uppercase tracking-[0.08em] opacity-70">
              {{ weekItem.isFinale ? 'Финал' : `Неделя ${idx + 1}` }}
            </p>
            <p class="mt-2 text-[13px] font-bold leading-snug">
              {{ weekItem.label }}
            </p>
            <p class="mt-1 text-[11px] font-medium opacity-80">
              {{ weekItem.meta }}
            </p>
          </div>
          <div class="mt-3 flex items-center justify-between gap-2">
            <span class="text-[11px] font-semibold opacity-90">
              {{ lessonsLabel(weekItem.lessonsCount) }}
            </span>
            <span class="text-[11px] font-semibold opacity-80">
              открыть ›
            </span>
          </div>
        </button>
      </div>
    </section>

    <ScheduleLessonsPopup
      :week="popupWeek"
      :day="popupDay"
      @close="closePopup"
      @select-day="openDayPopup"
      @back="backToWeek"
    />
  </div>
</template>
