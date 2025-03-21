export type SupportedHttpMethod = 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT'

export type HttpRequestOptions = Parameters<typeof useFetch>[1]

type RequestFilterFn = (request: any, options: any, response: any, resolve: (data: any) => void, reject: (data?: any) => void) => Promise<void> | void

type URL = Parameters<typeof useFetch>[0]
/**
 * 支持 SSR 和客户端请求的 API 请求方法
 */
export async function useRequest<
  _ResultType = unknown,
  ResultWrapperType = ResultType<_ResultType>,
>(
  url: URL,
  options?: HttpRequestOptions,
  params?: Record<string, string>,
  requestFilterFn?: RequestFilterFn,
  responseFilterFn?: RequestFilterFn,
  errorHandleFn?: (error: any) => void,
): Promise<ResultWrapperType> {
  const runtimeConfig = useRuntimeConfig()
  const requestFilter = requestFilterFn || runtimeConfig.public.requestFilter as RequestFilterFn | undefined
  const responseFilter = responseFilterFn || runtimeConfig.public.responseFilter as RequestFilterFn | undefined
  const errorHandle = errorHandleFn || runtimeConfig.public.errorHandle as (error: any) => undefined | void

  const searchParams = new URLSearchParams(params)
  const urlWithParams = `${url.toString()}${searchParams ? `?${searchParams.toString()}` : ''}`

  const response = new Promise<ResultWrapperType>((resolve, reject) => {
    const func = import.meta.env.SSR ? useFetch : $fetch as unknown as typeof useFetch
    func<ResultWrapperType>(urlWithParams, {
      baseURL: runtimeConfig.public.baseURL as string | undefined,
      body: options?.body ?? undefined,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers ?? {}),
      },
      method: (options?.method ?? 'GET') as any,
      mode: 'cors',
      onRequest({ options, request }) {
        if (requestFilter) {
          void requestFilter(request, options, undefined, resolve, reject)
        }
      },

      onRequestError({ error }) {
        console.error('Nuxt request error:', error)
        if (errorHandle) {
          errorHandle(error)
        }

        reject(error)
      },

      onResponse({ options, request, response }) {
        if (responseFilter) {
          void responseFilter(request, options, response, resolve, reject)
        }

        resolve(response._data)
      },

      onResponseError({ error }) {
        console.error('Nuxt response error:', error)
        if (errorHandle) {
          errorHandle(error)
        }

        reject(error)
      },

      query: options?.params ?? undefined,
    }).catch((error) => {
      console.error('Nuxt request error:', error)
      if (errorHandle) {
        errorHandle(error)
      }

      reject(error)
    },
    )
  })

  return response
}

export async function useRequestGet<
  _ResultType = unknown,
  ResultWrapperType = ResultType<_ResultType>,
>(
  url: string,
  options?: HttpRequestOptions,
  params?: Record<string, string>,
  requestFilterFn?: RequestFilterFn,
  responseFilterFn?: RequestFilterFn,
  errorHandleFn?: (error: any) => void,
): Promise<ResultWrapperType> {
  return useRequest<_ResultType, ResultWrapperType>(url, options, params, requestFilterFn, responseFilterFn, errorHandleFn)
}

export async function useRequestPost<
  _ResultType = unknown,
  ResultWrapperType = ResultType<_ResultType>,
>(
  url: string,
  options?: HttpRequestOptions,
  params?: Record<string, string>,
  requestFilterFn?: RequestFilterFn,
  responseFilterFn?: RequestFilterFn,
  errorHandleFn?: (error: any) => void,
): Promise<ResultWrapperType> {
  return useRequest<_ResultType, ResultWrapperType>(url, { ...options, method: 'POST' }, params, requestFilterFn, responseFilterFn, errorHandleFn)
}
