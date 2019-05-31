import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Menu, Icon, Layout } from 'antd'

import { menu } from '@/routes'

const { SubMenu } = Menu
const { Sider } = Layout

interface ISideMenuState {
  collapsed: boolean
  pathname: string
  selectedKeys: string[]
  openKeys: string[]
}

class SideMenu extends Component<any, ISideMenuState> {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState !== nextProps &&
      nextProps.location.pathname !== prevState.pathname
    ) {
      const open = []
      const select = []

      const arr = nextProps.location.pathname.split('/').filter(Boolean)
      if (arr && arr.length) {
        open.push(`/${arr[0]}`)
        select.push(`/${arr[0]}`)
        if (arr.length >= 2) {
          select.push(`/${arr[0]}/${arr[1]}`)
        }
      } else {
        select.push('/')
      }

      return {
        ...prevState,
        pathname: nextProps.location.pathname,
        openKeys: open,
        selectedKeys: select
      }
    }
    return null
  }

  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      pathname: '',
      selectedKeys: [],
      openKeys: []
    }
  }

  // 递归生成左侧菜单树
  recurMenu = routerArr =>
    routerArr.map(item => {
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu
            key={item.path}
            onTitleClick={this.handleSubMenuChange}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.recurMenu(item.children)}
          </SubMenu>
        )
      }

      if (item.path === '/') {
        return ''
      }

      return (
        <Menu.Item key={item.path} onClick={this.handleMenuItemClick}>
          {item.icon && <Icon type={item.icon} />}
          <Link style={{ display: 'inline-block' }} to={item.path}>
            {item.title}
          </Link>
        </Menu.Item>
      )
    })

  handleCollapse = collapsed => {
    this.setState({
      collapsed
    })
  }

  handleSubMenuChange = ({ key }) => {
    this.setState(prevState => {
      if (prevState.openKeys && prevState.openKeys[0] === key) {
        return {
          openKeys: []
        }
      }

      return {
        openKeys: [key]
      }
    })
  }

  handleMenuItemClick = ({ key }) => {
    this.setState({ selectedKeys: [key] })
  }

  render() {
    return (
      <Sider
        style={{ background: '#2C344D' }}
        collapsible={true}
        collapsed={this.state.collapsed}
        onCollapse={this.handleCollapse}
      >
        <Menu
          mode="inline"
          selectedKeys={this.state.selectedKeys}
          openKeys={this.state.openKeys}
          theme="dark"
        >
          {this.recurMenu(menu)}
        </Menu>
      </Sider>
    )
  }
}

export default withRouter(SideMenu)
