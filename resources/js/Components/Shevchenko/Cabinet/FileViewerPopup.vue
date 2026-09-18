<script setup>
import { onMounted, onUnmounted, watch } from 'vue';
import FybIcon from '@/Components/Shevchenko/Cabinet/FybIcon.vue';
import { useCabinetUi } from '@/Composables/Shevchenko/useCabinetUi';

const { activeFile, closeFile } = useCabinetUi();

function onKeydown(e) {
  if (e.key === 'Escape') closeFile();
}

watch(activeFile, (file) => {
  document.body.style.overflow = file ? 'hidden' : '';
});

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
});
</script>

<template>
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
        v-if="activeFile"
        class="shevchenko-scroll fixed inset-0 z-[70] flex items-center justify-center bg-shevchenko-ink/55 p-4 backdrop-blur-[2px]"
        @click.self="closeFile"
      >
        <Transition
          appear
          enter-active-class="transition-all duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]"
          enter-from-class="opacity-0 scale-95 translate-y-2"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            class="flex max-h-[90vh] w-full max-w-[720px] flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl"
          >
            <div class="flex items-start justify-between gap-3 px-4 py-3 sm:px-5">
              <div class="min-w-0">
                <p class="text-[11px] font-bold uppercase tracking-[0.08em] text-shevchenko-accent">
                  {{ activeFile.kind }}
                </p>
                <p class="mt-0.5 truncate text-base font-bold text-shevchenko-ink">
                  {{ activeFile.title }}
                </p>
                <p
                  v-if="activeFile.note"
                  class="mt-0.5 truncate text-xs text-shevchenko-muted"
                >
                  {{ activeFile.note }}
                </p>
              </div>
              <button
                type="button"
                class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-shevchenko-cream text-shevchenko-brown"
                aria-label="Закрыть"
                @click="closeFile"
              >
                ✕
              </button>
            </div>

            <div class="min-h-0 flex-1 overflow-y-auto p-5">
              <!-- PDF / документ -->
              <div
                v-if="activeFile.fileType === 'pdf'"
                class="flex min-h-[360px] flex-col overflow-hidden rounded-2xl bg-shevchenko-cream"
              >
                <div
                  v-if="activeFile.fileUrl"
                  class="min-h-[360px] flex-1"
                >
                  <iframe
                    :src="activeFile.fileUrl"
                    class="size-full min-h-[360px] border-0"
                    :title="activeFile.title"
                  />
                </div>
                <div
                  v-else
                  class="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-16 text-center"
                >
                  <span
                    class="flex size-14 items-center justify-center rounded-2xl bg-shevchenko-gold"
                  >
                    <FybIcon name="notebook" :size="26" />
                  </span>
                  <p class="text-sm font-bold text-shevchenko-ink">
                    Просмотр на платформе
                  </p>
                  <p class="max-w-sm text-xs leading-relaxed text-shevchenko-muted">
                    Здесь откроется файл {{ activeFile.kind }} прямо в кабинете.
                    Сейчас файл ещё не загружен — после загрузки PDF появится в этом окне.
                  </p>
                </div>
              </div>

              <!-- Аудио / музыка -->
              <div
                v-else
                class="flex min-h-[280px] flex-col items-center justify-center gap-4 rounded-2xl bg-shevchenko-cream px-6 py-12 text-center"
              >
                <img
                  :src="activeFile.cover"
                  alt=""
                  class="size-28 rounded-2xl object-cover object-[center_25%] shadow-md"
                />
                <p class="text-sm font-bold text-shevchenko-ink">
                  {{ activeFile.title }}
                </p>
                <audio
                  v-if="activeFile.fileUrl"
                  controls
                  class="w-full max-w-md"
                  :src="activeFile.fileUrl"
                />
                <p
                  v-else
                  class="max-w-sm text-xs leading-relaxed text-shevchenko-muted"
                >
                  Аудиоплеер на платформе. Файл ещё не загружен — после загрузки
                  воспроизведение появится здесь.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
