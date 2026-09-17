<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import FybIcon from '@/Components/Shevchenko/Cabinet/FybIcon.vue';
import { days } from '@/Components/Shevchenko/Cabinet/cabinetData';
import { useCabinetUi } from '@/Composables/Shevchenko/useCabinetUi';

const { calendarOpen, closeCalendar, openVideo } = useCabinetUi();

const selectedDayId = ref(days.find((d) => d.today)?.id || days[0]?.id);
const monthLabel = 'Август 2026';

const selectedDay = computed(
  () => days.find((d) => d.id === selectedDayId.value) || days[0],
);

/** Простая сетка месяца под демо (август 2026: сб=1) */
const calendarCells = computed(() => {
  const firstWeekday = 6; // Aug 1 2026 = Saturday (0=Mon)
  const daysInMonth = 31;
  const cells = [];
  for (let i = 0; i < firstWeekday; i += 1) cells.push({ empty: true });
  for (let d = 1; d <= daysInMonth; d += 1) {
    const mapped = days.find((day) => {
      const n = Number(day.date.split(' ')[0]);
      return n === d;
    });
    cells.push({
      empty: false,
      date: d,
      day: mapped || null,
      today: mapped?.today || false,
    });
  }
  return cells;
});

function onKeydown(e) {
  if (e.key === 'Escape' && calendarOpen.value) closeCalendar();
}

function openDayVideo(day) {
  if (!day) return;
  openVideo({
    id: `day-${day.id}`,
    title: day.heroTitle,
    meta: `${day.name} · ${day.date}`,
    cover: day.cover,
  });
}

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => window.removeEventListener('keydown', onKeydown));
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
        v-if="calendarOpen"
        class="fixed inset-0 z-[65] bg-shevchenko-ink/35 backdrop-blur-[2px]"
        @click.self="closeCalendar"
      >
        <Transition
          appear
          enter-active-class="transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition-transform duration-200 ease-in"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <aside
            class="shevchenko-scroll shevchenko-gradient absolute right-0 top-0 flex h-full w-[min(420px,100vw)] flex-col overflow-hidden shadow-[-18px_0_50px_rgba(44,33,26,0.18)]"
          >
            <div class="flex items-start justify-between gap-3 bg-white px-4 py-4">
              <div>
                <p class="text-[11px] font-bold uppercase tracking-[0.1em] text-shevchenko-accent">
                  Календарь курса
                </p>
                <h2 class="mt-1 text-xl font-extrabold text-shevchenko-ink">
                  Feel Your Body
                </h2>
                <p class="mt-1 text-xs text-shevchenko-muted">
                  Расписание недели и дни с тренировками
                </p>
              </div>
              <button
                type="button"
                class="flex size-9 items-center justify-center rounded-xl bg-shevchenko-cream text-shevchenko-brown"
                aria-label="Закрыть"
                @click="closeCalendar"
              >
                ✕
              </button>
            </div>

            <div class="shevchenko-scroll flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
              <div class="rounded-2xl bg-white p-4">
                <div class="mb-3 flex items-center justify-between">
                  <button
                    type="button"
                    class="flex size-8 items-center justify-center rounded-lg bg-shevchenko-cream text-shevchenko-brown"
                  >
                    ‹
                  </button>
                  <p class="text-sm font-bold text-shevchenko-ink">
                    {{ monthLabel }}
                  </p>
                  <button
                    type="button"
                    class="flex size-8 items-center justify-center rounded-lg bg-shevchenko-cream text-shevchenko-brown"
                  >
                    ›
                  </button>
                </div>
                <div class="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase text-shevchenko-muted">
                  <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span>
                </div>
                <div class="grid grid-cols-7 gap-1">
                  <template
                    v-for="(cell, idx) in calendarCells"
                    :key="idx"
                  >
                    <div
                      v-if="cell.empty"
                      class="aspect-square"
                    />
                    <button
                      v-else
                      type="button"
                      class="relative flex aspect-square flex-col items-center justify-center rounded-xl text-xs font-semibold transition-colors"
                      :class="cell.day && selectedDayId === cell.day.id
 ? 'bg-shevchenko-ink text-white'
 : cell.today
 ? 'bg-shevchenko-gold text-white'
 : cell.day
 ? 'bg-shevchenko-sand text-shevchenko-ink hover:bg-shevchenko-gold/60'
 : 'text-shevchenko-muted hover:bg-shevchenko-cream'"
                      @click="cell.day && (selectedDayId = cell.day.id)"
                    >
                      {{ cell.date }}
                      <span
                        v-if="cell.day"
                        class="mt-0.5 size-1 rounded-full"
                        :class="selectedDayId === cell.day.id ? 'bg-shevchenko-gold' : 'bg-shevchenko-accent'"
                      />
                    </button>
                  </template>
                </div>
              </div>

              <div class="rounded-2xl bg-white p-4">
                <p class="text-[11px] font-bold uppercase tracking-[0.08em] text-shevchenko-accent">
                  Выбранная тренировка
                </p>
                <template v-if="selectedDay">
                  <h3 class="mt-2 text-lg font-extrabold text-shevchenko-ink">
                    {{ selectedDay.heroTitle }}
                  </h3>
                  <p class="mt-1 text-sm text-shevchenko-brown">
                    {{ selectedDay.name }} · {{ selectedDay.date }} · {{ selectedDay.focus }}
                  </p>
                  <p class="mt-2 text-xs text-shevchenko-muted">
                    {{ selectedDay.heroSubtitle }}
                  </p>
                  <button
                    type="button"
                    class="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-shevchenko-gold px-4 py-3 text-sm font-bold text-white"
                    @click="openDayVideo(selectedDay)"
                  >
                    <span class="flex size-7 items-center justify-center rounded-lg bg-shevchenko-ink">
                      <FybIcon name="play" :size="12" color="#FFFFFF" />
                    </span>
                    Открыть тренировку
                  </button>
                </template>
              </div>

              <div class="flex flex-col gap-2">
                <p class="text-xs font-bold uppercase tracking-[0.08em] text-shevchenko-muted">
                  Неделя курса
                </p>
                <button
                  v-for="day in days"
                  :key="day.id"
                  type="button"
                  class="flex items-center gap-3 rounded-xl bg-white p-2.5 text-left"
                  :class="selectedDayId === day.id ? 'bg-shevchenko-sand' : ''"
                  @click="selectedDayId = day.id"
                >
                  <img
                    :src="day.cover"
                    alt=""
                    class="size-12 shrink-0 rounded-lg object-cover object-[center_20%]"
                  />
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-semibold text-shevchenko-ink">
                      {{ day.short }} · {{ day.heroTitle }}
                    </p>
                    <p class="text-[11px] text-shevchenko-muted">
                      {{ day.date }}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </aside>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
