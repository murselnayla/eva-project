import { StorageKey } from '@/core/enums'

export namespace StorageService {
  export function get(key: StorageKey): string | null {
    return localStorage.getItem(key)
  }

  export function getParsed(key: StorageKey): any | null {
    const value = localStorage.getItem(key)
    if (!value) return null
    return JSON.parse(value)
  }

  export function set(key: StorageKey, value: string): void {
    localStorage.setItem(key, value)
  }

  export function remove(key: StorageKey): void {
    localStorage.removeItem(key)
  }

  export function setAuthTokens(accessToken: string, refreshToken: string, authEmail: string) {
    StorageService.set(StorageKey.ACCESS_TOKEN, accessToken)
    StorageService.set(StorageKey.REFRESH_TOKEN, refreshToken)
    StorageService.set(StorageKey.AUTH_EMAIL, authEmail)
  }

  export function removeAuthTokens(): void {
    StorageService.remove(StorageKey.ACCESS_TOKEN)
    StorageService.remove(StorageKey.REFRESH_TOKEN)
    StorageService.remove(StorageKey.USER)
    StorageService.remove(StorageKey.AUTH_EMAIL)
  }
}
