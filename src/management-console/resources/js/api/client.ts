import * as api from './api'
import axios, { AxiosError, AxiosResponse } from 'axios'

import router from '@/router'
import { ErrorResponse, LoginPostResponse, Operator } from './api'
import manualClient from '@/api/manual-client'
const baseUrl = process.env.MIX_API_BASE_URL

const axiosClient = axios.create({
  baseURL: baseUrl,
  timeout: 20000,
})
axiosClient.interceptors.request.use(async function(request) {
  if (request.url && !request.url.endsWith('/login')) {
    if (expiredToken()) {
      const refreshedToken = await refreshToken()
      request.headers.Authorization = `Bearer ${refreshedToken}`
    }
  }

  return request
})

async function refreshToken(): Promise<String> {
  const response: AxiosResponse<LoginPostResponse> = await manualClient.post({
    endpoint: '/refresh',
  })

  localStorage.setItem('token', response.data.data.accessToken)
  localStorage.setItem(
    'tokenExpiresAt',
    expiresInToExpiresAt(response.data.data.expiresIn)
  )
  return response.data.data.accessToken
}

function expiresInToExpiresAt(expiresIn: number) {
  return new Date(new Date().getTime() + expiresIn * 1000).toString()
}

function expiredToken(): boolean {
  const tokenExpiresAt = localStorage.getItem('tokenExpiresAt')
  if (!tokenExpiresAt) return false

  return pastDatetime(tokenExpiresAt)
}

function pastDatetime(tokenExpiresAt: string) {
  return new Date(tokenExpiresAt).getTime() < new Date().getTime()
}

export default new api.DefaultApi(
  {
    basePath: baseUrl,
    accessToken: () => {
      return localStorage.getItem('token') || ''
    },
    baseOptions: {},
  },
  baseUrl,
  axiosClient
)

export function httpErrorHandler(error: AxiosError) {
  if (error.message === 'Network Error') {
    // network error
    return {
      errorMessage: 'ネットワークエラー。サーバと接続できません。',
      errorDetails: {},
    }
  }

  if (error.response === undefined) {
    console.error('error:', error)
    return {
      errorMessage: 'クライアントエラーが発生しました。',
      errorDetails: {},
    }
  }

  const errorResponseData: ErrorResponse = error.response.data

  switch (error.response.status) {
    case 400:
      return {
        errorMessage: error.response.data.message || 'リクエストエラーが発生しました。',
        errorDetails: errorResponseData.errorDetails,
      }
    case 401:
      if (error.response.data.locked) {
        return {
          errorMessage:
            'ユーザがロックされています。管理者に問い合わせてください。',
          errorDetails: {},
        }
      }

      router.push({ name: 'login', params: { forceLeave: 'true' } })
      return {
        errorMessage: '認証エラーが発生しました。',
        errorDetails: {},
      }
    case 403:
      return {
        errorMessage: '実行権限がありません。',
        errorDetails: {},
      }
    case 404:
      return {
        errorMessage: 'データが存在しません',
        errorDetails: {},
      }
    case 409:
      return {
        errorMessage:
          errorResponseData.errorMessage || 'サーバでエラーが発生しました',
        errorDetails: {},
      }
    case 420:
      return {
        errorMessage:
          errorResponseData.errorMessage || 'サーバでエラーが発生しました',
        errorDetails: {},
      }
    case 422:
      scrollTop()
      return {
        errorMessage:
          errorResponseData.errorMessage ||
          'バリデーションエラーが発生しました',
        errorDetails: errorResponseData.errorDetails,
      }
    case 500:
      return { errorMessage: 'サーバでエラーが発生しました', errorDetails: {} }
    case 502:
      return { errorMessage: 'サーバとの接続に失敗しました', errorDetails: {} }
    default:
      return {
        errorMessage: `エラーが発生しました(http response status: ${error.response.status})`,
        errorDetails: {},
      }
  }
}

function scrollTop() {
  const targetElement = document.getElementById('scroll-top')

  // @see https://developer.mozilla.org/ja/docs/Web/API/Element/scrollIntoView
  if (targetElement) targetElement.scrollIntoView({ behavior: 'auto' })
}
