<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import debounce from 'lodash-es/debounce';
import FybIcon from '@/Components/Shevchenko/Cabinet/FybIcon.vue';
import { useCabinetUi } from '@/Composables/Shevchenko/useCabinetUi';

const emit = defineEmits(['navigate']);

const { searchVideos, openVideo, searchQuery } = useCabinetUi();

const query = ref('');
const isLoading = ref(false);
const results = ref([]);
const isOpened = ref(false);
const searchWrapper = ref(null);

const closeResults = () => {
  isOpened.value = false;
};

const clearInput = () => {
  query.value = '';
  searchQuery.value = '';
  results.value = [];
  closeResults();
};

const performSearch = debounce(() => {
  searchQuery.value = query.value;
  if (query.value.length < 2) {
    results.value = [];
    closeResults();
    isLoading.value = false;
    return;
  }

  isLoading.value = true;
  window.setTimeout(() => {
    results.value = searchVideos(query.value);
    isOpened.value = true;
    isLoading.value = false;
  }, 180);
}, 400);

watch(query, () => {
  if (query.value.length >= 2) isLoading.value = true;
  performSearch();
});

function selectResult(item) {
  openVideo(item);
  if (item.section) emit('navigate', item.section);
  clearInput();
}

function handleClickOutside(event) {
  if (searchWrapper.value && !searchWrapper.value.contains(event.target)) {
    closeResults();
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside));
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside));
</script>

<template>
  <div
    ref="searchWrapper"
    class="relative min-w-0 w-full max-w-none sm:w-[200px] lg:w-[240px]"
  >
    <div
      class="flex h-10 w-full items-center gap-2 rounded-xl bg-shevchenko-grayBtn px-3"
    >
      <FybIcon name="search" :size="16" color="#C8AB82" />
      <input
        v-model="query"
        type="text"
        placeholder="Найти тренировку"
        class="w-full border-none bg-transparent p-0 text-xs font-semibold text-shevchenko-ink placeholder:text-shevchenko-grayText focus:outline-none focus:ring-0"
      />
      <button
        v-if="query"
        type="button"
        class="text-xs text-shevchenko-muted"
        aria-label="Очистить"
        @click="clearInput"
      >
        ✕
      </button>
    </div>

    <div
      v-if="isOpened"
      class="absolute left-0 right-0 top-[calc(100%+6px)] z-40 overflow-hidden rounded-2xl bg-white shadow-xl"
    >
      <p class="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-shevchenko-muted">
        Результаты поиска
      </p>
      <div
        v-if="isLoading"
        class="px-3 py-4 text-xs text-shevchenko-muted"
      >
        Загрузка результатов...
      </div>
      <div
        v-else-if="!results.length"
        class="px-3 py-4 text-xs text-shevchenko-muted"
      >
        Ничего не найдено
      </div>
      <ul
        v-else
        class="max-h-[280px] overflow-y-auto py-1"
      >
        <li
          v-for="item in results"
          :key="item.id"
        >
          <button
            type="button"
            class="flex w-full items-center gap-2.5 px-3 py-2.5 text-left hover:bg-shevchenko-cream"
            @click="selectResult(item)"
          >
            <img
              :src="item.cover"
              alt=""
              class="size-10 shrink-0 rounded-lg object-cover object-[center_20%]"
            />
            <span class="min-w-0">
              <span class="block truncate text-sm font-semibold text-shevchenko-ink">
                {{ item.title }}
              </span>
              <span class="block truncate text-[11px] text-shevchenko-muted">
                {{ item.meta }}
              </span>
            </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
