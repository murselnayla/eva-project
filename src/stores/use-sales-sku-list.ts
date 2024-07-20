import { defineStore } from 'pinia'
import http from '@/core/http/http.service'
import type {
  BaseResDtoWithAxios,
  DailySalesOverviewItem,
  DailySalesOverviewReqDto,
  DailySalesOverviewResDto,
  DailySalesSkuListReqDto,
  DailySalesSkuListResDto,
  SkuList
} from '@/core/dtos'
import { getDayNameByDate } from '@/core/utils'
import { useSalesAnalyticStore } from '@/stores/use-sales-analytic'

export const useSalesSkuListStore = defineStore('useSalesSkuList', {
  state: () => ({
    dailySalesSkuListData: {} as DailySalesSkuListResDto | {},
    tableCurrency: '' as string
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

    resetState() {
      this.dailySalesSkuListData = {}
      this.tableCurrency = ''
    }
  }
})
