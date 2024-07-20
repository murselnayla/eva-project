export interface DailySalesSkuListReqDto {
  marketplace: string
  sellerId: string
  salesDate: string
  salesDate2?: string
  pageSize: number
  pageNumber: number
  isDaysCompare: number
}
