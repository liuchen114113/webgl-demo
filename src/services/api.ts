export default {
  login: {
    url: '/api/v1/account/login',
    method: 'post'
  },
  register: {
    url: '/api/v1/account/register',
    method: 'post'
  },
  userList: {
    url: '/api/v1/user/query',
    method: 'get'
  },
  userDelete: {
    url: '/api/v1/user/delete',
    method: 'post'
  },
  userDetail: {
    url: `/api/v1/user/detail/:userId`,
    method: 'post'
  }
}
