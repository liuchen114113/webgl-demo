import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Loadable from './loadable'
import { menu } from '@/routes'

// 生成路由数组
const renderRouter = (routerArr: any = menu, result = []) => {
  if (routerArr instanceof Array) {
    routerArr.forEach(item => renderRouter(item, result))
  } else if (routerArr instanceof Object) {
    if (routerArr.redirect) {
      result.push(
        <Route
          exact={routerArr.exact !== false}
          path={routerArr.path}
          key={routerArr.path}
          render={() => <Redirect to={routerArr.redirect} />}
        />
      )
    } else {
      result.push(
        <Route
          exact={routerArr.exact !== false}
          path={routerArr.path}
          key={routerArr.path}
          component={Loadable(routerArr.path)}
        />
      )
    }

    if (routerArr.children) {
      renderRouter(routerArr.children, result)
    }

    if (routerArr.hidden) {
      renderRouter(routerArr.hidden, result)
    }
  }
  return result
}

// 生成以 url 及其 name 组成的 map
// 如： map = {'url1': 'name1', 'url2': 'name2"}
const genUrlNameMap = (routeArr: any = menu, result = {}) => {
  if (routeArr instanceof Array) {
    routeArr.forEach(item => genUrlNameMap(item, result))
  } else if (routeArr instanceof Object) {
    result[routeArr.path] = routeArr.title

    if (routeArr.children) {
      genUrlNameMap(routeArr.children, result)
    }
  }

  return result
}

export { renderRouter, genUrlNameMap }
