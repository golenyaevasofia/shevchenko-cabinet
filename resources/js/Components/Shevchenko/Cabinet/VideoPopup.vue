<script setup>
import { onMounted, onUnmounted, watch } from 'vue';
import FybIcon from '@/Components/Shevchenko/Cabinet/FybIcon.vue';
import FavoriteHeart from '@/Components/Shevchenko/Cabinet/FavoriteHeart.vue';
import { useCabinetUi } from '@/Composables/Shevchenko/useCabinetUi';

const { activeVideo, closeVideo } = useCabinetUi();

function onKeydown(e) {
  if (e.key === 'Escape') closeVideo();
}

watch(activeVideo, (video) => {
  document.body.style.overflow = video ? 'hidden' : '';
});

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="activeVideo"
      class="shevchenko-scroll fixed inset-0 z-[70] flex items-center justify-center bg-shevchenko-ink/55 p-4 backdrop-blur-[2px]"
      @click.self="closeVideo"
    >
      <div
        class="shevchenko-scroll w-full max-w-[720px] overflow-hidden rounded-[24px] bg-white shadow-2xl"
      >
        <div class="flex items-start justify-between gap-3 px-4 py-3 sm:px-5">
          <div class="min-w-0">
            <p class="truncate text-base font-bold text-shevchenko-ink">
              {{ activeVideo.title }}
            </p>
            <p
              v-if="activeVideo.meta"
              class="mt-0.5 truncate text-xs text-shevchenko-muted"
            >
              {{ activeVideo.meta }}
            </p>
          </div>
          <div class="flex shrink-0 items-center gap-1.5">
            <FavoriteHeart
              :video-id="activeVideo.id"
              :size="16"
              tone="light"
            />
            <button
              type="button"
              class="flex size-9 items-center justify-center rounded-xl bg-shevchenko-cream text-shevchenko-brown"
              aria-label="Закрыть"
              @click="closeVideo"
            >
              ✕
            </button>
          </div>
        </div>

        <div class="relative aspect-video bg-shevchenko-ink">
          <img
            :src="activeVideo.cover"
            alt=""
            class="absolute inset-0 size-full object-cover object-[center_20%]"
          />
          <div
            class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-shevchenko-ink/35"
          >
            <span
              class="flex size-12 items-center justify-center rounded-full bg-shevchenko-gold shadow-lg"
            >
              <FybIcon name="play" :size="18" color="#FFFFFF" />
            </span>
            <p class="rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              Прототип плеера · видео подключится позже
            </p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
