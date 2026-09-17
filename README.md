# Feel Your Body — личный кабинет (Шевченко)

Личный кабинет для флагманского курса «Feel Your Body» Леры Шевченко: информация о курсе, расписание тренировок по неделям, материалы, инструкция, допматериалы, избранное.

Дизайн — бежевая тема по Figma-макету. Стек: Vue 3 (Composition API, `<script setup>`), Tailwind CSS v4.

## Запуск

```bash
npm install
npm run dev
```

Откроется на `http://localhost:5173`.

Сборка:

```bash
npm run build
```

## Структура

- `resources/js/Pages/Shevchenko/Cabinet/CabinetPage.vue` — точка входа страницы
- `resources/js/Components/Shevchenko/Cabinet/` — все компоненты кабинета (сайдбар, разделы, попапы расписания, видео-плеер и т.д.)
- `resources/js/Components/Shevchenko/Cabinet/cabinetData.js` — мок-данные курса (недели, дни, уроки, допматериалы)
- `resources/css/themes/shevchenko.css` — тема (цвета, скроллбар, градиенты)
- `public/images/shevchenko/` — фото и иконки

Компонент самодостаточен: не зависит от Inertia/Laravel — исходно кабинет рендерился как Inertia-страница внутри более крупного Laravel-приложения, здесь вынесен в отдельный Vite-проект с моковыми данными вместо API.
