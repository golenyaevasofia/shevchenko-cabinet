<script setup>
import { computed } from 'vue';
import FybIcon from '@/Components/Shevchenko/Cabinet/FybIcon.vue';
import { useCabinetUi } from '@/Composables/Shevchenko/useCabinetUi';

const props = defineProps({
  videoId: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 16,
  },
  /** Фон кнопки: dark (поверх фото) или light */
  tone: {
    type: String,
    default: 'dark',
  },
});

const { isFavorite, toggleFavorite } = useCabinetUi();

const RED = '#E11D48';

const heartColor = computed(() =>
  isFavorite(props.videoId) ? RED : (props.tone === 'light' ? '#7A5230' : '#FFFFFF'),
);
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center justify-center transition-colors"
    :class="tone === 'light'
 ? 'size-10 rounded-xl bg-shevchenko-cream'
 : 'size-8 rounded-full bg-black/35 backdrop-blur-sm'"
    :aria-label="isFavorite(videoId) ? 'Убрать из избранного' : 'В избранное'"
    @click.stop="toggleFavorite(videoId)"
  >
    <FybIcon
      name="heart"
      :size="size"
      :color="heartColor"
    />
  </button>
</template>
