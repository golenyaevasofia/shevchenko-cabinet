<script setup>
import { ref } from 'vue';
import FybIcon from '@/Components/Shevchenko/Cabinet/FybIcon.vue';
import CabinetProfileMenu from '@/Components/Shevchenko/Cabinet/CabinetProfileMenu.vue';
import {
  course,
  courseNav,
} from '@/Components/Shevchenko/Cabinet/cabinetData';

defineProps({
  activeNav: {
    type: String,
    default: 'info',
  },
});

defineEmits(['navigate', 'close']);

const chatPopupOpen = ref(false);
</script>

<template>
  <aside
    class="flex h-full w-[300px] shrink-0 flex-col gap-4 border-r border-[#F4ECEC] bg-[#F8F5F2] px-3 py-4"
  >
    <button
      type="button"
      class="flex size-9 self-end items-center justify-center rounded-xl bg-white text-lg leading-none text-shevchenko-brown md:hidden"
      aria-label="Закрыть"
      @click="$emit('close')"
    >
      ✕
    </button>

    <!-- Current course plate -->
    <div
      class="flex flex-col gap-2 overflow-hidden rounded-[22px] bg-white p-3"
    >
      <div
        class="relative h-[168px] overflow-hidden rounded-2xl bg-shevchenko-beige"
      >
        <img
          :src="course.cover"
          alt=""
          class="absolute inset-0 size-full object-cover object-top"
        />
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-[rgba(20,21,20,0.72)]"
        />
        <div class="absolute bottom-3 left-3 flex flex-col gap-0.5">
          <p class="text-[19px] font-extrabold tracking-[-0.4px] text-white">
            {{ course.brand }}
          </p>
          <p class="text-[10px] font-medium tracking-[1px] text-[#e4e4e1]">
            {{ course.author }}
          </p>
        </div>
      </div>

      <p class="pt-1 text-[15px] font-bold tracking-[-0.15px] text-shevchenko-ink">
        {{ course.fullTitle }}
      </p>

      <div class="flex flex-wrap gap-3">
        <div
          class="flex items-center gap-1 text-xs font-medium text-shevchenko-accent"
        >
          <FybIcon name="book" :size="14" />
          <span>{{ course.sectionsCount }} разделов</span>
        </div>
        <div
          class="flex items-center gap-1 text-xs font-medium text-shevchenko-accent"
        >
          <FybIcon name="play-circle" :size="14" />
          <span>{{ course.lessonsCount }} урока</span>
        </div>
      </div>

      <div class="flex gap-2 pt-1">
        <button
          type="button"
          class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-shevchenko-gold"
          aria-label="Чат"
          aria-haspopup="dialog"
          :aria-expanded="chatPopupOpen"
          @click="chatPopupOpen = true"
        >
          <FybIcon name="chat" :size="16" color="#FFFFFF" />
        </button>
        <button
          type="button"
          class="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-shevchenko-cream px-3 py-3 text-[13px] font-semibold text-shevchenko-brown"
        >
          Сменить курс ⟳
        </button>
      </div>

      <div class="flex items-center gap-2.5 pt-1">
        <div class="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-shevchenko-track">
          <div
            class="h-full rounded-full bg-shevchenko-gold"
            :style="{ width: `${course.progress}%` }"
          />
        </div>
        <span class="shrink-0 text-xs font-semibold text-shevchenko-accent">
          {{ course.progress }}%
        </span>
      </div>
    </div>

    <nav class="flex flex-1 flex-col gap-1 overflow-y-auto">
      <button
        v-for="item in courseNav"
        :key="item.id"
        type="button"
        class="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-colors"
        :class="
          activeNav === item.id
            ? 'bg-shevchenko-sand font-semibold text-shevchenko-ink'
            : 'font-medium text-shevchenko-brown hover:bg-white/70'
        "
        @click="$emit('navigate', item.id)"
      >
        <FybIcon :name="item.icon" :size="18" color="#7A5230" />
        <span class="min-w-0 flex-1 truncate">{{ item.label }}</span>
        <span
          v-if="item.highlight"
          class="rounded-full bg-shevchenko-ink px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white"
        >
          NEW
        </span>
      </button>
    </nav>

    <div class="mt-auto flex flex-col gap-2 pt-3">
      <CabinetProfileMenu placement="sidebar" />
      <button
        type="button"
        class="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-3 py-2.5 text-xs font-semibold text-shevchenko-grayText"
      >
        <FybIcon name="headphones" :size="18" color="#ABACAE" />
        Поддержка
      </button>
    </div>
  </aside>

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
        v-if="chatPopupOpen"
        class="fixed inset-0 z-[70] flex items-end justify-center bg-shevchenko-ink/45 p-3 backdrop-blur-[2px] sm:items-center sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-popup-title"
        @click.self="chatPopupOpen = false"
      >
        <div
          class="w-full max-w-[360px] overflow-hidden rounded-[24px] bg-white p-4 shadow-2xl"
        >
          <div class="mb-4 flex items-start justify-between gap-3">
            <div>
              <h3
                id="chat-popup-title"
                class="text-lg font-extrabold text-shevchenko-ink"
              >
                Чаты курса
              </h3>
              <p class="mt-0.5 text-xs text-shevchenko-muted">
                Выберите удобный мессенджер
              </p>
            </div>
            <button
              type="button"
              class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-shevchenko-cream text-shevchenko-brown"
              aria-label="Закрыть"
              @click="chatPopupOpen = false"
            >
              ✕
            </button>
          </div>

          <div class="flex flex-col gap-2">
            <a
              :href="course.chatMaxUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center rounded-xl bg-shevchenko-gold px-4 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Чат MAX
            </a>
            <a
              :href="course.telegramUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center rounded-xl bg-shevchenko-cream px-4 py-3.5 text-sm font-semibold text-shevchenko-brown transition-colors hover:bg-shevchenko-sand"
            >
              Чат телеграм
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
