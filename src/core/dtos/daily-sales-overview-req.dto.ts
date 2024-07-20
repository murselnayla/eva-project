export interface DailySalesOverviewReqDto {
  marketplace: string
  sellerId: string
  requestStatus: number
  day: DailySalesOverviewDay
  excludeYoYData: boolean
}

export type DailySalesOverviewDay = 7 | 14 | 30 | 60
