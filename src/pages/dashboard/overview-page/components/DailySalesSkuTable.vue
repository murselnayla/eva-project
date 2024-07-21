<script setup lang="ts">
import { useSalesSkuListStore } from '@/stores'
import { convertBaseDateFormat, getDayNameByDate } from '@/core/utils'
import { computed } from 'vue'
import { useSkuTable } from '@/composables'
import DailySalesSkuTablePagination from '@/pages/dashboard/overview-page/components/DailySalesSkuTablePagination.vue'

const salesSkuListStore = useSalesSkuListStore()
const getDailySalesItem = computed(() => salesSkuListStore.dailySalesSkuListData?.item)
const { currentPageItems, tableCurrency, selectedLastDay } = useSkuTable()
</script>

<template>
  <div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="bg-white">
          <tr>
            <th>SKU</th>
            <th>Product Name</th>
            <th v-if="getDailySalesItem?.selectedDate2" class="min-w-[200px] text-right">
              {{ getDayNameByDate(getDailySalesItem.selectedDate2) }}<br />
              {{ convertBaseDateFormat(getDailySalesItem?.selectedDate2) }}<br />
              Sales / Units<br />
              Avg. Selling Price
            </th>
            <th class="min-w-[180px] text-right">
              {{ getDayNameByDate(getDailySalesItem?.selectedDate) }}<br />
              {{ convertBaseDateFormat(getDailySalesItem?.selectedDate) }}<br />
              Sales / Units<br />
              Avg. Selling Price
            </th>
            <th class="min-w-[160px] text-right">
              <span>Sku Refund Rate</span><br />
              <small>(Last {{ selectedLastDay }} days)</small>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(skuItem, index) in currentPageItems" :key="index">
            <tr class="odd:bg-gray-100 even:bg-white">
              <td>{{ skuItem.sku }}</td>
              <td>{{ skuItem.productName }}</td>
              <td v-if="getDailySalesItem?.selectedDate2" class="text-right">
                {{ tableCurrency }}{{ skuItem.amount2 }} / {{ skuItem.qty2 }}<br />
                {{ tableCurrency }}{{ (skuItem.amount2 / skuItem.qty2).toFixed(2) }}<br />
              </td>
              <td class="text-right">
                {{ tableCurrency }}{{ skuItem.amount }} / {{ skuItem.qty }}<br />
                {{ tableCurrency }}{{ (skuItem.amount / skuItem.qty).toFixed(2) }}<br />
              </td>
              <td class="text-right">{{ salesSkuListStore.skuRefundRate?.[index]?.refundRate }}%</td>
            </tr>
          </template>
        </tbody>
      </table>
      <div v-if="!currentPageItems.length">
        <div class="flex justify-center items-center py-4 text-gray-500 h-[150px]">No items available in table</div>
      </div>
    </div>
    <div v-if="currentPageItems.length > 0" class="flex items-center justify-end gap-2 mt-8">
      <DailySalesSkuTablePagination />
    </div>
  </div>
</template>

<style lang="scss" scoped>
table {
  thead {
    th {
      @apply font-normal px-6 py-4;
    }
  }

  tbody {
    td {
      @apply px-6 py-4;
    }
  }
}
</style>
