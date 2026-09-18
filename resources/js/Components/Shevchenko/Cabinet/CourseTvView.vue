<script setup>
import FybIcon from '@/Components/Shevchenko/Cabinet/FybIcon.vue';

defineProps({
  /** Внутри «Инструкция к курсу» — без отдельного page header */
  embedded: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="flex flex-col gap-5">
    <header
      v-if="!embedded"
      class="rounded-[24px] bg-white px-5 py-6 sm:px-7"
    >
      <p class="text-xs font-bold uppercase tracking-[0.08em] text-shevchenko-accent">
        Инструкция
      </p>
      <h1 class="mt-1 text-2xl font-extrabold text-shevchenko-ink sm:text-[28px]">
        Как вывести видео на телевизор
      </h1>
      <p class="mt-2 max-w-2xl text-sm leading-relaxed text-shevchenko-brown">
        Как включить видео на ТВ: Яндекс ТВ, умный телевизор, приставка
      </p>
    </header>

    <header
      v-else
      class="pt-1"
    >
      <p class="text-xs font-bold uppercase tracking-[0.08em] text-shevchenko-accent">
        Телевизор
      </p>
      <h2 class="mt-1 text-xl font-extrabold text-shevchenko-ink sm:text-2xl">
        Как вывести видео на телевизор
      </h2>
      <p class="mt-2 max-w-2xl text-sm leading-relaxed text-shevchenko-brown">
        Как включить видео на ТВ: Яндекс ТВ, умный телевизор, приставка
      </p>
    </header>

    <section class="rounded-[24px] bg-white p-5 sm:p-6">
      <ol class="space-y-3 text-sm leading-relaxed text-shevchenko-brown">
        <li class="flex gap-3">
          <span class="flex size-7 shrink-0 items-center justify-center rounded-full bg-shevchenko-gold text-xs font-bold text-white">1</span>
          <span>Включите умный телевизор или Яндекс (любую другую) приставку.</span>
        </li>
        <li class="flex gap-3">
          <span class="flex size-7 shrink-0 items-center justify-center rounded-full bg-shevchenko-gold text-xs font-bold text-white">2</span>
          <span>Зайдите в приложение и откройте браузер или скажите «Алиса, открой браузер».</span>
        </li>
        <li class="flex gap-3">
          <span class="flex size-7 shrink-0 items-center justify-center rounded-full bg-shevchenko-gold text-xs font-bold text-white">3</span>
          <span>В поиске вбейте «Feel Your Body PLATFORMAX.PRO».</span>
        </li>
        <li class="flex gap-3">
          <span class="flex size-7 shrink-0 items-center justify-center rounded-full bg-shevchenko-gold text-xs font-bold text-white">4</span>
          <span>Откройте сайт Feel Your Body PLATFORMAX.PRO.</span>
        </li>
        <li class="flex gap-3">
          <span class="flex size-7 shrink-0 items-center justify-center rounded-full bg-shevchenko-gold text-xs font-bold text-white">5</span>
          <span>Переведите курсор в правый верхний экран и нажмите на кнопку личный кабинет.</span>
        </li>
        <li class="flex gap-3">
          <span class="flex size-7 shrink-0 items-center justify-center rounded-full bg-shevchenko-gold text-xs font-bold text-white">6</span>
          <span>Авторизуйтесь на сайте и выберите курс.</span>
        </li>
        <li class="flex gap-3">
          <span class="flex size-7 shrink-0 items-center justify-center rounded-full bg-shevchenko-gold text-xs font-bold text-white">7</span>
          <span>Далее всё как на компьютере или телефоне — выбираете нужное видео и включаете его.</span>
        </li>
        <li class="flex gap-3">
          <span class="flex size-7 shrink-0 items-center justify-center rounded-full bg-shevchenko-gold text-xs font-bold text-white">8</span>
          <span>
            Если у вас умный телевизор, вы можете нажать на кнопку «назад» на пульте, затем нажать
            «Добавить на табло» — так при включении телевизора браузер с тренировками будет на главной странице.
          </span>
        </li>
      </ol>
    </section>

    <section class="rounded-[24px] bg-white p-5 sm:p-6">
      <div class="mb-3 flex items-center gap-3">
        <span class="flex size-10 items-center justify-center rounded-xl bg-shevchenko-sand">
          <FybIcon name="play" :size="16" color="#7A5230" />
        </span>
        <h2 class="text-lg font-bold text-shevchenko-ink">
          Трансляция с телефона или планшета
        </h2>
      </div>
      <p class="text-sm leading-relaxed text-shevchenko-brown">
        Также вы можете транслировать видео с телефона или планшета на телевизор, подключённый к той же Wi-Fi сети.
        Это удобно сделать с помощью встроенных функций AirPlay (для устройств Apple) и Chromecast (для Android и Chrome).
        Никаких дополнительных настроек — просто выбираете устройство и запускаете трансляцию.
      </p>
      <div class="mt-4 grid gap-3 sm:grid-cols-2">
        <a
          href="https://clck.ru/3M6Xp3"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-2xl bg-shevchenko-cream px-4 py-3 text-sm font-semibold text-shevchenko-ink hover:bg-shevchenko-sand"
        >
          Chromecast → инструкция
        </a>
        <a
          href="https://support.apple.com/ru-ru/102661"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-2xl bg-shevchenko-cream px-4 py-3 text-sm font-semibold text-shevchenko-ink hover:bg-shevchenko-sand"
        >
          AirPlay → инструкция
        </a>
      </div>
    </section>
  </div>
</template>
