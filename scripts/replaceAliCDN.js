/**
 * author: shuisheng.zhang
 * createTime: 2018/7/9 上午9:50
 * description: 替换掉 antd 和 react-intl-universal 里面的公网链接(alicdn)
 */
const walk = require('walk')
const fs = require('fs')
const path = require('path')

const replaceArr = [
  {
    pattern: 'https://at.alicdn.com/t/font_148784_v4ggb6wrjmkotj4i',
    value: '/antd/iconfont'
  },
  {
    pattern: 'https://g.alicdn.com/react-intl-universal/locale-data/1.0.0/',
    value: '/antd/'
  }
]
const dist = path.join(__dirname, '../dist')
const options = {
  followLinks: false
}
const walker = walk.walk(dist, options)

walker.on('file', (root, fileStats, next) => {
  const filePath = `${root}/${fileStats.name}`
  const content = fs.readFileSync(filePath, 'utf8')
  replaceArr.forEach(item => {
    if (content.includes(item.pattern)) {
      console.log('find alicdn:', filePath)
      const reg = new RegExp(item.pattern, 'g')
      const newStr = content.replace(reg, item.value)
      fs.writeFileSync(filePath, newStr, 'utf8')
    }
  })
  next()
})

walker.on('errors', (root, nodeStatsArray, next) => {
  console.log('errors:', nodeStatsArray)
  next()
})

walker.on('end', () => {
  console.log('replaceAliCDN done')
})
