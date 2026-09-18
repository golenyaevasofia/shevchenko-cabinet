<script setup>
import { computed, nextTick, ref, watch } from 'vue';
import CabinetCourseHeader from '@/Components/Shevchenko/Cabinet/CabinetCourseHeader.vue';
import CabinetDayCard from '@/Components/Shevchenko/Cabinet/CabinetDayCard.vue';
import CourseInfoView from '@/Components/Shevchenko/Cabinet/CourseInfoView.vue';
import CourseImportantView from '@/Components/Shevchenko/Cabinet/CourseImportantView.vue';
import CourseExtrasView from '@/Components/Shevchenko/Cabinet/CourseExtrasView.vue';
import CourseFavoritesView from '@/Components/Shevchenko/Cabinet/CourseFavoritesView.vue';
import DayHeroScreen from '@/Components/Shevchenko/Cabinet/DayHeroScreen.vue';
import { courseWeeks, days } from '@/Components/Shevchenko/Cabinet/cabinetData';
import { useCabinetUi } from '@/Composables/Shevchenko/useCabinetUi';

const props = defineProps({
  activeView: {
    type: String,
    default: 'info',
  },
});

const emit = defineEmits(['navigate']);

const { materialsDayToOpen, clearMaterialsDayRequest } = useCabinetUi();

const selectedWeekId = ref(courseWeeks[0].id);
const dayFilter = ref('all');
const view = ref('cards');
const selectedDay = ref(null);
/** Блок сброса дня при переходе из календаря → материалы */
const openingDayFromCalendar = ref(false);

const selectedWeek = computed(
  () => courseWeeks.find((w) => w.id === selectedWeekId.value) || courseWeeks[0],
);

const weekDayFilters = computed(() => [
  { id: 'all', label: 'Все' },
  ...selectedWeek.value.days.map((d) => ({ id: d.id, label: d.title })),
]);

const filteredDays = computed(() =>
  dayFilter.value === 'all'
    ? selectedWeek.value.days
    : selectedWeek.value.days.filter((d) => d.id === dayFilter.value),
);

const nextWeek = computed(() => {
  const idx = courseWeeks.findIndex((w) => w.id === selectedWeekId.value);
  return idx >= 0 && idx < courseWeeks.length - 1 ? courseWeeks[idx + 1] : null;
});

watch(selectedWeekId, () => {
  dayFilter.value = 'all';
});

watch(
  () => props.activeView,
  () => {
    if (openingDayFromCalendar.value || materialsDayToOpen.value) return;
    selectedDay.value = null;
    document.body.style.overflow = '';
  },
);

watch(materialsDayToOpen, async (day) => {
  if (!day) return;
  openingDayFromCalendar.value = true;
  const resolved = days.find((d) => d.id === day.id) || day;
  selectedWeekId.value = resolved.weekId || selectedWeekId.value;
  dayFilter.value = 'all';
  // Дождаться переключения на «Материалы», затем открыть превью дня
  await nextTick();
  await nextTick();
  openDay(resolved);
  clearMaterialsDayRequest();
  await nextTick();
  openingDayFromCalendar.value = false;
});

function openDay(day) {
  selectedDay.value = day;
  document.body.style.overflow = 'hidden';
}

function closeDay() {
  selectedDay.value = null;
  document.body.style.overflow = '';
}

function openNextWeek() {
  if (!nextWeek.value) return;
  selectedWeekId.value = nextWeek.value.id;
}
</script>


<template>
  <div class="flex flex-col gap-4">
    <CabinetCourseHeader @navigate="emit('navigate', $event)" />

    <Transition
      mode="out-in"
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-1.5"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1.5"
    >
    <CourseInfoView v-if="activeView === 'info'" key="info" />
    <CourseImportantView v-else-if="activeView === 'important'" key="important" />
    <CourseExtrasView v-else-if="activeView === 'extras'" key="extras" />
    <CourseFavoritesView v-else-if="activeView === 'favourites'" key="favourites" />

    <div
      v-else-if="activeView === 'materials'"
      key="materials"
      class="flex flex-col gap-4"
    >
      <!-- Weeks -->
      <div
        class="flex flex-col gap-3 rounded-xl bg-white px-3 py-3 sm:px-4"
      >
        <div class="flex flex-wrap items-center justify-between gap-2">
          <p class="text-sm font-medium text-shevchenko-ink">
            {{ selectedWeek.label }}
            <span class="font-normal text-shevchenko-muted">
              · {{ selectedWeek.meta }}
            </span>
          </p>
          <div class="flex rounded-lg bg-shevchenko-cream p-0.5">
            <button
              type="button"
              class="rounded-md px-2.5 py-1.5 text-[11px] font-semibold"
              :class="view === 'cards'
                ? 'bg-white text-shevchenko-ink'
                : 'text-shevchenko-muted'"
              @click="view = 'cards'"
            >
              Карточки
            </button>
            <button
              type="button"
              class="rounded-md px-2.5 py-1.5 text-[11px] font-semibold"
              :class="view === 'list'
                ? 'bg-white text-shevchenko-ink'
                : 'text-shevchenko-muted'"
              @click="view = 'list'"
            >
              Список
            </button>
          </div>
        </div>

        <div class="flex gap-1.5 overflow-x-auto pb-0.5">
          <button
            v-for="w in courseWeeks"
            :key="w.id"
            type="button"
            class="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors"
            :class="selectedWeekId === w.id
              ? 'bg-shevchenko-gold text-white'
              : 'bg-shevchenko-cream text-shevchenko-brown hover:bg-shevchenko-sand'"
            @click="selectedWeekId = w.id"
          >
            {{ w.label }}
            <span class="opacity-70"> {{ w.progress }}%</span>
          </button>
        </div>
      </div>

      <div class="flex gap-1.5 overflow-x-auto pb-0.5">
        <button
          v-for="filter in weekDayFilters"
          :key="filter.id"
          type="button"
          class="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors"
          :class="dayFilter === filter.id
            ? 'bg-shevchenko-ink text-white'
            : 'bg-white text-shevchenko-brown hover:bg-shevchenko-sand'"
          @click="dayFilter = filter.id"
        >
          {{ filter.label }}
        </button>
      </div>

      <div
        v-if="view === 'cards'"
        class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        <CabinetDayCard
          v-for="day in filteredDays"
          :key="day.id"
          :day="day"
          @open="openDay"
        />
      </div>
      <div
        v-else
        class="flex flex-col gap-2"
      >
        <button
          v-for="day in filteredDays"
          :key="day.id"
          type="button"
          class="flex items-center gap-3 rounded-xl bg-white p-3 text-left transition-colors hover:bg-shevchenko-cream/50"
          @click="openDay(day)"
        >
          <img
            :src="day.cover"
            alt=""
            class="size-12 shrink-0 rounded-lg object-cover object-top"
          />
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-shevchenko-ink">
              {{ day.title }}
            </p>
            <p class="text-xs text-shevchenko-muted">
              {{ day.lessonsLabel }}
            </p>
          </div>
          <span
            class="rounded-full bg-shevchenko-sand px-2 py-0.5 text-[10px] font-bold text-shevchenko-accent"
          >
            {{ day.lessonsLabel }}
          </span>
          <span class="text-shevchenko-accent">›</span>
        </button>
      </div>

      <div
        v-if="nextWeek"
        class="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-shevchenko-gold/50 bg-white px-4 py-3"
      >
        <div>
          <p class="text-[11px] font-bold uppercase tracking-[0.08em] text-shevchenko-accent">
            Дальше
          </p>
          <p class="mt-0.5 text-sm font-semibold text-shevchenko-ink">
            {{ nextWeek.label }} · {{ nextWeek.lessonsCount }} уроков
          </p>
        </div>
        <button
          type="button"
          class="rounded-full bg-shevchenko-gold px-4 py-2 text-xs font-bold text-white"
          @click="openNextWeek"
        >
          Открыть раздел ›
        </button>
      </div>
    </div>
    </Transition>

    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <DayHeroScreen
          v-if="selectedDay"
          :day="selectedDay"
          @close="closeDay"
        />
      </Transition>
    </Teleport>
  </div>
</template>
