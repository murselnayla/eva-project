import { useAuthStore } from '@/stores'
import { StorageService } from '@/core/services/storage'
import { StorageKey } from '@/core/enums'
import type {
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric
} from 'vue-router'
import { useToast } from 'vue-toastification'

export async function authGuard(
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext
) {
  const toast = useToast()
  const authEmail = StorageService.get(StorageKey.AUTH_EMAIL)
  if (authEmail) {
    const authStore = useAuthStore()
    try {
      await authStore.checkUserInfo({ email: authEmail } || '')
      next()
    } catch (err: any) {
      StorageService.removeAuthTokens()
      toast.error(err.message)
      next('/login')
    }
  } else {
    next('/login')
  }
}
