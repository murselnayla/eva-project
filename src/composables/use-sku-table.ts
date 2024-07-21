import { computed, type ComputedRef } from 'vue'
import { useAuthStore, usePageLoadingStore, useSalesAnalyticStore, useSalesSkuListStore } from '@/stores'
import type { DailySalesSkuListReqDto, SkuList, SkuRefundRateReqDto } from '@/core/dtos'
import { useToast } from 'vue-toastification'

// Pagination Config
export const PAGE_SIZE = 30
const ITEMS_PER_PAGE = 10
const PAGES_COUNT = PAGE_SIZE / ITEMS_PER_PAGE

export function useSkuTable() {
  const pageLoadingStore = usePageLoadingStore()
  const authStore = useAuthStore()
  const salesAnalyticStore = useSalesAnalyticStore()
  const salesSkuListStore = useSalesSkuListStore()
  const toast = useToast()

  const skuList: ComputedRef<SkuList[]> = computed(() => salesSkuListStore.dailySalesSkuListData?.item?.skuList)
  const pageSize = computed(() => salesSkuListStore.pagination.pageSize)
  const pageNumber = computed(() => salesSkuListStore.pagination.pageNumber)
  const pageRequestNumber = computed(() => salesSkuListStore.pagination.pageRequestNumber)

  const currentPageItems = computed(() => {
    const start = ((salesSkuListStore.pagination.pageNumber - 1) % PAGES_COUNT) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return skuList.value.slice(start, end)
  })

  const totalPages = computed(() => {
    const baseTotal = Math.ceil(skuList.value.length / ITEMS_PER_PAGE) * pageRequestNumber.value
    return baseTotal + (hasMorePages.value ? 1 : 0)
  })

  const hasMorePages = computed(() => skuList.value.length % pageSize.value === 0)

  const disabledPrevBtn = computed(() => salesSkuListStore.pagination.pageNumber === 1)
  const disabledNextBtn = computed(
    () => salesSkuListStore.pagination.pageNumber === totalPages.value && !hasMorePages.value
  )

  const onClickPrev = () => setPage(salesSkuListStore.pagination.pageNumber - 1)
  const onClickNext = () => setPage(salesSkuListStore.pagination.pageNumber + 1)

  const tableCurrency = computed(() => salesSkuListStore.tableCurrency)

  const setPage = async (newPageNumber: number) => {
    const newPageRequestNumber = Math.ceil(newPageNumber / PAGES_COUNT)
    if (pageRequestNumber.value !== newPageRequestNumber) {
      salesSkuListStore.pagination.pageRequestNumber = newPageRequestNumber
      await fetchSalesSkuList()
    }
    salesSkuListStore.pagination.pageNumber = newPageNumber
  }

  const fetchSalesSkuList = async (pageNum: number = pageRequestNumber.value) => {
    pageLoadingStore.showLoading()
    const { chartSelectedPoints } = salesAnalyticStore
    const body: DailySalesSkuListReqDto = {
      marketplace: authStore.getMarketplace,
      sellerId: authStore.getSellerId,
      salesDate: chartSelectedPoints[0].salesDate,
      ...(chartSelectedPoints.length === 2 && { salesDate2: chartSelectedPoints[1].salesDate }),
      pageSize: pageSize.value,
      pageNumber: pageNum,
      isDaysCompare: chartSelectedPoints.length - 1
    }

    try {
      await salesSkuListStore.fetchDailySalesSkuList(body)
      await fetchSkuRefundRate()
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      pageLoadingStore.hideLoading()
    }
  }

  const fetchSkuRefundRate = async () => {
    const body: SkuRefundRateReqDto = {
      marketplace: authStore.getMarketplace,
      sellerId: authStore.getSellerId,
      requestedDay: salesAnalyticStore.selectedLastDay,
      skuList: skuList.value.map((item) => item.sku)
    }

    try {
      await salesSkuListStore.fetchSkuRefundRate(body)
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  return {
    pageNumber,
    currentPageItems,
    tableCurrency,
    selectedLastDay: salesAnalyticStore.selectedLastDay,
    selectedDateColor: salesAnalyticStore.getSelectedDateColorByIndex,
    totalPages,
    disabledPrevBtn,
    disabledNextBtn,
    onClickPrev,
    onClickNext,
    fetchSalesSkuList,
    setPage
  }
}
