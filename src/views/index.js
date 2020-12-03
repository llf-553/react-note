// 在React环境中，如何实现“代码分割”？

import loadable from '@loadable/component'

const TestJsx = loadable(()=>import('./study/TestJsx'))
const TestProps =loadable(()=>import('./study/TestProps'))
const TestEvent =loadable(()=>import('./study/TestEvent'))

const TestState = loadable(()=>import('./study/TestState'))
const TestCondition = loadable(()=>import('./study/TestCondition'))
const TestList = loadable(()=>import('./study/TestList')) 
const TestForm = loadable(()=>import('./study/TestForm')) 
const TestLife = loadable(()=>import( './study/TestLife'))
const TestLang = loadable(()=>import('./study/TestLang')) 
const TestLift = loadable(()=>import('./study/TestLift')) 
const TestCombine = loadable(()=>import('./study/TestCombine')) 
const TestContext = loadable(()=>import('./study/TestContext')) 
const TestHoc = loadable(()=>import('./study/TestHoc'))
const TestTypes = loadable(()=>import('./study/TestTypes'))
const TestHook = loadable(()=>import('./study/TestHook'))
const MusicList =loadable(()=>import( './music/MusicList'))
const MusicDetail =loadable(()=>import('./music/MusicDetail'))
const TodoList =loadable(()=>import('./todo/TodoList'))
const TestAntd=loadable(()=>import('./antd/TestAntd'))
import { AppstoreOutlined, CustomerServiceOutlined, BgColorsOutlined  } from '@ant-design/icons';

const routes = [
   {
    id: 10,
    text: 'React学习',
    icon: AppstoreOutlined,
    children: [
      {
        id:1010,
        text:'学习JSX',
        path:'/',
        component:TestJsx
    },
    {
        id: 1011,
        text: '学习props',
        path: '/props',
        component: TestProps
    },
    {
        id: 1012,
        text: "事件绑定",
        path: '/event',
        component: TestEvent
    },
    {
        id: 1013,
        text: '学习state',
        path: '/state',
        component: TestState
      },
      {
        id: 1014,
        text: '条件渲染',
        path: '/condition',
        component: TestCondition
      },
      {
        id: 1015,
        text: '列表渲染',
        path: '/list',
        component: TestList
      },
      {
        id: 1016,
        text: '受控表单',
        path: '/form',
        component: TestForm
      },
      {
        id: 1017,
        text: '生命周期',
        path: '/life',
        component: TestLife
      },
      {
        id: 1018,
        text: '类表单',
        path: '/lang',
        component: TestLang
      },
      {
        id: 1019,
        text: '状态提升',
        path: '/lift',
        component: TestLift
      },
      {
        id: 1020,
        text: '组合思想',
        path: '/combine',
        component: TestCombine
      },
      {
        id: 1021,
        text: '上下文',
        path: '/ctx',
        component: TestContext
      },
      {
        id: 1022,
        text: '高阶组件',
        path: '/hoc',
        component: TestHoc
      },
      {
        id: 1023,
        text: '类型检查',
        path: '/types',
        component: TestTypes
      },
      {
        id: 1024,
        text: '使用Hooks',
        path: '/hooks',
        component: TestHook
      },
    ]
   },
   {
    id: 11,
    text: '音乐管理',
    icon:CustomerServiceOutlined,
    children: [
      {
        id: 1125,
        text: '音乐列表',
        path: '/music',
        component: MusicList,
        children:[
          {id:2501,path:'/music/detail/:id/:name',component:MusicDetail}
        ],
        notExact:true
      },
      {
        id: 1126,
        text: 'TodoList',
        path: '/todo',
        component: TodoList
      },
    ]
   },
   {
    id: 12,
    text: 'Antd学习',
    icon:BgColorsOutlined ,
    children: [
      {
        id: 1227,
        text: '使用Antd',
        path: '/antd',
        component: TestAntd
      },
    ]
   }
]

export default routes