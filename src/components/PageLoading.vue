<script setup lang="ts">
import { usePageLoadingStore } from '@/stores'

const pageLoadingStore = usePageLoadingStore()
</script>

<template>
  <div
    v-if="pageLoadingStore.loading"
    class="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-[9999]"
  >
    <div class="border-violet-100 h-20 w-20 animate-spin rounded-full border-8 border-t-violet-600" />
  </div>
</template>

<style scoped></style>
