<script setup>
import { onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  week: {
    type: Object,
    default: null,
  },
  day: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['close', 'select-day', 'back']);

function onKeydown(e) {
  if (e.key === 'Escape') emit('close');
}

watch(
  () => props.week || props.day,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : '';
  },
);

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="week || day"
        class="shevchenko-scroll fixed inset-0 z-[70] flex items-end justify-center bg-shevchenko-ink/45 p-3 backdrop-blur-[2px] sm:items-center sm:p-4"
        @click.self="emit('close')"
      >
        <div
          class="shevchenko-scroll max-h-[min(85vh,640px)] w-full max-w-[440px] overflow-hidden rounded-[24px] bg-white shadow-2xl"
        >
          <!-- Week → days -->
          <template v-if="week && !day">
            <div class="flex items-start justify-between gap-3 border-b border-shevchenko-cream px-4 py-4">
              <div class="min-w-0">
                <p class="text-[11px] font-bold uppercase tracking-[0.08em] text-shevchenko-accent">
                  Расписание
                </p>
                <h3 class="mt-1 text-lg font-extrabold text-shevchenko-ink">
                  {{ week.label }}
                </h3>
                <p class="mt-0.5 text-xs text-shevchenko-muted">
                  {{ week.meta }} · выберите день
                </p>
              </div>
              <button
                type="button"
                class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-shevchenko-cream text-shevchenko-brown"
                aria-label="Закрыть"
                @click="emit('close')"
              >
                ✕
              </button>
            </div>

            <div class="shevchenko-scroll flex max-h-[min(60vh,480px)] flex-col gap-2 overflow-y-auto p-3">
              <button
                v-for="item in week.days"
                :key="item.id"
                type="button"
                class="flex items-center gap-3 rounded-xl bg-shevchenko-cream/80 px-3 py-3 text-left transition-colors hover:bg-shevchenko-sand"
                @click="emit('select-day', item)"
              >
                <span
                  class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-[11px] font-bold text-shevchenko-accent"
                >
                  {{ item.dateNum }}
                </span>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-semibold text-shevchenko-ink">
                    {{ item.title }}
                  </p>
                  <p class="text-[11px] text-shevchenko-muted">
                    {{ item.date }} · {{ item.lessonsLabel }}
                  </p>
                </div>
                <span
                  class="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-shevchenko-accent"
                >
                  {{ item.lessonsLabel }}
                </span>
                <span class="text-shevchenko-accent">›</span>
              </button>
            </div>
          </template>

          <!-- Day → lesson names -->
          <template v-else-if="day">
            <div class="flex items-start justify-between gap-3 border-b border-shevchenko-cream px-4 py-4">
              <div class="min-w-0">
                <button
                  v-if="week"
                  type="button"
                  class="mb-1 text-[11px] font-semibold text-shevchenko-accent hover:underline"
                  @click="emit('back')"
                >
                  ← {{ week.label }}
                </button>
                <p class="text-[11px] font-bold uppercase tracking-[0.08em] text-shevchenko-accent">
                  Уроки дня
                </p>
                <h3 class="mt-1 text-lg font-extrabold text-shevchenko-ink">
                  {{ day.title }}
                </h3>
                <p class="mt-0.5 text-xs text-shevchenko-muted">
                  {{ day.date }} · {{ day.lessonsLabel }} · без видео
                </p>
              </div>
              <button
                type="button"
                class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-shevchenko-cream text-shevchenko-brown"
                aria-label="Закрыть"
                @click="emit('close')"
              >
                ✕
              </button>
            </div>

            <ol class="shevchenko-scroll flex max-h-[min(60vh,480px)] flex-col gap-2 overflow-y-auto p-3">
              <li
                v-for="(lesson, idx) in day.lessons"
                :key="lesson.id"
                class="flex items-start gap-3 rounded-xl bg-shevchenko-cream/80 px-3 py-3"
              >
                <span
                  class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-shevchenko-gold text-[11px] font-bold text-white"
                >
                  {{ idx + 1 }}
                </span>
                <span class="text-[14px] font-medium leading-snug text-shevchenko-ink">
                  {{ lesson.title }}
                </span>
              </li>
            </ol>
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
