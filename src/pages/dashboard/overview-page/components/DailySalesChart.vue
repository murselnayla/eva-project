<style scoped></style>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { useAuthStore, useSalesAnalyticStore, useSalesSkuListStore } from '@/stores'
import type {
  DailySalesOverviewDay,
  DailySalesOverviewReqDto,
  DailySalesSkuListReqDto,
  SkuRefundRateReqDto
} from '@/core/dtos'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const salesAnalyticStore = useSalesAnalyticStore()
const salesSkuListStore = useSalesSkuListStore()
const toast = useToast()
const isLoading = ref(false)

onMounted(async () => {
  await fetchDailySalesOverview(salesAnalyticStore.selectedLastDay)
})

const fetchDailySalesOverview = async (day: DailySalesOverviewDay) => {
  salesSkuListStore.resetState()

  isLoading.value = true
  const body: DailySalesOverviewReqDto = {
    marketplace: authStore.getMarketplace,
    sellerId: authStore.getSellerId,
    requestStatus: 0,
    day: day,
    excludeYoYData: true
  }
  try {
    await salesAnalyticStore.fetchDailySalesOverview(body)
  } catch (err: any) {
    toast.error(err.message)
  } finally {
    isLoading.value = false
  }
}

const onChangeChartSelect = async (selectedPoints: any[]) => {
  if (selectedPoints.length === 0) {
    salesSkuListStore.resetState()
    return
  }
  // isLoading.value = true
  const body: DailySalesSkuListReqDto = {
    marketplace: authStore.getMarketplace,
    sellerId: authStore.getSellerId,
    salesDate: selectedPoints[0].salesDate,
    ...(selectedPoints.length === 2 && { salesDate2: selectedPoints[1].salesDate }),
    pageSize: 10,
    pageNumber: 1,
    isDaysCompare: selectedPoints.length - 1
  }

  try {
    await salesSkuListStore.fetchDailySalesSkuList(body)
    await fetchSkuRefundRate()
  } catch (err: any) {
    toast.error(err.message)
  } finally {
    isLoading.value = false
  }
}

const fetchSkuRefundRate = async () => {
  // isLoading.value = true
  const body: SkuRefundRateReqDto = {
    marketplace: authStore.getMarketplace,
    sellerId: authStore.getSellerId,
    requestedDay: salesAnalyticStore.selectedLastDay,
    skuList: salesSkuListStore.getSkuList.map((item) => item.sku)
  }

  try {
    await salesSkuListStore.fetchSkuRefundRate(body)
  } catch (err: any) {
    toast.error(err.message)
  } finally {
    isLoading.value = false
  }
}

const chartOptions = computed(() => ({
  chart: {
    type: 'column'
  },
  title: {
    text: 'Daily Sales',
    align: 'center'
  },
  xAxis: {
    categories: salesAnalyticStore.getChartCategories,
    labels: {
      rotation: -50
    },
    crosshair: true
  },
  yAxis: {
    allowDecimals: true,
    lineColor: 'black',
    min: 0,
    title: {
      text: `Amount (${salesAnalyticStore.chartCurrency})`
    }
  },
  tooltip: {
    shared: true,
    formatter: function (this: Highcharts.TooltipFormatterContextObject): string {
      return `${salesAnalyticStore.getChartTooltipData(this.point.index)}`
    }
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      states: {
        select: {
          color: 'red'
        }
      },
      slicedOffset: 0,
      point: {
        events: {
          click: function (event: any) {
            const chart = this.series.chart
            this.selectedTime = Date.now()
            event.point.select(null, true)

            const selectedPoints = chart.getSelectedPoints()
            if (selectedPoints.length > 2) {
              selectedPoints.sort((a: any, b: any) => a.selectedTime - b.selectedTime)
              selectedPoints[0].select(false, true)
            }

            salesAnalyticStore.chartsSelectedPoints = chart.getSelectedPoints()
            onChangeChartSelect(salesAnalyticStore.chartsSelectedPoints)
          }
        }
      }
    },
    series: {
      dataLabels: {
        enabled: true,
        color: '#fff',
        style: { fontWeight: 'thin' },
        inside: true,
        crop: true,
        rotation: -90
      }
    }
  },
  series: [
    {
      name: 'Profit',
      data: salesAnalyticStore.chartProfitSeries.map((value, index) => ({
        y: value,
        salesDate: salesAnalyticStore.chartCategoryDates[index]
      }))
    },
    {
      name: 'FBA Sales',
      data: salesAnalyticStore.chartFbmAmountSeries.map((value, index) => ({
        y: value,
        salesDate: salesAnalyticStore.chartCategoryDates[index]
      }))
    },
    {
      name: 'FBM Sales',
      data: salesAnalyticStore.chartFbaAmountSeries.map((value, index) => ({
        y: value,
        salesDate: salesAnalyticStore.chartCategoryDates[index]
      }))
    }
  ]
})) as Highcharts.Options
</script>

<template>
  <div>
    <select
      v-model="salesAnalyticStore.selectedLastDay"
      @change="fetchDailySalesOverview(salesAnalyticStore.selectedLastDay)"
      class="block ml-auto text-sm bg-gray-200 rounded-lg p-2.5 mb-3"
    >
      <template v-for="(day, index) in [7, 14, 30, 60]" :key="index">
        <option :value="day">Last {{ day }} Days</option>
      </template>
    </select>

    <template v-if="!isLoading">
      <highcharts :options="chartOptions" style="width: 100%" />
    </template>
  </div>
</template>

<style scoped></style>
