import cookie from 'js-cookie'

import api from '@/services/api'
import { request } from '@/services/request'
import { ERROR_CODE } from '@/config/errors'

export const account = {
  async login(data) {
    let result = {
      token: '',
      isLogin: false
    }

    const response: any = await request(api.login, data)
    if (response && response.code === ERROR_CODE.SUCCESS) {
      result = {
        token: response.data.token,
        isLogin: true
      }

      cookie.set('token', result.token)
    }

    return result
  },

  async register(data) {
    let result = {
      isRegister: false
    }

    const response: any = await request(api.register, data)
    if (response && response.code === ERROR_CODE.SUCCESS) {
      result = {
        isRegister: true
      }
    }

    return result
  }
}
