import { StorageService } from '@/core/services/storage'
import { StorageKey } from '@/core/enums'
import type {
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric
} from 'vue-router'

export async function loginTokenGuard(
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext
) {
  const accessToken = StorageService.get(StorageKey.ACCESS_TOKEN)
  if (accessToken) {
    next('/overview')
  } else {
    next()
  }
}
