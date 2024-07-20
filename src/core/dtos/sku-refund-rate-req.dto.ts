import type { DailySalesOverviewDay } from '@/core/dtos/daily-sales-overview-req.dto'

export interface SkuRefundRateReqDto {
  marketplace: string
  sellerId: string
  skuList: string[]
  requestedDay: DailySalesOverviewDay
}
