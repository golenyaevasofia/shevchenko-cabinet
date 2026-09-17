<script setup>
import { onMounted } from 'vue';
import CabinetShell from '@/Components/Shevchenko/Cabinet/CabinetShell.vue';

onMounted(() => {
  document.title = 'Feel Your Body · Личный кабинет';
});
</script>

<template>
  <CabinetShell />
</template>
