import React from 'react'
import ReactLoadable from 'react-loadable'
import Loading from '@/components/Loading'

const loadWrapper = loader =>
  ReactLoadable({ loader, loading: Loading, timeout: 5000 })

const Torus = loadWrapper(() => import('@/modules/Torus'))

const Loadable = path => {
  switch (path) {
    case '/gl/torus':
      return () => <Torus />
    default:
      return () => <Torus />
  }
}

export default Loadable
