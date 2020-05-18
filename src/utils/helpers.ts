// 下划线转驼峰
const camelCase = str =>
  str.replace(/(-|_)+(.)?/g, (_match, _p1, p2) => (p2 ? p2.toUpperCase() : ''))

// 驼峰转下划线
const underscoreCase = str =>
  str.replace(/([A-Z])/g, (_match, p1) => (p1 ? `_${p1.toLowerCase()}` : ''))

// 驼峰&下划线互转
const switchCase = fn => obj => {
  if (obj instanceof Array) {
    return obj.map(item => switchCase(fn)(item))
  }

  if (obj instanceof Object) {
    const object = {}
    Object.keys(obj).forEach(key => {
      object[fn(key)] = switchCase(fn)(obj[key])
    })
    return object
  }

  return obj
}

// 将 json key 中的下划线转为驼峰
export const camelJson = switchCase(camelCase)

// 将 json key 中的驼峰转为下划线
export const underscoreJson = switchCase(underscoreCase)

// 移除图片base64后的前缀
export const removeBase64Prefix = str => str.replace(/.*base64,/, '')

// 获取登录地址
export const getLoginUrl = () => {
  const { location } = window
  if (location.hostname.includes('localhost')) {
    // 本地开发
    return ''
  }

  // nginx 部署访问, 在 nginx 里对 /login 做重定向
  const originUrl = encodeURIComponent(location.href)
  return `/login?redirect=${originUrl}&tenantid=security`
}

// 获取权限提醒地址
export const getForbidUrl = tenantId => {
  const { location } = window
  if (location.hostname.includes('localhost')) {
    // 本地开发
    return ''
  }

  // nginx 部署访问
  const originUrl = encodeURIComponent(location.href)
  if (tenantId === 'security') {
    return `/login/forbid?redirect=${originUrl}`
  }

  return `/login?redirect=${originUrl}&tenantid=security`
}
