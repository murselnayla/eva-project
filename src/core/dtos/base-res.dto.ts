import type { AxiosResponse } from 'axios'

export type BaseResDtoWithAxios<T> = AxiosResponse<BaseResDto<T>>

export interface BaseResDto<T> {
  ApiStatus: boolean
  ApiStatusCode: number
  ApiStatusMessage: string
  Data: T
}
