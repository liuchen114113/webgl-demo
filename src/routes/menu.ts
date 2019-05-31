export default [
  {
    path: '/',
    redirect: '/gl/demo-01'
  },
  {
    path: '/gl',
    icon: 'idcard',
    title: '示例1',
    children: [
      {
        path: '/gl/demo-01',
        title: 'demo-01'
      },
      {
        path: '/gl/demo-02',
        title: 'demo-02'
      }
    ]
  }
]
