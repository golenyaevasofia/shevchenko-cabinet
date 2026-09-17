<script setup>
import FybIcon from '@/Components/Shevchenko/Cabinet/FybIcon.vue';
import FavoriteHeart from '@/Components/Shevchenko/Cabinet/FavoriteHeart.vue';
import { useCabinetUi } from '@/Composables/Shevchenko/useCabinetUi';

const { favorites, openVideo } = useCabinetUi();
</script>

<template>
  <div class="flex flex-col gap-5">
    <header>
      <p class="text-xs font-bold uppercase tracking-[0.08em] text-shevchenko-accent">
        Раздел
      </p>
      <h1 class="mt-1 text-2xl font-extrabold text-shevchenko-ink">
        Избранное
      </h1>
      <p class="mt-2 max-w-2xl text-sm leading-relaxed text-shevchenko-brown">
        Видео, которые вы отметили сердечком — всё в одном месте.
      </p>
    </header>

    <div
      v-if="!favorites.length"
      class="rounded-[24px] bg-white px-5 py-14 text-center"
    >
      <span
        class="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-shevchenko-sand"
      >
        <FybIcon name="heart" :size="22" color="#E11D48" />
      </span>
      <p class="text-sm font-semibold text-shevchenko-ink">
        Пока пусто
      </p>
      <p class="mt-1 text-xs text-shevchenko-muted">
        Нажмите сердечко на любом видео — оно появится здесь
      </p>
    </div>

    <div
      v-else
      class="grid gap-3 sm:grid-cols-2"
    >
      <article
        v-for="item in favorites"
        :key="item.id"
        class="overflow-hidden rounded-2xl bg-white"
      >
        <button
          type="button"
          class="relative block h-[140px] w-full overflow-hidden"
          @click="openVideo(item)"
        >
          <img
            :src="item.cover"
            alt=""
            class="absolute inset-0 size-full object-cover object-[center_25%]"
          />
          <div class="absolute inset-0 bg-shevchenko-ink/25" />
          <span
            class="absolute inset-0 m-auto flex size-10 items-center justify-center rounded-full bg-shevchenko-gold"
          >
            <FybIcon
              :name="item.type === 'file' ? 'notebook' : 'play'"
              :size="14"
              :color="item.type === 'file' ? '#2C211A' : '#FFFFFF'"
            />
          </span>
        </button>
        <div class="flex items-start gap-2 p-3.5">
          <div class="min-w-0 flex-1">
            <p class="text-sm font-bold text-shevchenko-ink">
              {{ item.title }}
            </p>
            <p class="mt-0.5 text-[11px] text-shevchenko-muted">
              {{ item.meta }}
            </p>
          </div>
          <FavoriteHeart
            :video-id="item.id"
            :size="16"
            tone="light"
          />
        </div>
      </article>
    </div>
  </div>
</template>
