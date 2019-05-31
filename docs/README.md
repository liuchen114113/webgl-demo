## 数据驱动视图

- 全局 model
- 不用关心父子模块，将模块之间的联系放到 model 里去维护，更倾向于维护数据而不是维护模块
- 每个模块的改变全部交给 model
- 每个模块无需关注其他模块的变化，只需要关注 model 里面对应自己数据的变化
- 数据流：模块 -> model -> 其他模块

## 新增一个页面

- 在 [modules](../src/modules) 里新增一个页面，页面基础代码可以从 [Empty.tsx](../src/modules/Sample/Empty.tsx) 拷贝、
  - [Sample](../src/modules/Sample) 目录也有一些示例页面，通过代码演示了如何使用本项目的技术栈来实现业务
- 在 [menu.ts](../src/routes/menu.ts) 里新增菜单，新增的菜单如果不希望出现在导航里，可以放在 `hidden` 数组里
- 在 [loadable.tsx](../src/routes/loadable.tsx) 里新增路由
- 到此一个空页面就完成了，剩下的就是开发具体业务

## 实现一个模块

- 在 [api.ts](../src/config/api.ts) 里新增页面需要用到的 api
  - api 配置支持带变量的 url 以实现 restful 接口
  - url 带变量时，使用 [request.ts](../src/common/request.ts) 里的 `rest` 请求接口
  - url 不带变量时，使用 [request.ts](../src/common/request.ts) 里的 `request` 请求接口
- 在 [models](../src/models) 目录增加对应的数据 model
  - model 分为三个部分:`state`，`reducers`，`effects`
  - state 是对应页面的数据，一般仅放会变的数据
  - reducers 是一些纯函数，用来改变 state
  - effects 是一些非纯函数，一般会把 ajax 请求放到这里
- 在业务页面里，增加 `mapState` 及 `mapDispath` 将 state, reducer, effect 映射到到 props 里
- 关于 loading
  - 不需要自己额外在 state 里增加 loading 字段
  - model 自带 loading，且分为三个级别
    - state.loading.global： 全局 loading
    - state.loading.models.[modelName]: 某个 model 对应的 loading
    - state.loading.effects.[modelName].[funcName]：某个 reducer/effect 对应的 loading
- 将模块使用`connect`导出

```
// TablePage.tsx
interface ITablePageState {
  name: string
}

const mapState = state => ({
  records: state.user.records,
  pagination: state.user.pagination,
  loading: state.loading.effects.user.asyncUserList,
  modalVisible: state.user.modalVisible,
  detail: state.user.userDetail
})

const mapDispatch = ({ user }) => ({
  userList: user.asyncUserList,
  userDelete: user.asyncUserDelete,
  userDetail: user.asyncUserDetail,
  hideModal: user.hideModal
})

class TablePage extends Component<any, ITablePageState> {
  // ...
}

export default connect(
  mapState,
  mapDispatch
)(TablePage)
```
