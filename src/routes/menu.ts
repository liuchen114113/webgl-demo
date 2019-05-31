export default [
  {
    path: '/',
    redirect: '/gl/ring'
  },
  {
    path: '/gl',
    icon: 'idcard',
    title: 'shader',
    children: [
      {
        path: '/gl/ring',
        title: '指环'
      },
      {
        path: '/gl/ring1',
        title: '指环'
      }
    ]
  }
]
