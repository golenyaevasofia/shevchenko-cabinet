<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import FybIcon from '@/Components/Shevchenko/Cabinet/FybIcon.vue';
import FybVideoPlayer from '@/Components/Shevchenko/Cabinet/FybVideoPlayer.vue';
import CourseTvView from '@/Components/Shevchenko/Cabinet/CourseTvView.vue';
import { importantBlocks } from '@/Components/Shevchenko/Cabinet/cabinetData';

const activeScheme = ref(null);

function openScheme(card) {
  activeScheme.value = card;
  document.body.style.overflow = 'hidden';
}

function closeScheme() {
  activeScheme.value = null;
  document.body.style.overflow = '';
}

function onKeydown(e) {
  if (e.key === 'Escape') closeScheme();
}

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
});
</script>

<template>
  <div class="flex flex-col gap-5">
    <header>
      <p class="text-xs font-bold uppercase tracking-[0.08em] text-shevchenko-accent">
        Раздел
      </p>
      <h1 class="mt-1 text-2xl font-extrabold text-shevchenko-ink">
        Инструкция к курсу
      </h1>
      <p class="mt-2 max-w-2xl text-sm leading-relaxed text-shevchenko-brown">
        Всё, что нужно знать до старта тренировок — оборудование, схемы, мотивация и вывод на ТВ.
      </p>
    </header>

    <template
      v-for="block in importantBlocks"
      :key="block.id"
    >
      <section
        v-if="block.type === 'equipment'"
        class="overflow-hidden rounded-[24px] bg-white"
      >
        <div class="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div class="flex flex-col gap-4 p-5 sm:p-6">
            <div class="flex items-center gap-3">
              <span
                class="flex size-11 items-center justify-center rounded-2xl bg-shevchenko-gold"
              >
                <img
                  src="images/shevchenko/icons/book-bookmark.png"
                  alt=""
                  width="20"
                  height="20"
                  class="size-5 object-contain brightness-0 invert"
                  draggable="false"
                />
              </span>
              <h2 class="text-lg font-bold text-shevchenko-ink">
                {{ block.title }}
              </h2>
            </div>
            <p class="text-sm leading-relaxed text-shevchenko-brown">
              {{ block.text }}
            </p>
            <ul class="flex flex-col gap-2">
              <li
                v-for="item in block.items"
                :key="item.label"
              >
                <a
                  :href="item.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group flex items-center justify-between gap-3 rounded-xl bg-shevchenko-cream px-4 py-3 transition-colors hover:bg-shevchenko-sand"
                >
                  <span class="flex min-w-0 items-center gap-2">
                    <span
                      class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-shevchenko-gold"
                      aria-hidden="true"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M14 5h5v5M19 5l-9 9M11 6H6a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-5"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <span class="text-sm font-semibold text-shevchenko-ink">
                      {{ item.label }}
                    </span>
                  </span>
                  <span class="shrink-0 text-xs font-medium text-shevchenko-accent">
                    {{ item.note }} →
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Квадратики под фото оборудования -->
          <div
            class="shevchenko-gradient relative min-h-[220px] p-6"
          >
            <div
              class="absolute inset-6 rounded-[28px] bg-white/35 backdrop-blur-sm"
            />
            <div class="relative flex h-full flex-col items-center justify-center gap-3 text-center">
              <div class="flex items-start gap-2.5 sm:gap-3">
                <div
                  v-for="(slot, index) in block.showcase"
                  :key="slot.id"
                  class="size-[72px] overflow-hidden rounded-[18px] bg-white shadow-[0_6px_18px_rgba(61,47,37,0.08)] sm:size-[88px] sm:rounded-[22px]"
                  :class="index === 1 ? 'mt-5' : ''"
                >
                  <img
                    v-if="slot.image"
                    :src="slot.image"
                    :alt="slot.label"
                    class="size-full object-cover"
                    draggable="false"
                  />
                  <span
                    v-else
                    class="flex size-full items-center justify-center px-1 text-[9px] font-semibold leading-tight text-shevchenko-soft"
                  >
                    {{ slot.label }}
                  </span>
                </div>
              </div>
              <p class="text-sm font-bold text-shevchenko-ink">
                Минимум вещей — максимум практики
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        v-else-if="block.type === 'schemes'"
        class="rounded-[24px] bg-white p-5 sm:p-6"
      >
        <div class="mb-4 flex items-center gap-3">
          <span
            class="flex size-11 items-center justify-center rounded-2xl bg-shevchenko-gold"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M21.44 11.05l-8.49 8.49a5.25 5.25 0 0 1-7.42-7.42l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a1.75 1.75 0 0 1-2.47-2.47l8.49-8.48"
                stroke="white"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <div>
            <h2 class="text-lg font-bold text-shevchenko-ink">
              {{ block.title }}
            </h2>
            <p class="mt-1 text-sm text-shevchenko-brown">
              {{ block.text }}
            </p>
          </div>
        </div>
        <div class="grid gap-3 sm:grid-cols-3">
          <button
            v-for="(card, index) in block.cards"
            :key="card.id"
            type="button"
            class="overflow-hidden rounded-2xl bg-shevchenko-cream text-left transition-shadow hover:shadow-md"
            @click="openScheme(card)"
          >
            <div class="relative h-36 overflow-hidden">
              <img
                :src="card.image"
                alt=""
                class="absolute inset-0 size-full object-cover object-[center_25%]"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-shevchenko-ink/55 to-transparent"
              />
              <span
                class="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-shevchenko-ink"
              >
                Схема {{ index + 1 }}
              </span>
            </div>
            <div class="p-4">
              <p class="text-sm font-bold text-shevchenko-ink">
                {{ card.title }}
              </p>
              <p class="mt-1 text-xs text-shevchenko-muted">
                {{ card.hint }}
              </p>
              <p class="mt-2 text-[11px] font-semibold text-shevchenko-accent">
                Открыть подсказку →
              </p>
            </div>
          </button>
        </div>
      </section>

      <section
        v-else-if="block.type === 'video'"
        class="rounded-[24px] bg-white p-5 sm:p-6"
      >
        <div class="mb-4 flex items-center gap-3">
          <span
            class="flex size-9 items-center justify-center rounded-xl bg-shevchenko-gold"
          >
            <FybIcon name="play" :size="14" color="#FFFFFF" />
          </span>
          <div>
            <h2 class="text-base font-bold text-shevchenko-ink">
              {{ block.title }}
            </h2>
            <p class="mt-1 text-xs text-shevchenko-brown sm:text-sm">
              {{ block.text }}
            </p>
          </div>
        </div>
        <div class="mx-auto w-full max-w-md">
          <FybVideoPlayer
            video-id="motivation"
            :poster="block.videoPoster"
            title="Мотивационное видео"
            :caption="block.videoCaption"
            half
          />
        </div>
      </section>
    </template>

    <CourseTvView embedded />

    <Teleport to="body">
      <div
        v-if="activeScheme"
        class="shevchenko-scroll fixed inset-0 z-[70] flex items-center justify-center bg-shevchenko-ink/50 p-4 backdrop-blur-[2px]"
        @click.self="closeScheme"
      >
        <div
          class="w-full max-w-lg overflow-hidden rounded-[24px] bg-white shadow-2xl"
        >
          <div class="flex items-start justify-between gap-3 px-5 py-4">
            <div>
              <p class="text-[11px] font-bold uppercase tracking-[0.08em] text-shevchenko-accent">
                Схема
              </p>
              <h3 class="mt-1 text-lg font-extrabold text-shevchenko-ink">
                {{ activeScheme.popupTitle }}
              </h3>
            </div>
            <button
              type="button"
              class="flex size-9 items-center justify-center rounded-xl bg-shevchenko-cream text-shevchenko-brown"
              aria-label="Закрыть"
              @click="closeScheme"
            >
              ✕
            </button>
          </div>
          <div class="space-y-3 px-5 py-5 text-sm leading-relaxed text-shevchenko-brown">
            <p
              v-for="(paragraph, i) in activeScheme.popupText"
              :key="i"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
