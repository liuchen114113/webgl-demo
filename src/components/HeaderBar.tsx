import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout } from 'antd'

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
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            flex: '1'
          }}
        />
      </Header>
    )
  }
}

export default withRouter(HeaderBar)
