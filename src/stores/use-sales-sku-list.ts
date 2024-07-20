import { defineStore } from 'pinia'
import http from '@/core/http/http.service'
import type {
  BaseResDtoWithAxios,
  DailySalesSkuListReqDto,
  DailySalesSkuListResDto,
  SkuList,
  SkuRefundRateReqDto,
  SkuRefundRateResDto
} from '@/core/dtos'

export const useSalesSkuListStore = defineStore('useSalesSkuList', {
  state: () => ({
    dailySalesSkuListData: {} as DailySalesSkuListResDto | {},
    tableCurrency: '' as string,
    skuRefundRate: [] as SkuRefundRateResDto[]
  }),

  getters: {
    getSkuList: (state: any): SkuList[] => {
      return state.dailySalesSkuListData?.item?.skuList || []
    }
  },

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
    },

    async fetchSkuRefundRate(body: SkuRefundRateReqDto) {
      try {
        const { data }: BaseResDtoWithAxios<SkuRefundRateResDto[]> = await http.post(
          'data/get-sku-refund-rate',
          body
        )
        this.skuRefundRate = data.Data
        return data
      } catch (err: any) {
        throw new Error(err.response.data.ApiStatusMessage)
      }
    },

    resetState() {
      this.dailySalesSkuListData = {}
      this.tableCurrency = ''
      this.skuRefundRate = []
    }
  }
})
