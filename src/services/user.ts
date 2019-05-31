import api from '@/services/api'
import { request } from '@/services/request'
import { ERROR_CODE } from '@/config/errors'

export const user = {
  async userList(data) {
    let result = {
      records: [],
      pagination: {
        current: 0,
        total: 0
      }
    }

    const response: any = await request(api.userList, data)
    if (response && response.code === ERROR_CODE.SUCCESS) {
      result = {
        ...response.data
      }
    }

    return result
  },

  async userDelete(data) {
    let result = false

    const response: any = await request(api.userDelete, data)
    if (response && response.code === ERROR_CODE.SUCCESS) {
      result = true
    }

    return result
  },

  async userDetail(urlParams, data?) {
    let result = {
      modalVisible: false,
      userDetail: {
        name: '',
        time: ''
      }
    }
    const response: any = await request(api.userDetail, data, urlParams)
    if (response && response.code === ERROR_CODE.SUCCESS) {
      result = {
        modalVisible: true,
        userDetail: response.data
      }
    }

    return result
  }
}
