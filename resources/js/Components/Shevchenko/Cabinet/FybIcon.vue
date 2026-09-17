<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 16,
  },
  /** Tint for monochrome SVG icons via CSS mask + currentColor. */
  color: {
    type: String,
    default: '',
  },
});

const ICONS = 'images/shevchenko/icons';

/** type: mask = monochrome SVG (safe to tint); img = raster as-is */
const MAP = {
  phone: { src: `${ICONS}/phone.png`, type: 'img' },
  letter: { src: `${ICONS}/letter.png`, type: 'img' },
  pen: { src: `${ICONS}/pen.png`, type: 'img' },
  play: { src: `${ICONS}/play-triangle.svg`, type: 'mask' },
  'play-circle': { src: `${ICONS}/play-triangle.svg`, type: 'mask' },
  notebook: { src: `${ICONS}/notebook.svg`, type: 'mask' },
  'notebook-img': { src: `${ICONS}/notebook.png`, type: 'img' },
  book: { src: `${ICONS}/book.svg`, type: 'mask' },
  clock: { src: `${ICONS}/clock.svg`, type: 'mask' },
  'clock-sm': { src: `${ICONS}/clock.svg`, type: 'mask' },
  'clock-lg': { src: `${ICONS}/clock.svg`, type: 'mask' },
  message: { src: `${ICONS}/chat-dots.svg`, type: 'mask' },
  chat: { src: `${ICONS}/chat-dots.svg`, type: 'mask' },
  telegram: { src: `${ICONS}/telegram.svg`, type: 'mask' },
  logout: { src: `${ICONS}/logout.png`, type: 'img' },
  transfer: { src: `${ICONS}/transfer.png`, type: 'img' },
  headphones: { src: `${ICONS}/headphones.svg`, type: 'mask' },
  search: { src: `${ICONS}/search.svg`, type: 'mask' },
  heart: { src: `${ICONS}/heart.svg`, type: 'mask' },
  calendar: { src: `${ICONS}/calendar.svg`, type: 'mask' },
  tv: { src: `${ICONS}/tv.svg`, type: 'mask' },
  bell: { src: `${ICONS}/bell.svg`, type: 'mask' },
  'arrow-left': { src: `${ICONS}/arrow-left.svg`, type: 'mask' },
};

const icon = computed(() => MAP[props.name] || null);

const boxStyle = computed(() => {
  const style = {
    width: `${props.size}px`,
    height: `${props.size}px`,
  };
  if (props.color) style.color = props.color;
  return style;
});
</script>

<template>
  <span
    v-if="icon?.type === 'mask'"
    class="inline-block shrink-0 bg-current"
    :style="{
      ...boxStyle,
      mask: `url(${icon.src}) center / contain no-repeat`,
      WebkitMask: `url(${icon.src}) center / contain no-repeat`,
    }"
    aria-hidden="true"
  />
  <img
    v-else-if="icon"
    :src="icon.src"
    alt=""
    class="inline-block shrink-0 object-contain"
    :width="size"
    :height="size"
    :style="boxStyle"
    aria-hidden="true"
    draggable="false"
  />
</template>
