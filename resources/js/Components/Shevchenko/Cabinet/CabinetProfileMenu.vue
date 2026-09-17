<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { purchasedCourses, user } from '@/Components/Shevchenko/Cabinet/cabinetData';

defineProps({
  /** sidebar — попап вверх; header — вниз под аватар */
  placement: {
    type: String,
    default: 'sidebar',
  },
});

const open = ref(false);

function toggle() {
  open.value = !open.value;
}

function close() {
  open.value = false;
}

function onClickOutside(e) {
  if (open.value && !e.target.closest('[data-shevchenko-profile]')) {
    close();
  }
}

function onKeydown(e) {
  if (e.key === 'Escape') close();
}

function logout() {
  close();
}

onMounted(() => {
  document.addEventListener('click', onClickOutside, true);
  window.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside, true);
  window.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <div
    data-shevchenko-profile
    class="relative"
  >
    <button
      type="button"
      class="flex w-full items-center gap-2.5 rounded-xl bg-white px-2.5 py-2 text-left transition-colors hover:bg-shevchenko-sand/60"
      :class="placement === 'header' ? 'w-auto gap-0 bg-transparent p-0 hover:bg-transparent' : ''"
      aria-haspopup="menu"
      :aria-expanded="open"
      @click="toggle"
    >
      <img
        :src="user.avatar"
        alt=""
        class="size-9 shrink-0 rounded-xl object-cover object-[center_20%]"
      />
      <template v-if="placement !== 'header'">
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-semibold text-shevchenko-ink">
            {{ user.name }}
          </p>
          <p class="truncate text-[11px] text-shevchenko-muted">
            {{ user.email }}
          </p>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          class="shrink-0 text-shevchenko-soft transition-transform"
          :class="open ? 'rotate-180' : ''"
          aria-hidden="true"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </template>
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-1 scale-[0.98]"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-1 scale-[0.98]"
    >
      <div
        v-if="open"
        role="menu"
        class="absolute z-50 w-[260px] overflow-hidden rounded-[16px] bg-white shadow-[0_12px_36px_rgba(44,33,26,0.14)]"
        :class="placement === 'header'
 ? 'right-0 top-full mt-2'
 : 'bottom-full left-0 mb-2'"
      >
        <div class="px-4 pb-3 pt-4">
          <div class="mb-2.5 flex items-center gap-2.5">
            <img
              :src="user.avatar"
              alt=""
              class="size-11 shrink-0 rounded-full object-cover object-[center_20%]"
            />
            <div class="min-w-0 flex-1">
              <p class="truncate text-[13px] font-bold text-shevchenko-ink">
                {{ user.name }}
              </p>
              <p class="mt-px truncate text-[11px] text-shevchenko-muted">
                {{ user.email }}
              </p>
            </div>
          </div>
          <span
            class="inline-flex items-center rounded-full bg-shevchenko-sand px-2.5 py-0.5 text-[10px] font-semibold text-shevchenko-brown"
          >
            {{ user.role }}
          </span>
        </div>

        <div
          v-if="purchasedCourses.length"
          class="px-3 py-2.5"
        >
          <p class="mb-1.5 px-1 text-[10px] font-bold uppercase tracking-[0.08em] text-shevchenko-soft">
            Мои курсы
          </p>
          <ul class="flex flex-col gap-1">
            <li
              v-for="item in purchasedCourses"
              :key="item.id"
            >
              <div
                class="flex items-center gap-2.5 rounded-xl px-1.5 py-1.5"
                :class="item.current ? 'bg-shevchenko-cream' : ''"
              >
                <img
                  :src="item.cover"
                  alt=""
                  class="size-9 shrink-0 rounded-lg object-cover object-top"
                />
                <div class="min-w-0 flex-1">
                  <p class="truncate text-[12px] font-semibold text-shevchenko-ink">
                    {{ item.title }}
                  </p>
                  <p class="truncate text-[10px] text-shevchenko-muted">
                    {{ item.author }}
                  </p>
                </div>
                <span
                  v-if="item.current"
                  class="shrink-0 rounded-full bg-shevchenko-gold/40 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-shevchenko-brown"
                >
                  Сейчас
                </span>
              </div>
            </li>
          </ul>
        </div>

        <button
          type="button"
          class="flex w-full items-center gap-2 px-4 py-2.5 text-[12px] font-medium text-[#A04A3A] transition-colors hover:bg-[#A04A3A]/[0.06]"
          @click="logout"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3M14 12h7M17 9l3 3-3 3"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Выйти
        </button>
      </div>
    </Transition>
  </div>
</template>
