<script setup>
import { computed, ref } from 'vue';
import FybIcon from '@/Components/Shevchenko/Cabinet/FybIcon.vue';
import FavoriteHeart from '@/Components/Shevchenko/Cabinet/FavoriteHeart.vue';
import { useCabinetUi } from '@/Composables/Shevchenko/useCabinetUi';

const props = defineProps({
  poster: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  caption: {
    type: String,
    default: '',
  },
  videoId: {
    type: String,
    default: '',
  },
  large: {
    type: Boolean,
    default: false,
  },
  compact: {
    type: Boolean,
    default: false,
  },
  short: {
    type: Boolean,
    default: false,
  },
  fill: {
    type: Boolean,
    default: false,
  },
  /** Половинный размер (мотивация / компактные блоки) */
  half: {
    type: Boolean,
    default: false,
  },
  showFavorite: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['play']);

const playing = ref(false);
const { openVideo } = useCabinetUi();

const playBtnClass = computed(() => {
  if (props.compact || props.fill || props.short) return 'size-8';
  if (props.half) return 'size-9';
  if (props.large) return 'size-10 sm:size-11';
  return 'size-9';
});

const playIconSize = computed(() => {
  if (props.compact || props.fill || props.short) return 12;
  if (props.half) return 14;
  if (props.large) return 16;
  return 14;
});

function onPlay() {
  playing.value = true;
  if (props.videoId || props.title) {
    openVideo({
      id: props.videoId || props.title,
      title: props.title || 'Видео',
      meta: props.caption,
      cover: props.poster,
    });
  }
  emit('play');
}
</script>

<template>
  <div
    class="relative overflow-hidden rounded-2xl bg-shevchenko-ink"
    :class="fill
 ? 'absolute inset-0 size-full min-h-0'
 : compact
 ? 'aspect-[4/5] w-full'
 : short
 ? 'h-[148px] w-full sm:h-[160px]'
 : half
 ? 'aspect-video max-h-[220px] w-full'
 : large
 ? 'aspect-video w-full max-w-full'
 : 'aspect-video'"
  >
    <img
      :src="poster"
      alt=""
      class="absolute inset-0 size-full object-cover"
      :class="[
 playing ? 'opacity-40' : 'opacity-100',
 fill || short || half ? 'object-[center_22%]' : 'object-[center_20%]',
 ]"
    />
    <div
      class="absolute inset-0 bg-gradient-to-t from-shevchenko-ink/80 via-shevchenko-ink/20 to-transparent"
    />

    <div
      v-if="showFavorite && videoId"
      class="absolute right-2.5 top-2.5 z-10"
    >
      <FavoriteHeart
        :video-id="videoId"
        :size="16"
        tone="dark"
      />
    </div>

    <button
      type="button"
      class="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white"
      :class="compact || fill || short ? 'gap-1.5 px-2' : 'gap-2.5'"
      @click="onPlay"
    >
      <span
        class="flex items-center justify-center rounded-full bg-shevchenko-gold shadow-lg transition-transform hover:scale-105"
        :class="playBtnClass"
      >
        <FybIcon
          name="play"
          :size="playIconSize"
          color="#FFFFFF"
        />
      </span>
      <span
        v-if="!compact && !fill && !short && (title || caption)"
        class="max-w-[90%] text-center"
      >
        <span
          v-if="title"
          class="block text-sm font-semibold sm:text-base"
        >{{ title }}</span>
        <span
          v-if="caption"
          class="mt-1 block text-xs text-white/80 sm:text-sm"
        >{{ caption }}</span>
      </span>
    </button>
  </div>
</template>
