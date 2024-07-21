<script setup lang="ts">
import DailySalesChart from '@/pages/dashboard/overview-page/components/DailySalesChart.vue'
import DailySalesSkuTable from '@/pages/dashboard/overview-page/components/DailySalesSkuTable.vue'
import { useSalesSkuListStore } from '@/stores'

const salesSkuListStore = useSalesSkuListStore()
</script>

<template>
  <div class="px-10 pb-16">
    <DailySalesChart />
    <template v-if="salesSkuListStore?.dailySalesSkuListData.item?.skuList">
      <div class="mt-20">
        <DailySalesSkuTable />
      </div>
    </template>
  </div>
</template>
