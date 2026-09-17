export const AVATAR = 'images/shevchenko/avatar.png';
export const COURSE_COVER = 'images/shevchenko/course-cover.png';

/** Новые фотосессии для визуальных блоков кабинета */
export const PHOTOS = Object.freeze({
  stretch: 'images/shevchenko/photo-stretch.png',
  meditate: 'images/shevchenko/photo-meditate.png',
  kneel: 'images/shevchenko/photo-kneel.png',
  sky: 'images/shevchenko/photo-sky.png',
  arms: 'images/shevchenko/photo-arms.png',
});

export const school = Object.freeze({
  name: 'Feel Your Body',
  logoLetter: 'F',
});

export const user = Object.freeze({
  name: 'Мария Белова',
  role: 'Студент',
  phone: '+7 (707) 777 77 77',
  email: 'svet.plyasova@gmail.com',
  avatar: AVATAR,
});

export const course = Object.freeze({
  badge: 'ФЛАГМАНСКИЙ КУРС',
  brand: 'FEEL YOUR BODY',
  author: 'BY ЛЕРА ШЕВЧЕНКО',
  title: 'Feel Your Body',
  fullTitle: 'Клуб FEEL YOUR BODY (поток июль)',
  cover: COURSE_COVER,
  tariff: 'Доступ к клубу на 2 потока июль-август',
  accessUntil: '20.10.2026 23:59',
  progress: 0,
  sectionsCount: 5,
  lessonsCount: 32,
  telegramUrl: 'https://t.me/',
  chatMaxUrl: 'https://max.ru/',
  availableAfterPurchase: true,
});

/** Купленные курсы в попапе профиля; current — активный сейчас */
export const purchasedCourses = Object.freeze([
  {
    id: 'fyb',
    title: 'Feel Your Body',
    author: 'Лера Шевченко',
    cover: COURSE_COVER,
    current: true,
  },
]);

/** Главный экран курса — Информация о курсе */
export const courseInfo = Object.freeze({
  introTitle: 'Добро пожаловать в Feel Your Body',
  intro: [
    'Это флагманский курс Леры Шевченко о том, как заново почувствовать своё тело, выстроить привычку тренироваться и двигаться осознанно.',
    'Сразу после покупки вам доступны вводное видео, расписание, важные материалы и первые тренировки — ничего ждать не нужно.',
  ],
  videoTitle: 'Видео-вступление',
  videoPoster: PHOTOS.arms,
  videoCaption: 'Лера рассказывает, как устроен курс и с чего начать',
  telegramCta: 'Перейти в Telegram-канал',
  scheduleTitle: 'Расписание тренировок',
  scheduleCaption: 'Какая тренировка выходит в какой день недели',
});

/** Повторяющееся расписание выхода тренировок по дням недели (раздел «Информация о курсе») */
export const weeklySchedule = Object.freeze([
  {
    day: 'Пн',
    title: 'Растяжка и подвижность суставов',
    extra: 'Доп. тренировка на ягодицы и ноги',
  },
  { day: 'Вт', title: 'Спина и руки' },
  { day: 'Ср', title: 'Кардио фитбоксинг с Милой' },
  { day: 'Чт', title: 'Ягодицы и ноги' },
  { day: 'Пт', title: 'Мышцы живота' },
  { day: 'Сб', title: 'Нет тренировки', isRest: true },
  { day: 'Вс', title: 'Зарядка 10 минут' },
]);

/** Раздел «Инструкция к курсу» */
export const importantBlocks = Object.freeze([
  {
    id: 'equipment',
    type: 'equipment',
    title: 'Оборудование для тренировок',
    text: 'Достаточно коврика и удобной одежды. Опционально: резинки, блок для йоги, мяч для МФР.',
    showcase: [
      { id: 'mat', label: 'Коврик', image: 'images/shevchenko/equipment/mat.png' },
      { id: 'bands', label: 'Резинки', image: 'images/shevchenko/equipment/bands.png' },
      { id: 'block', label: 'Блок / мяч', image: 'images/shevchenko/equipment/ball.png' },
    ],
    items: [
      {
        label: 'Коврик',
        note: 'обязательно',
        url: 'https://www.wildberries.ru/catalog/0/search.aspx?search=%D0%BA%D0%BE%D0%B2%D1%80%D0%B8%D0%BA+%D0%B4%D0%BB%D1%8F+%D0%B9%D0%BE%D0%B3%D0%B8',
      },
      {
        label: 'Резинки',
        note: 'по желанию',
        url: 'https://www.wildberries.ru/catalog/0/search.aspx?search=%D1%84%D0%B8%D1%82%D0%BD%D0%B5%D1%81+%D1%80%D0%B5%D0%B7%D0%B8%D0%BD%D0%BA%D0%B8',
      },
      {
        label: 'Блок / мяч',
        note: 'для комфорта',
        url: 'https://www.wildberries.ru/catalog/0/search.aspx?search=%D0%B1%D0%BB%D0%BE%D0%BA+%D0%B4%D0%BB%D1%8F+%D0%B9%D0%BE%D0%B3%D0%B8+%D0%BC%D1%8F%D1%87+%D0%9C%D0%A4%D0%A0',
      },
    ],
  },
  {
    id: 'schemes',
    type: 'schemes',
    title: 'Схемы выполнения упражнений',
    text: 'Короткие визуальные схемы — как вставать в позицию, куда смотреть и на что опираться.',
    cards: [
      {
        id: 'stance',
        title: 'Базовая стойка',
        hint: 'Стопы · таз · рёбра',
        image: PHOTOS.stretch,
        popupTitle: 'Базовая стойка',
        popupText: [
          'Встаньте прямо, стопы на ширине таза, параллельно друг другу. Вес равномерно на обе ноги — не заваливайтесь на носки или пятки.',
          'Таз в нейтрали: мягко подкрутите копчик вниз, будто слегка «прячете» хвост. Рёбра не выпячивайте вперёд — опустите их к тазу.',
          'Колени мягкие, не заблокированы. Взгляд прямо перед собой, шея продолжение позвоночника. Дышите спокойно через нос.',
        ],
      },
      {
        id: 'shoulders',
        title: 'Лопатки и шея',
        hint: 'Без зажимов',
        image: PHOTOS.arms,
        popupTitle: 'Лопатки и шея',
        popupText: [
          'Плечи опустите вниз от ушей, лопатки мягко сведите и «разложите» по рёбрам — без жёсткого сведения.',
          'Подбородок чуть подтянут, затылок тянется вверх. Не запрокидывайте голову и не вжимайте подбородок в шею.',
          'Если чувствуете зажим в трапециях — сделайте выдох, опустите плечи ещё раз и продолжайте движение с длинной шеей.',
        ],
      },
      {
        id: 'breath',
        title: 'Дыхание',
        hint: 'Ритм 4–4',
        image: PHOTOS.meditate,
        popupTitle: 'Дыхание 4–4',
        popupText: [
          'Вдох на 4 счёта через нос — живот и нижние рёбра мягко расширяются. Не набирайте воздух только в грудь.',
          'Выдох на 4 счёта через нос или чуть приоткрытый рот — рёбра и живот спокойно сжимаются. Плечи остаются опущенными.',
          'Такой ритм помогает держать темп без задержек дыхания и снижает напряжение в шее. Если кружится голова — дышите свободнее, без натуги.',
        ],
      },
    ],
  },
  {
    id: 'motivation',
    type: 'video',
    title: 'Мотивационное видео',
    text: 'Когда сложно начать — короткое видео от Леры, чтобы вернуться в процесс.',
    videoPoster: PHOTOS.sky,
    videoCaption: '«Ты уже на пути»',
  },
]);

/** Папки внутри «Лекции» — структура как у раздела «Осанка» */
function makeExtrasFolder({
  id,
  title,
  subtitle,
  cover,
  description,
  benefit,
  lessons,
}) {
  return Object.freeze({
    id,
    title,
    subtitle: subtitle || title,
    cover,
    description,
    benefit,
    lessonsCount: lessons.length,
    lessons: Object.freeze(lessons),
  });
}

const lectureChildren = Object.freeze([
  makeExtrasFolder({
    id: 'pelvic',
    title: 'Тазовое дно',
    subtitle: 'Тазовое дно',
    cover: PHOTOS.meditate,
    description:
      'Мягкая и безопасная работа с мышцами тазового дна — чтобы чувствовать опору без зажимов и давления.',
    benefit:
      'Лучше контроль корпуса, комфорт в быту и понимание, как включать тазовое дно в повседневных движениях.',
    lessons: [
      { id: 'pelvic-1', title: 'Знакомство с тазовым дном', duration: '14 мин' },
      { id: 'pelvic-2', title: 'Дыхание и мягкая активация', duration: '16 мин' },
      { id: 'pelvic-3', title: 'Практика на каждый день', duration: '12 мин' },
    ],
  }),
  makeExtrasFolder({
    id: 'daily',
    title: 'Зарядки на каждый день',
    subtitle: 'Зарядки на каждый день',
    cover: PHOTOS.stretch,
    description:
      'Короткие зарядки, которые можно встроить в утро или паузу в течение дня — без сложного оборудования.',
    benefit:
      'Регулярное движение без перегруза: тело «просыпается», меньше скованности и проще держать привычку.',
    lessons: [
      { id: 'daily-1', title: 'Утренняя активация', duration: '10 мин' },
      { id: 'daily-2', title: 'Разминка для офиса', duration: '8 мин' },
      { id: 'daily-3', title: 'Вечернее расслабление', duration: '12 мин' },
    ],
  }),
  makeExtrasFolder({
    id: 'posture-extra',
    title: 'Тренировки для осанки',
    subtitle: 'Тренировки для осанки, мобильность, дыхание',
    cover: PHOTOS.kneel,
    description:
      'Выстроить опору и мягкую линию спины без зажимов в шее и пояснице — через мобильность и дыхание.',
    benefit:
      'Чувство «собранного» корпуса, меньше усталости к вечеру и более уверенная походка.',
    lessons: [
      { id: 'posture-e1', title: 'Диагностика осанки', duration: '12 мин' },
      { id: 'posture-e2', title: 'Лопатки и грудной отдел', duration: '18 мин' },
      { id: 'posture-e3', title: 'Шея без напряжения', duration: '15 мин' },
      { id: 'posture-e4', title: 'Дыхание и линия спины', duration: '14 мин' },
    ],
  }),
  makeExtrasFolder({
    id: 'back-arms-glutes',
    title: 'Спина, руки, ягодицы',
    subtitle: 'Спина, руки, ягодицы',
    cover: PHOTOS.arms,
    description:
      'Силовые и тонусные практики на спину, руки и ягодицы — аккуратно, с акцентом на контроль, а не на вес.',
    benefit:
      'Тонус, устойчивость и понимание, как собирать корпус в базовых движениях.',
    lessons: [
      { id: 'bag-1', title: 'Спина: опора и длина', duration: '20 мин' },
      { id: 'bag-2', title: 'Руки без перегруза плеч', duration: '16 мин' },
      { id: 'bag-3', title: 'Ягодицы и задняя цепь', duration: '18 мин' },
    ],
  }),
]);

/**
 * Допматериалы: сверху папка «Лекции», внутри — тематические папки
 * («Для новичков» намеренно снаружи).
 */
export const extrasFolders = Object.freeze([
  {
    id: 'lectures',
    title: 'Лекции, дополнительные тренировки',
    subtitle: 'Дополнительные тренировки и лекции',
    cover: PHOTOS.kneel,
    type: 'group',
    children: lectureChildren,
  },
  {
    id: 'rations',
    title: 'Сборник рационов',
    subtitle: 'PDF · подборка рационов к потоку',
    cover: PHOTOS.sky,
    type: 'file',
    kind: 'PDF',
    fileType: 'pdf',
    note: 'Файл для скачивания и просмотра — без видеоуроков',
    fileUrl: null,
  },
  makeExtrasFolder({
    id: 'pre-stream',
    title: 'Тренировки до начала потока',
    subtitle: 'Тренировки до начала потока',
    cover: PHOTOS.stretch,
    description: 'Мягкий вход до старта основного расписания — чтобы тело привыкло к ритму.',
    benefit: 'Спокойный старт без гонки: уже есть контакт с телом к дню 1.',
    lessons: [
      { id: 'pre-1', title: 'Вводная практика', duration: '15 мин' },
      { id: 'pre-2', title: 'Мобильность до потока', duration: '12 мин' },
    ],
  }),
  makeExtrasFolder({
    id: 'beginners',
    title: 'Для новичков',
    subtitle: 'Информация для новичков',
    cover: PHOTOS.meditate,
    description: 'База для тех, кто только заходит в клуб: как заниматься, как дышать, чего избегать.',
    benefit: 'Понятный старт и меньше тревоги в первые тренировки.',
    lessons: [
      { id: 'beg-1', title: 'С чего начать', duration: '10 мин' },
      { id: 'beg-2', title: 'Частые ошибки', duration: '12 мин' },
    ],
  }),
  makeExtrasFolder({
    id: 'nutrition-lectures',
    title: 'Лекции про питание',
    subtitle: 'Лекции про питание',
    cover: PHOTOS.arms,
    description: 'Короткие лекции про питание в контексте движения и восстановления.',
    benefit: 'Понимание, как еда влияет на самочувствие и тренировочный тонус.',
    lessons: [
      { id: 'nut-1', title: 'Энергия и тренировки', duration: '14 мин' },
      { id: 'nut-2', title: 'Простые привычки', duration: '12 мин' },
    ],
  }),
]);

/** Плоский список видео-папок (для поиска / избранного) */
export const folders = Object.freeze([
  ...lectureChildren,
  ...extrasFolders.filter((f) => f.type !== 'group' && f.type !== 'file'),
]);

/** Допматериалы — файлы */
export const extras = Object.freeze([
  {
    id: 'rations',
    title: 'Сборник рационов',
    kind: 'PDF',
    fileType: 'pdf',
    note: 'Подборка рационов к потоку',
    cover: PHOTOS.sky,
    fileUrl: null,
  },
  {
    id: 'pdf-breath',
    title: 'Гайд по дыханию',
    kind: 'PDF',
    fileType: 'pdf',
    note: 'Короткая памятка на каждый день',
    cover: PHOTOS.meditate,
    fileUrl: null,
  },
  {
    id: 'audio-relax',
    title: 'Аудио: расслабление после тренировки',
    kind: 'Аудио',
    fileType: 'audio',
    note: '10 минут · можно с закрытыми глазами',
    cover: PHOTOS.arms,
    fileUrl: null,
  },
]);

/** Навигация курса в сайдбаре */
export const courseNav = Object.freeze([
  { id: 'info', label: 'Информация о курсе', icon: 'book', highlight: false },
  { id: 'materials', label: 'Материалы курса', icon: 'play-circle', highlight: false },
  { id: 'important', label: 'Инструкция к курсу', icon: 'bell', highlight: false },
  { id: 'extras', label: 'Допматериалы', icon: 'notebook', highlight: true },
  { id: 'favourites', label: 'Избранное', icon: 'heart', highlight: false },
]);

const COVER_CYCLE = [PHOTOS.arms, PHOTOS.sky, PHOTOS.kneel, PHOTOS.stretch, PHOTOS.meditate];

function coverAt(i) {
  return COVER_CYCLE[i % COVER_CYCLE.length];
}

/** Склонение «N урок/урока/уроков» */
export function lessonsLabel(count) {
  const n = Number(count) || 0;
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return `${n} уроков`;
  if (mod10 === 1) return `${n} урок`;
  if (mod10 >= 2 && mod10 <= 4) return `${n} урока`;
  return `${n} уроков`;
}

function makeDay({
  id,
  weekId,
  dayIndex,
  title,
  dateLabel,
  dateNum,
  month,
  lessonsCount,
  lessons = [],
  heroTitle,
  heroSubtitle,
  focus,
  kind = 'day',
}) {
  const lessonItems = (lessons.length
    ? lessons
    : Array.from({ length: lessonsCount }, (_, i) => `Урок ${i + 1}`)
  ).map((lessonTitle, i) => ({
    id: `${id}-l${i + 1}`,
    title: lessonTitle,
    cover: coverAt(dayIndex + i),
  }));

  return {
    id,
    weekId,
    name: title,
    short: title.includes(',') ? title.split(',')[0].trim() : title,
    title,
    date: dateLabel,
    dateNum,
    month,
    today: false,
    lessonsCount: lessonItems.length || lessonsCount,
    lessonsLabel: lessonsLabel(lessonItems.length || lessonsCount),
    lessons: lessonItems,
    cover: coverAt(dayIndex),
    heroTitle: heroTitle || title,
    heroSubtitle: heroSubtitle || lessonsLabel(lessonItems.length || lessonsCount),
    focus: focus || lessonsLabel(lessonItems.length || lessonsCount),
    kind,
  };
}

/**
 * Поток июль: 4 недели + заключительный день
 * (количества глав/уроков — как в боевом ЛК)
 */
export const courseWeeks = Object.freeze([
  {
    id: 'w1',
    label: 'Неделя 13.07-19.07',
    range: '13.07-19.07',
    chaptersCount: 6,
    lessonsCount: 8,
    progress: 0,
    meta: '6 глав · 8 уроков',
    days: [
      makeDay({
        id: 'w1d1', weekId: 'w1', dayIndex: 0,
        title: 'День 1, 13.07', dateLabel: '13 июля', dateNum: 13, month: 7,
        lessonsCount: 3, heroTitle: 'День 1', heroSubtitle: 'Старт недели · 3 урока', focus: 'Старт',
        lessons: ['Знакомство с клубом', 'Диагностика тела', 'Мягкая активация'],
      }),
      makeDay({
        id: 'w1d2', weekId: 'w1', dayIndex: 1,
        title: 'День 2, 14.07', dateLabel: '14 июля', dateNum: 14, month: 7,
        lessonsCount: 1, heroTitle: 'День 2', focus: 'Практика',
        lessons: ['Опора и дыхание'],
      }),
      makeDay({
        id: 'w1d3', weekId: 'w1', dayIndex: 2,
        title: 'День 3, 15.07', dateLabel: '15 июля', dateNum: 15, month: 7,
        lessonsCount: 1, heroTitle: 'День 3', focus: 'Практика',
        lessons: ['Линия спины'],
      }),
      makeDay({
        id: 'w1d4', weekId: 'w1', dayIndex: 3,
        title: 'День 4, 16.07', dateLabel: '16 июля', dateNum: 16, month: 7,
        lessonsCount: 1, heroTitle: 'День 4', focus: 'Практика',
        lessons: ['Мобильность таза'],
      }),
      makeDay({
        id: 'w1d5', weekId: 'w1', dayIndex: 4,
        title: 'День 5, 17.07', dateLabel: '17 июля', dateNum: 17, month: 7,
        lessonsCount: 1, heroTitle: 'День 5', focus: 'Практика',
        lessons: ['Сила корпуса'],
      }),
      makeDay({
        id: 'w1d6', weekId: 'w1', dayIndex: 5,
        title: 'День 6, 19.07', dateLabel: '19 июля', dateNum: 19, month: 7,
        lessonsCount: 1, heroTitle: 'День 6', focus: 'Практика',
        lessons: ['Восстановление недели'],
      }),
    ],
  },
  {
    id: 'w2',
    label: 'Неделя 20.07-26.07',
    range: '20.07-26.07',
    chaptersCount: 6,
    lessonsCount: 7,
    progress: 0,
    meta: '6 глав · 7 уроков',
    days: [
      makeDay({
        id: 'w2d1', weekId: 'w2', dayIndex: 1,
        title: 'День 1, 20.07', dateLabel: '20 июля', dateNum: 20, month: 7,
        lessonsCount: 2, heroTitle: 'День 1', focus: 'Старт',
        lessons: ['Разбор недели', 'Силовая практика'],
      }),
      makeDay({
        id: 'w2d2', weekId: 'w2', dayIndex: 2,
        title: 'День 2, 21.07', dateLabel: '21 июля', dateNum: 21, month: 7,
        lessonsCount: 1, heroTitle: 'День 2', focus: 'Практика',
        lessons: ['Ягодицы и задняя поверхность'],
      }),
      makeDay({
        id: 'w2d3', weekId: 'w2', dayIndex: 3,
        title: 'День 3, 22.07', dateLabel: '22 июля', dateNum: 22, month: 7,
        lessonsCount: 1, heroTitle: 'День 3', focus: 'Практика',
        lessons: ['Плечевой пояс'],
      }),
      makeDay({
        id: 'w2d4', weekId: 'w2', dayIndex: 4,
        title: 'День 4, 23.07', dateLabel: '23 июля', dateNum: 23, month: 7,
        lessonsCount: 1, heroTitle: 'День 4', focus: 'Практика',
        lessons: ['Баланс и устойчивость'],
      }),
      makeDay({
        id: 'w2d5', weekId: 'w2', dayIndex: 5,
        title: 'День 5, 24.07', dateLabel: '24 июля', dateNum: 24, month: 7,
        lessonsCount: 1, heroTitle: 'День 5', focus: 'Практика',
        lessons: ['Глубокий кор'],
      }),
      makeDay({
        id: 'w2d6', weekId: 'w2', dayIndex: 0,
        title: 'День 6, 26.07', dateLabel: '26 июля', dateNum: 26, month: 7,
        lessonsCount: 1, heroTitle: 'День 6', focus: 'Практика',
        lessons: ['Мягкое закрытие недели'],
      }),
    ],
  },
  {
    id: 'w3',
    label: 'Неделя 27.07-2.08',
    range: '27.07-2.08',
    chaptersCount: 6,
    lessonsCount: 7,
    progress: 0,
    meta: '6 глав · 7 уроков',
    days: [
      makeDay({
        id: 'w3d1', weekId: 'w3', dayIndex: 2,
        title: 'День 1, 27.07', dateLabel: '27 июля', dateNum: 27, month: 7,
        lessonsCount: 2, heroTitle: 'День 1', focus: 'Старт',
        lessons: ['Фокус недели', 'Осанка в движении'],
      }),
      makeDay({
        id: 'w3d2', weekId: 'w3', dayIndex: 3,
        title: 'День 2, 28.07', dateLabel: '28 июля', dateNum: 28, month: 7,
        lessonsCount: 1, heroTitle: 'День 2', focus: 'Практика',
        lessons: ['Мобильность груди'],
      }),
      makeDay({
        id: 'w3d3', weekId: 'w3', dayIndex: 4,
        title: 'День 3, 29.07', dateLabel: '29 июля', dateNum: 29, month: 7,
        lessonsCount: 1, heroTitle: 'День 3', focus: 'Практика',
        lessons: ['Ноги без перегруза'],
      }),
      makeDay({
        id: 'w3d4', weekId: 'w3', dayIndex: 5,
        title: 'День 4, 30.07', dateLabel: '30 июля', dateNum: 30, month: 7,
        lessonsCount: 1, heroTitle: 'День 4', focus: 'Практика',
        lessons: ['Шея и лопатки'],
      }),
      makeDay({
        id: 'w3d5', weekId: 'w3', dayIndex: 0,
        title: 'День 5, 31.07', dateLabel: '31 июля', dateNum: 31, month: 7,
        lessonsCount: 1, heroTitle: 'День 5', focus: 'Практика',
        lessons: ['Сила + контроль'],
      }),
      makeDay({
        id: 'w3d6', weekId: 'w3', dayIndex: 1,
        title: 'День 6, 2.08', dateLabel: '2 августа', dateNum: 2, month: 8,
        lessonsCount: 1, heroTitle: 'День 6', focus: 'Практика',
        lessons: ['Восстановление и мобильность'],
      }),
    ],
  },
  {
    id: 'w4',
    label: 'Неделя 3.08-9.08',
    range: '3.08-9.08',
    chaptersCount: 6,
    lessonsCount: 8,
    progress: 0,
    meta: '6 глав · 8 уроков',
    days: [
      makeDay({
        id: 'w4d1', weekId: 'w4', dayIndex: 3,
        title: 'День 1, 3.08', dateLabel: '3 августа', dateNum: 3, month: 8,
        lessonsCount: 2, heroTitle: 'День 1', focus: 'Старт',
        lessons: ['Старт финальной недели', 'Сборка техники'],
      }),
      makeDay({
        id: 'w4d2', weekId: 'w4', dayIndex: 4,
        title: 'День 2, 4.08', dateLabel: '4 августа', dateNum: 4, month: 8,
        lessonsCount: 2, heroTitle: 'День 2', focus: 'Практика',
        lessons: ['Силовая сессия', 'Работа с дыханием'],
      }),
      makeDay({
        id: 'w4d3', weekId: 'w4', dayIndex: 5,
        title: 'День 3, 5.08', dateLabel: '5 августа', dateNum: 5, month: 8,
        lessonsCount: 1, heroTitle: 'День 3', focus: 'Практика',
        lessons: ['Полная практика тела'],
      }),
      makeDay({
        id: 'w4d4', weekId: 'w4', dayIndex: 0,
        title: 'День 4, 6.08', dateLabel: '6 августа', dateNum: 6, month: 8,
        lessonsCount: 1, heroTitle: 'День 4', focus: 'Практика',
        lessons: ['Мягкая сила'],
      }),
      makeDay({
        id: 'w4d5', weekId: 'w4', dayIndex: 1,
        title: 'День 5, 7.08', dateLabel: '7 августа', dateNum: 7, month: 8,
        lessonsCount: 1, heroTitle: 'День 5', focus: 'Практика',
        lessons: ['Осанка и уверенность'],
      }),
      makeDay({
        id: 'w4d6', weekId: 'w4', dayIndex: 2,
        title: 'День 6, 9.08', dateLabel: '9 августа', dateNum: 9, month: 8,
        lessonsCount: 1, heroTitle: 'День 6', focus: 'Практика',
        lessons: ['Итоги недели'],
      }),
    ],
  },
  {
    id: 'finale',
    label: 'Заключительный день',
    range: '10.08',
    chaptersCount: 1,
    lessonsCount: 2,
    progress: 0,
    meta: '1 глава · 2 урока',
    isFinale: true,
    days: [
      makeDay({
        id: 'f1', weekId: 'finale', dayIndex: 0,
        title: '10.08', dateLabel: '10 августа', dateNum: 10, month: 8,
        lessonsCount: 2, heroTitle: '10.08', heroSubtitle: 'Заключительный день', focus: 'Финал',
        lessons: ['Итоговая практика', 'Рефлексия потока'],
      }),
      makeDay({
        id: 'f2', weekId: 'finale', dayIndex: 1,
        title: 'Заключительное видео поток июль', dateLabel: '10 августа', dateNum: 10, month: 8,
        lessonsCount: 1, heroTitle: 'Заключительное видео',
        heroSubtitle: 'Поток июль', focus: 'Урок', kind: 'lesson',
        lessons: ['Заключительное видео поток июль'],
      }),
      makeDay({
        id: 'f3', weekId: 'finale', dayIndex: 2,
        title: 'Продление доступа', dateLabel: '10 августа', dateNum: 10, month: 8,
        lessonsCount: 1, heroTitle: 'Продление доступа',
        heroSubtitle: 'Информация о продлении', focus: 'Урок', kind: 'lesson',
        lessons: ['Продление доступа'],
      }),
    ],
  },
]);

/** Все дни потока (для календаря и быстрого поиска) */
export const days = Object.freeze(courseWeeks.flatMap((w) => w.days));

/** Активная неделя по умолчанию — первая */
export const week = Object.freeze({
  label: courseWeeks[0].label,
  meta: courseWeeks[0].meta,
  progress: courseWeeks[0].progress,
});

export const dayFilters = Object.freeze([
  { id: 'all', label: 'Все' },
  ...courseWeeks[0].days.map((d) => ({ id: d.id, label: d.title })),
]);
