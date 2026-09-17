<script setup>
import { computed, ref } from 'vue';
import FybIcon from '@/Components/Shevchenko/Cabinet/FybIcon.vue';
import CourseFolderView from '@/Components/Shevchenko/Cabinet/CourseFolderView.vue';
import { extrasFolders } from '@/Components/Shevchenko/Cabinet/cabinetData';

const activeGroup = ref(null);
const activeFolder = ref(null);

const gridItems = computed(() =>
  activeGroup.value ? activeGroup.value.children : extrasFolders,
);

function openItem(item) {
  if (item.type === 'file') return;
  if (item.type === 'group') {
    activeGroup.value = item;
    activeFolder.value = null;
    return;
  }
  activeFolder.value = item;
}

function itemFooter(item) {
  if (item.type === 'file') return '';
  if (item.type === 'group') return 'Открыть папки ›';
  return `${item.lessonsCount} видео · открыть ›`;
}

function isClickable(item) {
  return item.type !== 'file';
}

function backFromFolder() {
  activeFolder.value = null;
}

function backFromGroup() {
  activeGroup.value = null;
  activeFolder.value = null;
}
</script>

<template>
  <CourseFolderView
    v-if="activeFolder"
    :folder="activeFolder"
    :back-label="activeGroup ? `К «${activeGroup.title}»` : 'К допматериалам'"
    @back="backFromFolder"
  />

  <div
    v-else
    class="flex flex-col gap-5"
  >
    <header
      class="shevchenko-gradient relative overflow-hidden rounded-[24px] px-5 py-5 sm:px-6 sm:py-5"
    >
      <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-5">
        <div class="flex min-w-0 items-center gap-3.5 lg:shrink-0">
          <span
            class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#B8956A] sm:size-14"
          >
            <img
              src="/images/shevchenko/icons/book-bookmark.png"
              alt=""
              width="26"
              height="26"
              class="size-5 object-contain brightness-0 invert sm:size-[26px]"
              draggable="false"
            />
          </span>
          <div class="min-w-0">
            <p class="text-[11px] font-bold uppercase tracking-[0.12em] text-shevchenko-ink/70">
              {{ activeGroup ? 'Папка' : 'Выделенный раздел' }}
            </p>
            <h1 class="mt-0.5 text-lg font-extrabold text-shevchenko-ink sm:text-xl">
              {{ activeGroup ? activeGroup.title : 'Допматериалы' }}
            </h1>
          </div>
        </div>

        <div
          class="hidden h-11 w-px shrink-0 bg-shevchenko-ink/20 lg:block"
          aria-hidden="true"
        />

        <p class="min-w-0 flex-1 text-sm leading-relaxed text-shevchenko-brown">
          {{
            activeGroup
              ? activeGroup.subtitle
              : 'Лекции, дополнительные тренировки и отдельные материалы потока'
          }}
        </p>
      </div>
    </header>

    <button
      v-if="activeGroup"
      type="button"
      class="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-shevchenko-brown"
      @click="backFromGroup"
    >
      <FybIcon name="arrow-left" :size="16" color="#7A5230" />
      К допматериалам
    </button>

    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <component
        :is="isClickable(item) ? 'button' : 'div'"
        v-for="item in gridItems"
        :key="item.id"
        :type="isClickable(item) ? 'button' : undefined"
        class="overflow-hidden rounded-2xl bg-white text-left"
        :class="isClickable(item) ? 'transition-transform hover:-translate-y-0.5' : ''"
        @click="isClickable(item) ? openItem(item) : undefined"
      >
        <div class="relative h-[120px]">
          <img
            :src="item.cover"
            alt=""
            class="absolute inset-0 size-full object-cover object-top"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-shevchenko-ink/75 via-shevchenko-ink/25 to-transparent"
          />
          <p
            class="absolute bottom-3 left-3 right-3 text-base font-extrabold leading-snug text-white"
          >
            {{ item.title }}
          </p>
          <span
            v-if="item.type === 'group'"
            class="absolute right-3 top-3 rounded-full bg-shevchenko-gold px-2 py-0.5 text-[10px] font-bold text-white"
          >
            {{ item.children.length }} папки
          </span>
          <span
            v-else-if="item.type === 'file'"
            class="absolute right-3 top-3 rounded-full bg-shevchenko-ink px-2 py-0.5 text-[10px] font-bold text-white"
          >
            {{ item.kind || 'PDF' }}
          </span>
        </div>
        <div class="p-3.5">
          <p class="line-clamp-2 text-xs leading-relaxed text-shevchenko-brown">
            {{ item.subtitle }}
          </p>
          <p
            v-if="itemFooter(item)"
            class="mt-2 text-[11px] font-semibold text-shevchenko-accent"
          >
            {{ itemFooter(item) }}
          </p>
        </div>
      </component>
    </div>
  </div>
</template>
