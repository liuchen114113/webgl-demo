import React, { Component } from 'react'
import { Switch, Redirect } from 'react-router-dom'
import moment from 'moment'
import { LocaleProvider, Layout } from 'antd'
import antZhCN from 'antd/lib/locale-provider/zh_CN'

import { renderRouter } from '@/routes'
import HeaderBar from '@/components/HeaderBar'
import SideMenu from '@/components/SideMenu'
import Bread from '@/components/Bread'

const { Content } = Layout

interface IMainState {
  name: string
}

export default class Main extends Component<any, IMainState> {
  antLocale: any

  constructor(props) {
    super(props)
    this.state = {
      name: 'main'
    }
    this.initLocale()
  }

  initLocale = () => {
    this.antLocale = antZhCN
    moment.locale('zh-cn')
  }

  render() {
    return (
      <LocaleProvider locale={this.antLocale}>
        <Layout style={{ height: '100%' }}>
          <HeaderBar />
          <Layout>
            <SideMenu />
            <Content>
              <Bread />
              <Switch>
                {renderRouter()}
                <Redirect to="/" />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </LocaleProvider>
    )
  }
}
