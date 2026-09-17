import { computed, inject, provide, ref, watch } from 'vue';
import {
  days,
  extras,
  folders,
  PHOTOS,
} from '@/Components/Shevchenko/Cabinet/cabinetData';

const CABINET_UI_KEY = 'shevchenko-cabinet-ui';
const FAV_STORAGE_KEY = 'shevchenko-cabinet-favorites';

function buildCatalog() {
  const items = [
    {
      id: 'intro',
      title: 'Видео-вступление',
      meta: 'Информация о курсе',
      cover: PHOTOS.arms,
      section: 'info',
    },
    {
      id: 'motivation',
      title: 'Мотивационное видео',
      meta: 'Важное · «Ты уже на пути»',
      cover: PHOTOS.sky,
      section: 'important',
    },
  ];

  folders.forEach((folder) => {
    folder.lessons.forEach((lesson) => {
      items.push({
        id: lesson.id,
        title: lesson.title,
        meta: `Раздел «${folder.title}» · ${lesson.duration}`,
        cover: folder.cover,
        section: 'materials',
        folderId: folder.id,
      });
    });
  });

  days.forEach((day) => {
    const dayLessons = day.lessons?.length
      ? day.lessons
      : [{ id: `day-${day.id}`, title: day.heroTitle }];
    dayLessons.forEach((lesson, idx) => {
      items.push({
        id: lesson.id || `day-${day.id}-l${idx + 1}`,
        title: lesson.title,
        meta: `${day.title || day.short} · ${day.date}${dayLessons.length > 1 ? ` · урок ${idx + 1}` : ''}`,
        cover: day.cover,
        section: 'materials',
        dayId: day.id,
      });
    });
  });

  extras.forEach((item) => {
    items.push({
      id: item.id,
      title: item.title,
      meta: `Допматериалы · ${item.kind}`,
      cover: item.cover,
      section: 'extras',
      type: 'file',
      kind: item.kind,
      fileType: item.fileType,
      note: item.note,
      fileUrl: item.fileUrl,
    });
  });

  return Object.freeze(items);
}

export const videoCatalog = buildCatalog();

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAV_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function provideCabinetUi() {
  const favoriteIds = ref(loadFavorites());
  const activeVideo = ref(null);
  const activeFile = ref(null);
  const calendarOpen = ref(false);
  const searchQuery = ref('');
  /** День для открытия в «Материалы» (превью уроков) */
  const materialsDayToOpen = ref(null);

  watch(
    favoriteIds,
    (ids) => {
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(ids));
    },
    { deep: true },
  );

  const favorites = computed(() =>
    favoriteIds.value
      .map((id) => videoCatalog.find((item) => item.id === id))
      .filter(Boolean),
  );

  function isFavorite(id) {
    return favoriteIds.value.includes(id);
  }

  function toggleFavorite(id) {
    if (!id) return;
    if (favoriteIds.value.includes(id)) {
      favoriteIds.value = favoriteIds.value.filter((item) => item !== id);
    } else {
      favoriteIds.value = [...favoriteIds.value, id];
    }
  }

  function openFile(payload) {
    if (!payload) return;
    const fromCatalog = typeof payload === 'string'
      ? videoCatalog.find((item) => item.id === payload)
      : null;
    const source = fromCatalog || payload;
    const fromExtras = extras.find((item) => item.id === source.id);
    activeFile.value = {
      id: source.id,
      title: source.title,
      kind: source.kind || fromExtras?.kind || 'Файл',
      fileType: source.fileType || fromExtras?.fileType || 'pdf',
      note: source.note || fromExtras?.note || source.meta || '',
      cover: source.cover || fromExtras?.cover,
      fileUrl: source.fileUrl ?? fromExtras?.fileUrl ?? null,
    };
    activeVideo.value = null;
  }

  function closeFile() {
    activeFile.value = null;
  }

  function openVideo(payload) {
    if (!payload) return;
    const fromCatalog = typeof payload === 'string'
      ? videoCatalog.find((item) => item.id === payload)
      : null;
    const item = fromCatalog || payload;
    if (item?.type === 'file' || item?.section === 'extras' || extras.some((e) => e.id === item.id)) {
      openFile(item);
      return;
    }
    activeVideo.value = fromCatalog || {
      id: payload.id,
      title: payload.title,
      meta: payload.meta || '',
      cover: payload.cover,
    };
    activeFile.value = null;
  }

  function closeVideo() {
    activeVideo.value = null;
  }

  function openCalendar() {
    calendarOpen.value = true;
  }

  function closeCalendar() {
    calendarOpen.value = false;
  }

  function openMaterialsDay(day) {
    if (!day) return;
    materialsDayToOpen.value = day;
    calendarOpen.value = false;
    activeVideo.value = null;
  }

  function clearMaterialsDayRequest() {
    materialsDayToOpen.value = null;
  }

  function searchVideos(query) {
    const q = String(query || '').trim().toLowerCase();
    if (q.length < 2) return [];
    return videoCatalog.filter(
      (item) =>
        item.title.toLowerCase().includes(q)
        || item.meta.toLowerCase().includes(q),
    );
  }

  const api = {
    favoriteIds,
    favorites,
    isFavorite,
    toggleFavorite,
    activeVideo,
    openVideo,
    closeVideo,
    activeFile,
    openFile,
    closeFile,
    calendarOpen,
    openCalendar,
    closeCalendar,
    materialsDayToOpen,
    openMaterialsDay,
    clearMaterialsDayRequest,
    searchQuery,
    searchVideos,
    catalog: videoCatalog,
  };

  provide(CABINET_UI_KEY, api);
  return api;
}

export function useCabinetUi() {
  const api = inject(CABINET_UI_KEY, null);
  if (!api) {
    throw new Error('useCabinetUi() must be used inside CabinetShell');
  }
  return api;
}
