import { defineStore } from 'pinia'
import http from '@/core/http/http.service'
import type {
  BaseResDtoWithAxios,
  DailySalesSkuListReqDto,
  DailySalesSkuListResDto,
  SkuRefundRateReqDto,
  SkuRefundRateResDto
} from '@/core/dtos'

const PAGE_SIZE = 30
export const useSalesSkuListStore = defineStore('useSalesSkuList', {
  state: () => ({
    dailySalesSkuListData: {} as DailySalesSkuListResDto | any,
    tableCurrency: '' as string,
    skuRefundRate: [] as SkuRefundRateResDto[],
    pagination: {
      pageSize: PAGE_SIZE,
      pageNumber: 1,
      pageRequestNumber: 1
    }
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
    },

    async fetchSkuRefundRate(body: SkuRefundRateReqDto) {
      try {
        const { data }: BaseResDtoWithAxios<SkuRefundRateResDto[]> = await http.post('data/get-sku-refund-rate', body)
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
      this.resetPagination()
    },

    resetPagination() {
      this.pagination = {
        pageSize: PAGE_SIZE,
        pageNumber: 1,
        pageRequestNumber: 1
      }
    }
  }
})
