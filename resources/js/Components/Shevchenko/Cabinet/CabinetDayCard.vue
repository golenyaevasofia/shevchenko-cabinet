<script setup>
import { computed } from 'vue';
import FavoriteHeart from '@/Components/Shevchenko/Cabinet/FavoriteHeart.vue';

const props = defineProps({
  day: {
    type: Object,
    required: true,
  },
});

defineEmits(['open']);

const videoId = computed(() => `day-${props.day.id}`);
</script>

<template>
  <article
    class="flex min-w-0 flex-col overflow-hidden rounded-xl bg-white transition-colors"
  >
    <div class="relative h-[160px] w-full overflow-hidden bg-shevchenko-beige sm:h-[140px]">
      <img
        :src="day.cover"
        alt=""
        class="absolute inset-0 size-full object-cover object-top"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-shevchenko-ink/50 to-transparent"
      />
      <div class="absolute right-2 top-2 z-10">
        <FavoriteHeart
          :video-id="videoId"
          :size="14"
          tone="dark"
        />
      </div>
      <span
        class="absolute bottom-2.5 left-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-shevchenko-ink"
      >
        {{ day.lessonsLabel || day.focus }}
      </span>
    </div>
    <div class="flex flex-1 flex-col gap-3 p-3.5">
      <div class="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        <span
          class="text-sm font-semibold"
          :class="day.today ? 'text-shevchenko-accent' : 'text-shevchenko-ink'"
        >
          {{ day.title || day.short }}
        </span>
        <span
          v-if="day.today"
          class="ml-1 rounded-full bg-shevchenko-sand px-2 py-0.5 text-[10px] font-semibold text-shevchenko-accent"
        >
          Сегодня
        </span>
      </div>
      <p class="text-xs font-medium text-shevchenko-brown">
        {{ day.lessonsLabel || day.heroTitle }}
      </p>
      <button
        type="button"
        class="mt-auto flex w-full items-center justify-between rounded-xl bg-shevchenko-cream px-3 py-2.5 text-left text-[13px] font-semibold text-shevchenko-ink transition-colors hover:bg-shevchenko-sand"
        @click="$emit('open', day)"
      >
        <span>Открыть день</span>
        <span class="text-shevchenko-accent">›</span>
      </button>
    </div>
  </article>
</template>
