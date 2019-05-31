import React, { PureComponent } from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import pathToRegexp from 'path-to-regexp'

import { genUrlNameMap } from '@/routes'

class Bread extends PureComponent<RouteComponentProps, any> {
  breadcrumbNameMap: any

  constructor(props) {
    super(props)
    this.breadcrumbNameMap = genUrlNameMap()
  }

  render() {
    const pathSnippets = this.props.location.pathname.split('/').filter(i => i)
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      let title = this.breadcrumbNameMap[url]
      if (!title) {
        const tmp = Object.entries(this.breadcrumbNameMap).find(item =>
          pathToRegexp(item[0]).test(url)
        )
        if (tmp) {
          title = tmp[1]
        }
      }
      if (title) {
        return (
          <Breadcrumb.Item key={url}>
            <Link to={url}>{title}</Link>
          </Breadcrumb.Item>
        )
      }

      return null
    })

    return (
      <Breadcrumb style={{ margin: '16px 0px 16px 30px' }}>
        {extraBreadcrumbItems}
      </Breadcrumb>
    )
  }
}

export default withRouter(Bread)
