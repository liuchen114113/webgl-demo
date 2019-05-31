import { createModel } from '@rematch/core'
import * as services from '../services'

export const user = createModel({
  state: {
    records: [],
    pagination: {
      current: 0,
      total: 0
    },
    modalVisible: false,
    userDetail: {
      name: '',
      time: ''
    }
  },

  reducers: {
    // 在这里写纯函数来改变 state

    updateState(state, payload) {
      return {
        ...state,
        ...payload
      }
    },

    hideModal(state, _payload) {
      return {
        ...state,
        modalVisible: false
      }
    }
  },

  effects: dispatch => ({
    // 在这里写"不纯"的函数，比如 ajax 请求获取数据
    // 异步请求必须放在此处

    // 获取用户列表
    async asyncUserList(payload) {
      const result = await services.user.userList(payload)
      dispatch.user.updateState(result)
    },

    // 删除用户
    async asyncUserDelete(payload) {
      const result = await services.user.userDelete(payload)
      if (result) {
        dispatch.user.asyncUserList()
      }
    },

    // 获取用户详情
    async asyncUserDetail(payload) {
      const result = await services.user.userDetail({
        userId: payload.userId
      })
      dispatch.user.updateState(result)
    }
  })
})
