import httpHelper, { type CommonResponse } from '@/utils/httpHelper'

export interface LoginResponse {
  token: string
  status: string
}

export const logIn = async (
  email: string,
  password: string
): Promise<CommonResponse<LoginResponse>> => {
  try {
    const response = await httpHelper.post<LoginResponse>('/auth/login', { email, password })

    return Promise.resolve(response)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
