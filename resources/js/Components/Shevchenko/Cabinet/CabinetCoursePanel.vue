<script setup>
import FybIcon from '@/Components/Shevchenko/Cabinet/FybIcon.vue';
import { course, courseNav } from '@/Components/Shevchenko/Cabinet/cabinetData';

defineProps({
  activeCourseNav: {
    type: String,
    default: 'materials',
  },
});

defineEmits(['navigate']);
</script>

<template>
  <aside
    class="flex w-full flex-col gap-5 bg-white px-5 pb-7 pt-5 xl:w-[349px] xl:shrink-0 xl:pt-[78px]"
  >
    <div
      class="flex flex-col gap-2 rounded-[22px] bg-white p-4"
    >
      <div
        class="relative h-[180px] overflow-hidden rounded-2xl bg-shevchenko-beige sm:h-[210px]"
      >
        <img
          :src="course.cover"
          alt=""
          class="absolute inset-0 size-full object-cover object-top"
        />
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-[rgba(20,21,20,0.72)]"
        />
        <span
          class="absolute left-3.5 top-3.5 rounded-full bg-shevchenko-gold px-2.5 py-1 text-[9px] font-semibold tracking-[0.54px] text-white"
        >
          {{ course.badge }}
        </span>
        <div class="absolute bottom-3.5 left-3.5 flex flex-col gap-1">
          <p
            class="text-2xl font-extrabold tracking-[-0.48px] text-white"
          >
            {{ course.brand }}
          </p>
          <p
            class="text-[10px] font-medium tracking-[1px] text-[#e4e4e1]"
          >
            {{ course.author }}
          </p>
        </div>
      </div>

      <h2
        class="pt-2 text-[17px] font-bold tracking-[-0.17px] text-shevchenko-ink"
      >
        {{ course.title }}
      </h2>

      <div class="flex flex-wrap gap-3.5">
        <div class="flex items-center gap-1 text-xs font-medium text-shevchenko-accent">
          <FybIcon name="book" :size="16" />
          <span>{{ course.sectionsCount }} разделов</span>
        </div>
        <div class="flex items-center gap-1 text-xs font-medium text-shevchenko-accent">
          <FybIcon name="play-circle" :size="16" />
          <span>{{ course.lessonsCount }} урока</span>
        </div>
      </div>

      <div class="flex gap-2.5 pt-2">
        <button
          type="button"
          class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-shevchenko-gold"
          aria-label="Написать"
        >
          <FybIcon name="message" :size="16" />
        </button>
        <button
          type="button"
          class="flex flex-1 items-center justify-center rounded-xl bg-shevchenko-cream px-3 py-3.5 text-[13px] font-semibold text-shevchenko-brown"
        >
          Сменить курс ⟳
        </button>
      </div>
    </div>

    <nav class="flex flex-col gap-2">
      <button
        v-for="item in courseNav"
        :key="item.id"
        type="button"
        class="flex w-full items-center gap-3 rounded-full px-4 py-3.5 text-left text-sm font-semibold transition-colors"
        :class="activeCourseNav === item.id
 ? 'bg-shevchenko-sand text-shevchenko-ink'
 : 'bg-shevchenko-cream text-shevchenko-ink'"
        @click="$emit('navigate', item.id)"
      >
        <span
          class="size-2 shrink-0 rounded-full"
          :class="activeCourseNav === item.id
 ? 'bg-shevchenko-gold'
 : 'bg-shevchenko-dot'"
        />
        {{ item.label }}
      </button>
    </nav>

    <div
      class="flex items-center rounded-2xl bg-white px-5 py-4"
    >
      <div class="flex flex-col gap-0.5">
        <p class="text-[11px] text-shevchenko-muted">Тариф</p>
        <p class="text-base font-bold text-shevchenko-ink">
          {{ course.tariff }}
        </p>
      </div>
      <button
        type="button"
        class="ml-auto flex size-8 items-center justify-center rounded-[10px] bg-shevchenko-sand text-base text-shevchenko-accent"
        aria-label="Подробнее о тарифе"
      >
        ›
      </button>
    </div>

    <div
      class="flex flex-col gap-0.5 rounded-2xl bg-white px-5 py-4"
    >
      <p class="text-[11px] text-shevchenko-muted">Доступна до</p>
      <p
        class="pb-2.5 text-lg font-bold tracking-[-0.18px] text-shevchenko-ink"
      >
        {{ course.accessUntil }}
      </p>
      <div class="h-1.5 overflow-hidden rounded-full bg-shevchenko-track">
        <div
          class="h-full rounded-full bg-shevchenko-gold"
          :style="{ width: `${course.accessProgress}%` }"
        />
      </div>
    </div>
  </aside>
</template>
