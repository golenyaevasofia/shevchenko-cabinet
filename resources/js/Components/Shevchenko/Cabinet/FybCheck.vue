<script setup>
defineProps({
  size: {
    type: [Number, String],
    default: 30,
  },
});
</script>

<template>
  <span
    class="inline-flex shrink-0 items-center justify-center rounded-full bg-shevchenko-gold"
    :style="{ width: `${size}px`, height: `${size}px` }"
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="size-[55%]"
    >
      <path
        d="M2.5 8.2L6.1 11.8L13.5 4.2"
        stroke="#fff"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </span>
</template>
