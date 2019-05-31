import axios from 'axios'
import pathToRegexp from 'path-to-regexp'
import cookie from 'js-cookie'
import { message } from 'antd'

import { camelJson, underscoreJson } from '@/utils/helpers'
import { ERROR_CODE, ERROR_MESSAGE } from '@/config/errors'

message.config({ maxCount: 1 })

// 在 request 里将 token 设置到 header 里
axios.interceptors.request.use(
  config => {
    const token = cookie.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else if (
      !config.url.includes('login') &&
      !config.url.includes('register')
    ) {
      message.info('请登录')
      setTimeout(() => {
        window.location.href = '/login'
      }, 1500)
    }

    if (config.data && !(config.data instanceof FormData)) {
      config.data = underscoreJson(config.data)
    }
    if (config.params) {
      config.params = underscoreJson(config.params)
    }

    return config
  },
  error => Promise.reject(error)
)

// 在 response 里判断状态，如果是未登录状态则重定向到 login 页面
axios.interceptors.response.use(
  response => {
    if (response.config.url.includes('api') && response && response.data) {
      // 统一处理错误码
      if (response.data.code !== ERROR_CODE.SUCCESS) {
        message.error(ERROR_MESSAGE[response.data.code] || '失败')

        // token 失效
        if (response.data.code === ERROR_CODE.TOKEN_INVALID) {
          message.info(ERROR_MESSAGE[response.data.code])
          window.location.href = '/login'
        }
      } else {
        if (response.config.url.includes('delete')) {
          message.info('删除成功')
        } else if (response.config.url.includes('update')) {
          message.info('更新成功')
        } else if (response.config.url.includes('create')) {
          message.info('添加成功')
        }

        if (response.data.data) {
          response.data.data = camelJson(response.data.data)
        }
      }
    }
    return response.data
  },
  error => Promise.reject(error)
)

/**
 * 发送请求
 * /api/v1/foo/bar/:id => request(api.xxx, data, {id: 1})
 * /api/v1/foo/bar?id=1 => request(api.xxx, {id: 1})
 * @param api 对象 {url, method}，见 api.ts
 * @param data 需要发送的数据，可以是 querystring(get) 也可以是 body(post, put, ...)
 * @param urlParams 组成 url 的变量
 * @param options 额外的配置选项，同 axios
 */
const request = (
  api: { url: string; method: string },
  data?: object,
  urlParams?: object,
  options?: object
) => {
  if (urlParams) {
    api = {
      ...api,
      url: pathToRegexp.compile(api.url)(urlParams)
    }
  }

  let config: any = {
    ...options,
    ...api
  }

  if (api.method === 'get') {
    config = {
      ...config,
      params: data
    }
  } else {
    config = {
      ...config,
      data
    }
  }

  return axios(config)
}

export { request }
