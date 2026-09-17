<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import '../../../../css/themes/shevchenko.css';
import CabinetSidebar from '@/Components/Shevchenko/Cabinet/CabinetSidebar.vue';
import CabinetHome from '@/Components/Shevchenko/Cabinet/CabinetHome.vue';
import CabinetProfileMenu from '@/Components/Shevchenko/Cabinet/CabinetProfileMenu.vue';
import VideoPopup from '@/Components/Shevchenko/Cabinet/VideoPopup.vue';
import FileViewerPopup from '@/Components/Shevchenko/Cabinet/FileViewerPopup.vue';
import CabinetCalendarDrawer from '@/Components/Shevchenko/Cabinet/CabinetCalendarDrawer.vue';
import { course, courseNav } from '@/Components/Shevchenko/Cabinet/cabinetData';
import { provideCabinetUi } from '@/Composables/Shevchenko/useCabinetUi';

const ui = provideCabinetUi();

const navIds = new Set(courseNav.map((item) => item.id));
const params = new URLSearchParams(window.location.search);
const initialView = params.get('view') === 'tv' ? 'important' : params.get('view');
const activeNav = ref(navIds.has(initialView) ? initialView : 'info');
const menuOpen = ref(false);

if (params.get('calendar') === '1') {
  ui.calendarOpen.value = true;
}

watch(
  () => ui.materialsDayToOpen.value,
  (day) => {
    if (day) activeNav.value = 'materials';
  },
);

function closeMenu() {
  menuOpen.value = false;
}

function onKeydown(e) {
  if (e.key === 'Escape') closeMenu();
}

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
});

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
});
</script>

<template>
  <div class="shevchenko-cabinet min-h-screen">
    <div class="flex min-h-screen md:min-h-dvh">
      <div class="hidden shrink-0 md:flex">
        <CabinetSidebar
          :active-nav="activeNav"
          @navigate="activeNav = $event"
        />
      </div>

      <main class="flex min-w-0 flex-1 flex-col">
        <div
          class="flex items-center gap-3 bg-white px-3 py-3 md:hidden"
        >
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg bg-shevchenko-grayBtn p-2"
            aria-label="Меню"
            @click="menuOpen = true"
          >
            <span class="flex flex-col gap-0.5">
              <span class="block h-0.5 w-4 rounded bg-shevchenko-ink" />
              <span class="block h-0.5 w-4 rounded bg-shevchenko-ink" />
              <span class="block h-0.5 w-4 rounded bg-shevchenko-ink" />
            </span>
          </button>
          <button
            type="button"
            class="min-w-0 flex-1 text-left"
            @click="activeNav = 'info'"
          >
            <p class="truncate text-sm font-semibold text-shevchenko-ink">
              {{ course.title }}
            </p>
            <p class="truncate text-[11px] text-shevchenko-muted">
              {{ course.tariff }} · {{ course.progress }}%
            </p>
          </button>
          <CabinetProfileMenu placement="header" />
        </div>

        <div
          class="mx-auto flex w-full max-w-[1200px] flex-1 flex-col gap-4 px-3 py-4 sm:px-4 md:px-6 md:py-5"
        >
          <CabinetHome
            :active-view="activeNav"
            @navigate="activeNav = $event"
          />
        </div>
      </main>
    </div>

    <VideoPopup />
    <FileViewerPopup />
    <CabinetCalendarDrawer />

    <Teleport to="body">
      <div
        v-if="menuOpen"
        class="fixed inset-0 z-50 md:hidden"
      >
        <button
          type="button"
          class="absolute inset-0 bg-shevchenko-ink/40"
          aria-label="Закрыть меню"
          @click="closeMenu"
        />
        <div class="absolute inset-y-0 left-0 overflow-y-auto shadow-xl">
          <CabinetSidebar
            :active-nav="activeNav"
            @navigate="
              activeNav = $event;
              closeMenu();
            "
            @close="closeMenu"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>
