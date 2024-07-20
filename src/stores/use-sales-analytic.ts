import { defineStore } from 'pinia'
import http from '@/core/http/http.service'
import type {
  BaseResDtoWithAxios,
  DailySalesOverviewDay,
  DailySalesOverviewItem,
  DailySalesOverviewReqDto,
  DailySalesOverviewResDto
} from '@/core/dtos'
import { getDayNameByDate } from '@/core/utils'

export const useSalesAnalyticStore = defineStore('useSalesAnalytic', {
  state: () => ({
    dailySalesOverviewData: {} as DailySalesOverviewResDto,
    chartCurrency: '' as string,
    chartProfitSeries: [] as any[],
    chartFbaAmountSeries: [] as any[],
    chartFbmAmountSeries: [] as any[],
    chartCategoryDates: [] as any[],
    chartSeriesData: [] as any[],
    chartsSelectedPoints: [] as any[],
    selectedLastDay: 7 as DailySalesOverviewDay
  }),

  getters: {
    getChartTooltipData:
      (state: any) =>
      (dayIndex: number): string => {
        const selectedDay = state.dailySalesOverviewData.item[dayIndex]
        return `Total Sales: ${selectedDay.fbaAmount + selectedDay.fbmAmount}<br />Shipping: ${selectedDay.fbaShippingAmount}<br />Profit: ${selectedDay.profit}<br />FBA Sales: ${selectedDay.fbaAmount}<br />FBM Sales: ${selectedDay.fbmAmount}<br />`
      },

    getChartCategories: (state: any): any[] => {
      return state.chartCategoryDates.map((item: any) => `${getDayNameByDate(item)}, ${item}`)
    }
  },

  actions: {
    async fetchDailySalesOverview(body: DailySalesOverviewReqDto) {
      try {
        const { data }: BaseResDtoWithAxios<DailySalesOverviewResDto> = await http.post(
          'data/daily-sales-overview',
          body
        )
        const { Data } = data
        this.dailySalesOverviewData = Data
        this.chartCurrency = Data.Currency

        this.chartProfitSeries = []
        this.chartFbaAmountSeries = []
        this.chartFbmAmountSeries = []
        this.chartCategoryDates = []
        this.chartSeriesData = []

        Data.item.forEach((item: DailySalesOverviewItem) => {
          this.chartProfitSeries.push(item.profit)
          this.chartFbaAmountSeries.push(item.fbaAmount)
          this.chartFbmAmountSeries.push(item.fbmAmount)
          this.chartCategoryDates.push(item.date)
        })

        return data
      } catch (err: any) {
        throw new Error(err.response.data.ApiStatusMessage)
      }
    }
  }
})
