<script setup>
import { ref } from 'vue';
import FybIcon from '@/Components/Shevchenko/Cabinet/FybIcon.vue';
import ChapterCard from '@/Components/Shevchenko/Cabinet/ChapterCard.vue';
import {
  chapters as initialChapters,
  course,
  sectionProgress,
  user,
} from '@/Components/Shevchenko/Cabinet/cabinetData';

defineEmits(['open-menu', 'open-course']);

const tab = ref('lessons');
const chapters = ref(initialChapters.map((c) => ({ ...c })));

function toggleChapter(id) {
  chapters.value = chapters.value.map((chapter) =>
    chapter.id === id
      ? { ...chapter, open: !chapter.open }
      : { ...chapter, open: false },
  );
}
</script>

<template>
  <section
    class="flex min-w-0 flex-1 flex-col gap-5 bg-white px-4 py-5 sm:gap-6 sm:px-6 sm:py-7 xl:px-8"
  >
    <header class="flex flex-col gap-3">
      <div class="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md bg-shevchenko-grayBtn p-1.5 xl:hidden"
          aria-label="Меню"
          @click="$emit('open-menu')"
        >
          <span class="flex flex-col gap-0.5">
            <span class="block h-0.5 w-3.5 rounded bg-shevchenko-ink" />
            <span class="block h-0.5 w-3.5 rounded bg-shevchenko-ink" />
            <span class="block h-0.5 w-3.5 rounded bg-shevchenko-ink" />
          </span>
        </button>

        <button
          type="button"
          class="hidden items-center rounded-md bg-shevchenko-grayBtn p-1.5 text-[#222] xl:inline-flex"
          aria-label="Назад"
        >
          <FybIcon name="arrow-left" :size="14" color="#222222" />
        </button>

        <h1
          class="min-w-0 flex-1 text-lg font-semibold tracking-[0.2px] text-[#222]"
        >
          Мой курс
        </h1>

        <div class="hidden items-center gap-3 lg:flex">
          <div
            class="flex w-[200px] items-center gap-2 rounded-xl bg-shevchenko-grayBtn px-3 py-2.5 text-shevchenko-grayText xl:w-[240px]"
          >
            <FybIcon name="search" :size="20" color="#ABACAE" />
            <span class="text-xs font-medium tracking-[0.2px]">
              Поиск
            </span>
          </div>
          <button
            type="button"
            class="flex items-center justify-center rounded-[10px] bg-shevchenko-grayBtn p-2.5 text-shevchenko-grayText"
            aria-label="Избранное"
          >
            <FybIcon name="heart" :size="20" color="#ABACAE" />
          </button>
          <button
            type="button"
            class="flex items-center justify-center rounded-[10px] bg-shevchenko-grayBtn p-2.5 text-shevchenko-grayText"
            aria-label="Уведомления"
          >
            <FybIcon name="bell" :size="20" color="#ABACAE" />
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile: cover + avatar + tags + course name (opens course sheet) -->
    <button
      type="button"
      class="flex w-full flex-col overflow-hidden rounded-[22px] bg-white text-left lg:hidden"
      @click="$emit('open-course')"
    >
      <div class="relative h-[148px] w-full overflow-hidden sm:h-[180px]">
        <img
          :src="course.cover"
          alt=""
          class="absolute inset-0 size-full object-cover object-top"
        />
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent from-35% to-[rgba(20,21,20,0.72)]"
        />
        <span
          class="absolute left-3 top-3 rounded-full bg-shevchenko-gold px-2.5 py-1 text-[9px] font-semibold tracking-[0.54px] text-white"
        >
          {{ course.badge }}
        </span>
        <div class="absolute bottom-3 left-3 right-3 flex items-end gap-3">
          <img
            :src="user.avatar"
            alt=""
            class="size-12 shrink-0 rounded-2xl object-cover object-[center_20%] sm:size-14"
          />
          <div class="min-w-0 flex-1 pb-0.5">
            <p
              class="truncate text-lg font-extrabold tracking-[-0.4px] text-white sm:text-xl"
            >
              {{ course.brand }}
            </p>
            <p
              class="truncate text-[10px] font-medium tracking-[1px] text-[#e4e4e1]"
            >
              {{ course.author }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2.5 p-3.5 sm:p-4">
        <div class="flex items-start justify-between gap-2">
          <p
            class="min-w-0 text-[15px] font-bold tracking-[-0.15px] text-shevchenko-ink sm:text-[17px]"
          >
            {{ course.title }}
          </p>
          <span
            class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-shevchenko-sand text-base text-shevchenko-accent"
          >
            ›
          </span>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            class="inline-flex items-center gap-1 rounded-full bg-shevchenko-cream px-2.5 py-1 text-[11px] font-medium text-shevchenko-accent"
          >
            <FybIcon name="book" :size="14" />
            {{ course.sectionsCount }} разделов
          </span>
          <span
            class="inline-flex items-center gap-1 rounded-full bg-shevchenko-cream px-2.5 py-1 text-[11px] font-medium text-shevchenko-accent"
          >
            <FybIcon name="play-circle" :size="14" />
            {{ course.lessonsCount }} урока
          </span>
          <span
            class="inline-flex items-center gap-1 rounded-full bg-shevchenko-sand px-2.5 py-1 text-[11px] font-semibold text-shevchenko-ink"
          >
            {{ course.tariff }}
          </span>
        </div>
      </div>
    </button>

    <div
      class="flex gap-5 overflow-x-auto sm:gap-7"
    >
      <button
        type="button"
        class="shrink-0 pb-3.5 text-[15px] transition-colors"
        :class="tab === 'lessons'
 ? 'border-b-2 border-shevchenko-gold font-semibold text-shevchenko-ink'
 : 'pb-3.5 font-medium text-shevchenko-muted'"
        @click="tab = 'lessons'"
      >
        Мои уроки
      </button>
      <button
        type="button"
        class="shrink-0 pb-3.5 text-[15px] transition-colors"
        :class="tab === 'extras'
 ? 'border-b-2 border-shevchenko-gold font-semibold text-shevchenko-ink'
 : 'font-medium text-shevchenko-muted'"
        @click="tab = 'extras'"
      >
        Дополнительные материалы
      </button>
    </div>

    <template v-if="tab === 'lessons'">
      <div
        class="flex flex-col gap-4 rounded-[20px] bg-white p-5 sm:p-6"
      >
        <div
          class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex flex-wrap gap-4">
            <div
              class="flex items-center gap-1 text-[13px] font-medium text-shevchenko-accent"
            >
              <FybIcon name="book" :size="16" />
              <span>{{ sectionProgress.chapters }} главы</span>
            </div>
            <div
              class="flex items-center gap-1 text-[13px] font-medium text-shevchenko-accent"
            >
              <FybIcon name="play-circle" :size="16" />
              <span>{{ sectionProgress.lessons }} уроков</span>
            </div>
          </div>
          <div class="flex flex-wrap gap-2.5">
            <button
              type="button"
              class="rounded-full px-5 py-2.5 text-[13px] font-semibold text-shevchenko-brown"
            >
              Назад
            </button>
            <button
              type="button"
              class="rounded-full bg-shevchenko-cream px-5 py-2.5 text-[13px] font-semibold text-shevchenko-ink"
            >
              Следующий раздел
            </button>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <h2
            class="min-w-0 flex-1 text-lg font-bold tracking-[-0.19px] text-shevchenko-ink sm:text-[19px]"
          >
            {{ sectionProgress.title }}
          </h2>
          <span
            class="flex size-[30px] shrink-0 items-center justify-center rounded-[9px] bg-shevchenko-sand text-base text-shevchenko-accent"
          >
            ›
          </span>
        </div>

        <div class="flex items-center gap-3.5">
          <div
            class="h-2 flex-1 overflow-hidden rounded-full bg-shevchenko-track"
          >
            <div
              class="h-full rounded-full bg-shevchenko-gold"
              :style="{ width: `${sectionProgress.percent}%` }"
            />
          </div>
          <span class="text-sm font-bold text-shevchenko-accent">
            {{ sectionProgress.percent }}%
          </span>
        </div>
      </div>

      <ChapterCard
        v-for="chapter in chapters"
        :key="chapter.id"
        :chapter="chapter"
        @toggle="toggleChapter"
      />
    </template>

    <div
      v-else
      class="rounded-[20px] bg-shevchenko-cream p-8 text-center text-sm text-shevchenko-muted"
    >
      Дополнительные материалы появятся здесь
    </div>
  </section>
</template>
