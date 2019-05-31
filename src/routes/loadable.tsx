import React from 'react'
import ReactLoadable from 'react-loadable'
import Loading from '@/components/Loading'

const loadWrapper = loader =>
  ReactLoadable({ loader, loading: Loading, timeout: 5000 })

const DemoPage = loadWrapper(() => import('@/modules/DemoPage'))


const Loadable = path => {
  switch (path) {
    case '/gl/demo-01':
      return () => <DemoPage />
    default:
      return () => <DemoPage />
  }
}

export default Loadable
