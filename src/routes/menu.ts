export default [
  {
    path: '/',
    redirect: '/gl/torus'
  },
  {
    path: '/gl',
    icon: 'idcard',
    title: 'shader',
    children: [
      {
        path: '/gl/torus',
        title: 'torus'
      },
      {
        path: '/gl/torus1',
        title: 'torus'
      }
    ]
  }
]
