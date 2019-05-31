import React from 'react'
import ReactLoadable from 'react-loadable'
import Loading from '@/components/Loading'

const loadWrapper = loader =>
  ReactLoadable({ loader, loading: Loading, timeout: 5000 })

const Ring = loadWrapper(() => import('@/modules/Ring'))

const Loadable = path => {
  switch (path) {
    case '/gl/ring':
      return () => <Ring />
    default:
      return () => <Ring />
  }
}

export default Loadable
