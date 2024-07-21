<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore, usePageLoadingStore, useSalesAnalyticStore, useSalesSkuListStore } from '@/stores'
import type { DailySalesOverviewDay, DailySalesOverviewReqDto } from '@/core/dtos'
import { useToast } from 'vue-toastification'
import { useSkuTable } from '@/composables'

const pageLoadingStore = usePageLoadingStore()
const authStore = useAuthStore()
const salesAnalyticStore = useSalesAnalyticStore()
const salesSkuListStore = useSalesSkuListStore()
const skuPagination = useSkuTable()
const toast = useToast()

onMounted(async () => {
  await fetchDailySalesOverview(salesAnalyticStore.selectedLastDay)
})

const fetchDailySalesOverview = async (day: DailySalesOverviewDay) => {
  salesSkuListStore.resetState()

  pageLoadingStore.showLoading()
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
    pageLoadingStore.hideLoading()
  }
}

const onChangeChartSelect = async (selectedPoints: any[]) => {
  if (selectedPoints.length === 0) {
    salesSkuListStore.resetState()
    return
  }
  salesSkuListStore.resetPagination()
  await skuPagination.fetchSalesSkuList()
}

const toggleChartPoint = (index: number, salesDate: string) => {
  const pointIndex = salesAnalyticStore.chartsSelectedPoints.findIndex((point) => point.salesDate === salesDate)

  if (pointIndex !== -1) {
    salesAnalyticStore.chartsSelectedPoints.splice(pointIndex, 1)
  } else {
    if (salesAnalyticStore.chartsSelectedPoints.length >= 2) {
      salesAnalyticStore.chartsSelectedPoints.shift()
    }
    salesAnalyticStore.chartsSelectedPoints.push({ salesDate, index })
  }

  onChangeChartSelect(salesAnalyticStore.chartsSelectedPoints)
}

const drawPlotBand = (xAxis: any) => {
  xAxis.removePlotBand('selected')
  salesAnalyticStore.chartsSelectedPoints.forEach((point: any, index: number) => {
    xAxis.addPlotBand({
      from: point.index - 0.5,
      to: point.index + 0.5,
      color: `${salesAnalyticStore.getSelectedDateColorByIndex(index)}53`,
      id: 'selected'
    })
  })
}

const chartOptions = computed(() => ({
  chart: {
    type: 'column',
    backgroundColor: 'transparent',
    events: {
      click: function (e: any) {
        const index = Math.floor(this.xAxis[0].toValue(e.x, true)) - 1
        const selectedSalesDate = this.series[0].data[index].options.salesDate
        toggleChartPoint(index, selectedSalesDate)
        drawPlotBand(this.xAxis[0])
      }
    }
  },
  credits: { enabled: false },
  title: { text: null },
  xAxis: {
    categories: salesAnalyticStore.getChartCategories,
    labels: {
      rotation: -50
    },
    crosshair: true
  },
  yAxis: {
    allowDecimals: true,
    gridLineDashStyle: 'Dash',
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
      maxPointWidth: 70,
      borderWidth: 0,
      point: {
        events: {
          click: function (e: any) {
            toggleChartPoint(e.point.index, e.point.salesDate)
            drawPlotBand(this.series.chart.xAxis[0])
          },
          mouseOver: function () {
            this.series.chart.container.style.cursor = 'pointer'
          },
          mouseOut: function () {
            this.series.chart.container.style.cursor = 'default'
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
      color: '#58F1C7',
      data: salesAnalyticStore.chartProfitSeries.map((value, index) => ({
        y: value,
        salesDate: salesAnalyticStore.chartCategoryDates[index]
      }))
    },
    {
      name: 'FBA Sales',
      color: '#8287E2',
      data: salesAnalyticStore.chartFbaAmountSeries.map((value, index) => ({
        y: value,
        salesDate: salesAnalyticStore.chartCategoryDates[index]
      }))
    },
    {
      name: 'FBM Sales',
      color: '#503FF0',
      data: salesAnalyticStore.chartFbmAmountSeries.map((value, index) => ({
        y: value,
        salesDate: salesAnalyticStore.chartCategoryDates[index]
      }))
    }
  ]
})) as Highcharts.Options
</script>

<template>
  <div>
    <template v-if="salesAnalyticStore.dailySalesOverviewData">
      <div class="pt-2 bg-white rounded-md">
        <div class="flex justify-between items-center px-3 mb-5 font-medium text-base">
          <span>Daily Sales</span>
          <select
            v-model="salesAnalyticStore.selectedLastDay"
            @change="fetchDailySalesOverview(salesAnalyticStore.selectedLastDay)"
            class="p-2 bg-transparent outline-0 text-right"
          >
            <template v-for="(day, index) in [7, 14, 30, 60]" :key="index">
              <option :value="day">Last {{ day }} Days</option>
            </template>
          </select>
        </div>
        <highcharts :options="chartOptions" style="width: 100%" />
      </div>
    </template>
  </div>
</template>

<style scoped></style>
