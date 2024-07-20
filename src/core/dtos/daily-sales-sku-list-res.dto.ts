export interface DailySalesSkuListResDto {
  item: DailySalesSkuListItem
  Currency: string
}

export interface DailySalesSkuListItem {
  selectedDate: string
  selectedDate2: string
  totalSale: number
  totalShippingAmount: number
  totalSale2: number
  totalShippingAmount2: number
  skuList: SkuList[]
}

export interface SkuList {
  asin: string
  sku: string
  productName: string
  qty: number
  amount: number
  shippingAmount: number
  qty2: number
  amount2: number
  shippingAmount2: number
  sortingAmount: number
  imageUrl: string
  refundPercantage: any
}
