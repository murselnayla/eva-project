import { defineStore } from 'pinia'
import http from '@/core/http/http.service'
import type {
  BaseResDtoWithAxios,
  DailySalesOverviewItem,
  DailySalesOverviewReqDto,
  DailySalesOverviewResDto,
  DailySalesSkuListReqDto,
  DailySalesSkuListResDto
} from '@/core/dtos'
import { getChartDateFormat } from '@/core/utils'

export const useSalesSkuListStore = defineStore('useSalesSkuList', {
  state: () => ({
    dailySalesSkuListData: {} as DailySalesSkuListResDto,
    tableCurrency: '' as string
  }),

  getters: {},

  actions: {
    async fetchDailySalesSkuList(body: DailySalesSkuListReqDto) {
      try {
        const { data }: BaseResDtoWithAxios<DailySalesSkuListResDto> = await http.post(
          'data/daily-sales-sku-list',
          body
        )
        const { Data } = data
        this.dailySalesSkuListData = Data
        this.tableCurrency = Data.Currency

        return data
      } catch (err: any) {
        throw new Error(err.response.data.ApiStatusMessage)
      }
    }
  }
})
