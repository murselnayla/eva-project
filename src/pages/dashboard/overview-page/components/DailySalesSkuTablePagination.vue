<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useSkuTable } from '@/composables'

const { totalPages, pageNumber, disabledPrevBtn, disabledNextBtn, onClickPrev, onClickNext, setPage } = useSkuTable()
</script>

<template>
  <div class="flex items-center justify-end gap-2">
    <button @click="onClickPrev()" :disabled="disabledPrevBtn" class="pagination-btn" type="button">
      <Icon icon="material-symbols:chevron-left-rounded" height="20" />
    </button>

    <template v-for="(page, index) in totalPages" :key="index">
      <button
        @click="setPage(page)"
        type="button"
        class="pagination-btn"
        :class="{ 'bg-violet-400': pageNumber === page }"
      >
        {{ page }}
      </button>
    </template>

    <button @click="onClickNext()" :disabled="disabledNextBtn" class="pagination-btn" type="button">
      <Icon icon="material-symbols:chevron-right-rounded" height="20" />
    </button>
  </div>
</template>

<style scoped>
.pagination-btn {
  @apply relative h-10 w-10 rounded-full inline-flex justify-center items-center text-xs font-medium text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none;
}
</style>
