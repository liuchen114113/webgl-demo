import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { Icon, Menu, Dropdown, Layout } from 'antd'

const { Header } = Layout

interface IHeaderBarState {
  userName: string
}

class HeaderBar extends PureComponent<any, IHeaderBarState> {
  state = {
    userName: ''
  }

  clickMenu = ({ key }) => {
    if (key === '1') {
      // cookie.remove('user')
      window.location.href = '/login'
    }
  }

  render() {
    return (
      <Header
        style={{
          background: '#8bbbe6',
          padding: '0',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            width: '200px',
            textAlign: 'center'
          }}
        >
          <span>hobot react antd ts template</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            flex: '1'
          }}
        >
          <div
            style={{
              marginRight: '8px'
            }}
          >
            <Dropdown
              overlay={
                <Menu onClick={this.clickMenu}>
                  <Menu.Item key="1">退出登录</Menu.Item>
                </Menu>
              }
              trigger={['click', 'hover']}
            >
              <span style={{ color: '#fff' }}>
                <Icon
                  type="user"
                  style={{ fontSize: '16px', paddingRight: '10px' }}
                />
                {this.state.userName} <Icon type="down" />
              </span>
            </Dropdown>
          </div>
        </div>
      </Header>
    )
  }
}

export default withRouter(HeaderBar)
