<script setup>
import { computed } from 'vue';
import FybIcon from '@/Components/Shevchenko/Cabinet/FybIcon.vue';
import FybCheck from '@/Components/Shevchenko/Cabinet/FybCheck.vue';

const props = defineProps({
  chapter: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['toggle']);

const isOpen = computed(() => props.chapter.open);
</script>

<template>
  <article
    class="rounded-[20px] bg-white p-5 transition-shadow sm:p-6"
  >
    <button
      type="button"
      class="flex w-full items-center gap-3 text-left"
      @click="emit('toggle', chapter.id)"
    >
      <div class="min-w-0 flex-1">
        <p
          class="text-lg font-bold tracking-[-0.18px] text-shevchenko-ink"
        >
          {{ chapter.title }}
        </p>
        <div class="mt-2 flex flex-wrap gap-3.5">
          <div
            class="flex items-center gap-1 text-xs font-medium text-shevchenko-muted"
          >
            <FybIcon name="play-circle" :size="16" />
            <span>{{ chapter.lessonsLabel }}</span>
          </div>
          <div
            class="flex items-center gap-1 text-xs font-medium text-shevchenko-muted"
          >
            <FybIcon name="clock-lg" :size="16" />
            <span>{{ chapter.duration }}</span>
          </div>
        </div>
      </div>

      <div class="flex shrink-0 items-center gap-3">
        <span
          v-if="chapter.percent != null"
          class="text-sm font-bold text-shevchenko-accent"
        >
          {{ chapter.percent }}%
        </span>
        <FybCheck v-if="chapter.done" :size="30" />
        <span
          class="flex size-[38px] items-center justify-center rounded-[11px] bg-shevchenko-cream text-base text-shevchenko-brown transition-transform"
          :class="isOpen ? '-rotate-90' : ''"
        >
          ›
        </span>
      </div>
    </button>

    <div
      v-if="isOpen && chapter.lessons?.length"
      class="mt-[18px] flex flex-col gap-2.5"
    >
      <div
        v-for="lesson in chapter.lessons"
        :key="lesson.id"
        class="flex items-center gap-3 rounded-[14px] bg-shevchenko-cream p-3 sm:gap-4"
      >
        <div
          class="shevchenko-gradient h-[52px] w-16 shrink-0 rounded-[10px] sm:h-[60px] sm:w-24"
        />
        <div class="min-w-0 flex-1 pt-0.5">
          <div
            class="mb-1.5 inline-flex items-center gap-1 rounded-md bg-shevchenko-sand px-2 py-1"
          >
            <FybIcon name="clock" :size="12" />
            <span class="text-[10px] font-semibold text-shevchenko-accent">
              {{ lesson.duration }}
            </span>
          </div>
          <p
            class="truncate text-[15px] font-semibold text-shevchenko-ink"
          >
            {{ lesson.title }}
          </p>
        </div>
        <div class="flex shrink-0 items-center gap-2 sm:gap-3">
          <FybCheck v-if="lesson.done" :size="30" />
          <span
            v-else
            class="size-[34px] rounded-full"
          />
          <span
            class="flex size-[38px] items-center justify-center rounded-[11px] bg-white text-base text-shevchenko-brown"
          >
            ›
          </span>
        </div>
      </div>
    </div>
  </article>
</template>
