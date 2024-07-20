import { defineStore } from 'pinia'
import http from '@/core/http/http.service'
import type {
  BaseResDtoWithAxios,
  LoginReqDto,
  LoginResDto,
  LogoutResDto,
  UserInfoReqDto,
  UserInfoResDto
} from '@/core/dtos'
import { StorageService } from '@/core/services/storage'
import type { AxiosResponse } from 'axios'
import { StorageKey } from '@/core/enums'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userInfo: {} as UserInfoResDto
  }),
  getters: {
    getMarketplace: (state) => state.userInfo.user?.store[0]?.marketplaceName,
    getSellerId: (state) => state.userInfo.user?.store[0]?.storeId
  },
  actions: {
    async login(body: LoginReqDto) {
      try {
        const { data }: BaseResDtoWithAxios<LoginResDto> = await http.post('oauth/token', body)
        StorageService.setAuthTokens(data.Data.AccessToken, data.Data.RefreshToken, body.Email)
        return data
      } catch (err: any) {
        throw new Error(err.response.data.ApiStatusMessage)
      }
    },

    async checkUserInfo(body: UserInfoReqDto) {
      try {
        const { data }: BaseResDtoWithAxios<UserInfoResDto> = await http.post('user/user-information', body)
        StorageService.setJSON(StorageKey.USER, data.Data)
        this.userInfo = data.Data
        return data
      } catch (err: any) {
        throw new Error(err.response.data.ApiStatusMessage)
      }
    },

    async logout() {
      try {
        const { data }: AxiosResponse<LogoutResDto> = await http.post('user/logout')
        StorageService.removeAuthTokens()
        return data
      } catch (err: any) {
        throw new Error(err.response.data.ApiStatusMessage)
      }
    }
  }
})
