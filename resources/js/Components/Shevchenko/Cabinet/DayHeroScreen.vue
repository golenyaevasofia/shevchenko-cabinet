<script setup>
import { computed } from 'vue';
import FybIcon from '@/Components/Shevchenko/Cabinet/FybIcon.vue';
import FybVideoPlayer from '@/Components/Shevchenko/Cabinet/FybVideoPlayer.vue';
import { useCabinetUi } from '@/Composables/Shevchenko/useCabinetUi';

const props = defineProps({
  day: {
    type: Object,
    required: true,
  },
});

defineEmits(['close']);

const { openVideo } = useCabinetUi();

const lessons = computed(() => props.day.lessons || []);
const isMulti = computed(() => lessons.value.length > 1);

function openLesson(lesson, idx) {
  openVideo({
    id: lesson.id || `day-${props.day.id}-l${idx + 1}`,
    title: lesson.title,
    meta: `${props.day.title || props.day.short} · ${props.day.date} · урок ${idx + 1}`,
    cover: props.day.cover,
  });
}
</script>

<template>
  <div
    class="shevchenko-scroll fixed inset-0 z-[60] overflow-x-hidden overflow-y-auto bg-shevchenko-ink"
  >
    <div class="relative min-h-full w-full">
      <button
        type="button"
        class="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-sm font-semibold text-white backdrop-blur-md sm:left-6 sm:top-6"
        @click="$emit('close')"
      >
        <FybIcon name="arrow-left" :size="16" color="#FFFFFF" />
        Назад
      </button>

      <div
        class="mx-auto flex min-h-full w-full max-w-[1100px] flex-col justify-center gap-6 px-4 py-16 sm:px-6 lg:py-20"
      >
        <div class="text-center">
          <p class="text-xs font-bold uppercase tracking-[0.14em] text-shevchenko-gold">
            {{ day.title || day.short }} · {{ day.date }}
            <span v-if="day.today"> · Сегодня</span>
          </p>
          <h1
            class="mt-3 text-4xl font-extrabold tracking-[-0.8px] text-white sm:text-5xl lg:text-6xl"
          >
            {{ day.heroTitle }}
          </h1>
          <p class="mx-auto mt-3 max-w-xl text-base text-white/75 sm:text-lg">
            {{ day.lessonsLabel || day.heroSubtitle }}
          </p>
        </div>

        <!-- Один урок — крупный плеер -->
        <template v-if="!isMulti">
          <div class="mx-auto w-full min-w-0 max-w-4xl">
            <FybVideoPlayer
              :video-id="lessons[0]?.id || `day-${day.id}`"
              :poster="day.cover"
              :title="lessons[0]?.title || day.heroTitle"
              :caption="day.focus"
              large
            />
          </div>
          <div class="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-2xl bg-shevchenko-gold px-6 py-3.5 text-sm font-extrabold text-white"
              @click="openLesson(lessons[0] || { title: day.heroTitle }, 0)"
            >
              <span class="flex size-7 items-center justify-center rounded-lg bg-shevchenko-ink">
                <FybIcon name="play" :size="12" color="#FFFFFF" />
              </span>
              Смотреть тренировку
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm"
              @click="$emit('close')"
            >
              К расписанию
            </button>
          </div>
        </template>

        <!-- Несколько уроков — превью каждого -->
        <template v-else>
          <div
            class="mx-auto grid w-full max-w-4xl gap-3 sm:grid-cols-2"
            :class="lessons.length >= 3 ? 'lg:grid-cols-3' : ''"
          >
            <button
              v-for="(lesson, idx) in lessons"
              :key="lesson.id"
              type="button"
              class="group overflow-hidden rounded-2xl bg-white/10 text-left backdrop-blur-sm transition-transform hover:-translate-y-0.5"
              @click="openLesson(lesson, idx)"
            >
              <div class="relative aspect-video overflow-hidden bg-shevchenko-brown">
                <img
                  :src="lesson.cover || day.cover"
                  alt=""
                  class="absolute inset-0 size-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div class="absolute inset-0 bg-shevchenko-ink/35" />
                <span
                  class="absolute left-2.5 top-2.5 rounded-full bg-shevchenko-gold px-2 py-0.5 text-[10px] font-bold text-white"
                >
                  Урок {{ idx + 1 }}
                </span>
                <span
                  class="absolute inset-0 flex items-center justify-center"
                >
                  <span
                    class="flex size-11 items-center justify-center rounded-full bg-shevchenko-gold shadow-lg"
                  >
                    <FybIcon name="play" :size="16" color="#FFFFFF" />
                  </span>
                </span>
              </div>
              <div class="px-3.5 py-3">
                <p class="text-sm font-bold text-white">
                  {{ lesson.title }}
                </p>
                <p class="mt-0.5 text-[11px] text-white/65">
                  {{ day.title }} · превью
                </p>
              </div>
            </button>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-2xl bg-shevchenko-gold px-6 py-3.5 text-sm font-extrabold text-white"
              @click="openLesson(lessons[0], 0)"
            >
              <span class="flex size-7 items-center justify-center rounded-lg bg-shevchenko-ink">
                <FybIcon name="play" :size="12" color="#FFFFFF" />
              </span>
              Смотреть с первого урока
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm"
              @click="$emit('close')"
            >
              К расписанию
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
