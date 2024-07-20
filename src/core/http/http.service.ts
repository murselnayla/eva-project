import axios, { AxiosHeaders, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { StorageService } from '@/core/services/storage'
import { StorageKey } from '@/core/enums'
import { getBearerToken } from '@/core/utils'
import { useRouter } from 'vue-router'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = StorageService.get(StorageKey.ACCESS_TOKEN)
    if (accessToken) {
      const headers: AxiosHeaders = new AxiosHeaders()
      headers.set('Authorization', getBearerToken(accessToken))
      config.headers = headers
    }
    return config
  },
  (error) => Promise.reject(error)
)

http.interceptors.response.use(
  (config: AxiosResponse<any>) => {
    return config
  },
  async (error) => {
    if (error.response.status === 401) {
      // const router = useRouter()
      // await router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default http
