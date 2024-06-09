import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'

export const BASE_URL = `http://localhost:3000`

export interface MainErrorDto {
  message: string
  statusCode?: number
  statusText?: string
}

export interface CommonResponse<T> {
  code: number
  data: T | null
  error: MainErrorDto | null
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL
})

async function request<T, D = unknown>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  path: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<CommonResponse<T>> {
  try {
    const response = await axiosInstance.request<T>({
      method,
      url: path,
      data: data,
      ...config
    } as AxiosRequestConfig<D>)

    return {
      code: response.status,
      data: response.data,
      error: null
    }
  } catch (error: AxiosError<MainErrorDto> | unknown) {
    const { response } = error as AxiosError<MainErrorDto>

    return {
      code: response?.status || 500,
      data: null,
      error: response?.data || (error as MainErrorDto)
    }
  }
}

const httpHelper = {
  get: <T>(path: string) => request<T>('get', path),
  post: <T, D = unknown>(path: string, payload?: D, config?: AxiosRequestConfig) =>
    request<T, D>('post', path, payload, config),
  put: <T, D = unknown>(path: string, payload?: D, config?: AxiosRequestConfig) =>
    request<T, D>('put', path, payload, config),
  patch: <T, D = unknown>(path: string, payload?: D, config?: AxiosRequestConfig) =>
    request<T, D>('patch', path, payload, config),
  delete: <T, D = unknown>(path: string, payload?: D, config?: AxiosRequestConfig) =>
    request<T, D>('delete', path, payload, config)
}

export default httpHelper
