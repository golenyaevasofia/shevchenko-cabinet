<script setup>
import FybIcon from '@/Components/Shevchenko/Cabinet/FybIcon.vue';
import FavoriteHeart from '@/Components/Shevchenko/Cabinet/FavoriteHeart.vue';
import { useCabinetUi } from '@/Composables/Shevchenko/useCabinetUi';

const props = defineProps({
  folder: {
    type: Object,
    required: true,
  },
  backLabel: {
    type: String,
    default: 'Назад',
  },
});

defineEmits(['back']);

const { openVideo } = useCabinetUi();

function playLesson(lesson) {
  openVideo({
    id: lesson.id,
    title: lesson.title,
    meta: `Раздел «${props.folder.title}» · ${lesson.duration}`,
    cover: props.folder.cover,
  });
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <button
      type="button"
      class="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-shevchenko-brown"
      @click="$emit('back')"
    >
      <FybIcon name="arrow-left" :size="16" color="#7A5230" />
      {{ backLabel }}
    </button>

    <section
      class="overflow-hidden rounded-[24px] bg-white"
    >
      <div class="relative h-[180px] sm:h-[220px]">
        <img
          :src="folder.cover"
          alt=""
          class="absolute inset-0 size-full object-cover object-top"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-shevchenko-ink via-shevchenko-ink/40 to-transparent"
        />
        <div class="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <p class="text-[11px] font-bold uppercase tracking-[0.1em] text-shevchenko-gold">
            Раздел курса
          </p>
          <h1 class="mt-1 text-3xl font-extrabold text-white sm:text-4xl">
            {{ folder.title }}
          </h1>
        </div>
      </div>

      <div class="grid gap-4 bg-shevchenko-cream/60 p-5 sm:grid-cols-2 sm:p-6">
        <div class="rounded-2xl bg-white p-4">
          <p class="text-[11px] font-bold uppercase tracking-[0.08em] text-shevchenko-accent">
            Для чего этот раздел
          </p>
          <p class="mt-2 text-sm leading-relaxed text-shevchenko-brown">
            {{ folder.description }}
          </p>
        </div>
        <div class="rounded-2xl bg-white p-4">
          <p class="text-[11px] font-bold uppercase tracking-[0.08em] text-shevchenko-accent">
            Что даст ученику
          </p>
          <p class="mt-2 text-sm leading-relaxed text-shevchenko-brown">
            {{ folder.benefit }}
          </p>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-2">
      <h2 class="text-base font-bold text-shevchenko-ink">
        Видео раздела · {{ folder.lessonsCount }}
      </h2>
      <div
        v-for="lesson in folder.lessons"
        :key="lesson.id"
        class="flex items-center gap-2 rounded-2xl bg-white p-2.5"
      >
        <button
          type="button"
          class="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-1 py-1 text-left transition-colors hover:bg-shevchenko-cream/50"
          @click="playLesson(lesson)"
        >
          <span
            class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-shevchenko-gold"
          >
            <FybIcon name="play" :size="14" color="#FFFFFF" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-shevchenko-ink">
              {{ lesson.title }}
            </p>
            <p class="text-xs text-shevchenko-muted">
              {{ lesson.duration }}
            </p>
          </div>
          <span class="text-shevchenko-accent">›</span>
        </button>
        <FavoriteHeart
          :video-id="lesson.id"
          :size="16"
          tone="light"
        />
      </div>
    </section>
  </div>
</template>
