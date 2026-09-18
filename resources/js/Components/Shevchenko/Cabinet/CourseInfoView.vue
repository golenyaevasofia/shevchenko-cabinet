<script setup>
import FybIcon from '@/Components/Shevchenko/Cabinet/FybIcon.vue';
import FybVideoPlayer from '@/Components/Shevchenko/Cabinet/FybVideoPlayer.vue';
import {
  course,
  courseInfo,
  weeklySchedule,
} from '@/Components/Shevchenko/Cabinet/cabinetData';
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
        v-if="course.secondaryBadge"
        class="rounded-full bg-shevchenko-ink px-3 py-1 text-[11px] font-semibold text-white"
      >
        {{ course.secondaryBadge }}
      </span>
    </div>

    <section
      class="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-stretch"
    >
      <div
        class="flex min-h-[200px] w-full flex-col gap-2 overflow-hidden rounded-[22px] bg-white p-2.5 lg:h-full lg:min-h-0"
      >
        <div class="shrink-0 px-1">
          <p class="text-[11px] font-bold uppercase tracking-[0.06em] text-shevchenko-accent">
            {{ courseInfo.videoTitle }}
          </p>
          <p
            v-if="courseInfo.videoReleaseNote"
            class="mt-0.5 text-[11px] font-medium text-shevchenko-muted"
          >
            {{ courseInfo.videoReleaseNote }}
          </p>
        </div>
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
      </div>

      <div class="relative mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div
          v-for="item in weeklySchedule"
          :key="item.day"
          class="flex flex-col gap-1.5 rounded-xl px-3 py-3 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(122,82,48,0.12)]"
          :class="item.isRest ? 'bg-[#F3F1ED]' : 'bg-[#F7F4F1]'"
        >
          <span
            class="inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
            :class="item.isRest
              ? 'bg-[#E7E3DC] text-shevchenko-muted'
              : 'bg-shevchenko-gold text-white'"
          >
            {{ item.day }}
          </span>
          <p
            class="line-clamp-3 text-[12px] font-semibold leading-snug"
            :class="item.isRest ? 'text-shevchenko-muted' : 'text-shevchenko-ink'"
          >
            {{ item.title }}
          </p>
          <p
            v-if="item.extra"
            class="line-clamp-2 text-[10px] leading-snug text-shevchenko-accent"
          >
            + {{ item.extra }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
