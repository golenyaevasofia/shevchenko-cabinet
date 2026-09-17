<script setup>
import FybIcon from '@/Components/Shevchenko/Cabinet/FybIcon.vue';
import CabinetSearch from '@/Components/Shevchenko/Cabinet/CabinetSearch.vue';
import { course } from '@/Components/Shevchenko/Cabinet/cabinetData';
import { useCabinetUi } from '@/Composables/Shevchenko/useCabinetUi';

const emit = defineEmits(['navigate']);
const { openCalendar } = useCabinetUi();
</script>

<template>
  <div
    class="flex flex-col gap-3 rounded-2xl bg-white p-3 sm:p-4 lg:flex-row lg:items-center lg:gap-4"
  >
    <div class="flex min-w-0 flex-1 items-center gap-3">
      <button
        type="button"
        class="size-14 shrink-0 overflow-hidden rounded-xl sm:size-[60px]"
        aria-label="Информация о курсе"
        @click="emit('navigate', 'info')"
      >
        <img
          :src="course.cover"
          alt=""
          class="size-full object-cover object-top"
        />
      </button>
      <div class="min-w-0 flex-1">
        <div class="mb-1">
          <button
            type="button"
            class="min-w-0 truncate text-left text-base font-semibold tracking-[0.2px] text-shevchenko-ink transition-colors hover:text-shevchenko-brown sm:text-lg"
            @click="emit('navigate', 'info')"
          >
            {{ course.title }}
          </button>
        </div>
        <div
          class="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-shevchenko-muted"
        >
          <span>Тариф {{ course.tariff }}</span>
          <span class="text-shevchenko-dot">·</span>
          <span>Доступна до {{ course.accessUntil }}</span>
          <button
            type="button"
            class="rounded-full bg-shevchenko-gold px-2.5 py-0.5 text-[11px] font-semibold text-white"
          >
            Продлить
          </button>
        </div>
      </div>
    </div>

    <div class="flex min-w-0 shrink-0 items-center gap-2 lg:max-w-[420px]">
      <CabinetSearch
        class="min-w-0 flex-1"
        @navigate="emit('navigate', $event)"
      />
      <button
        type="button"
        class="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-shevchenko-grayBtn"
        aria-label="Календарь"
        @click="openCalendar"
      >
        <FybIcon name="calendar" :size="18" color="#C8AB82" />
      </button>
      <button
        type="button"
        class="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-shevchenko-grayBtn"
        aria-label="Избранное"
        @click="emit('navigate', 'favourites')"
      >
        <FybIcon name="heart" :size="18" color="#C8AB82" />
      </button>
    </div>
  </div>
</template>
