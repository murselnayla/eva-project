<script setup lang="ts">
import DashboardLayoutHeader from '@/layouts/components/DashboardLayoutHeader.vue'
import PageLoading from '@/components/PageLoading.vue'
</script>

<template>
  <div class="relative">
    <DashboardLayoutHeader />
    <router-view />
    <PageLoading />
  </div>
</template>

<style scoped></style>
