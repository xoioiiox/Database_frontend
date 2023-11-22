// 配置路由相关的信息
import VueRouter from 'vue-router'
import Vue from 'vue'

import managerCheckApply from './views/apply/managerCheckApply'
import checkApplyManager from './views/apply/checkApplyManager'
import checkApplyMember from './views/apply/checkApplyMember'

import createProject from './views/project/createProject'
import projectInfo from './views/project/projectInfo'

import mainHome from './views/home/mainHome'
import managerHome from './views/home/managerHome'
import sysManagerHome from './views/home/sysManagerHome'

import myMessage from './views/message/myMessage'
import newMessage from './views/message/newMessage'

import createTeam from './views/team/createTeam'
import teamHome from './views/team/teamHome'
import teamInfo from './views/team/teamInfo'
import checkTeams from './views/team/checkTeams'

import registerPage from './views/welcome/registerPage'
import logIn from './views/welcome/logIn'

import userPage from './views/user/userPage'
import joinedProject from './views/user/joinedProject'
import joinedTeam from './views/user/joinedTeam'
 
// 1.通过Vue.use(插件), 安装插件
Vue.use(VueRouter)

// 解决 ElementUI 导航栏中的 vue-router 在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
 
// 2.创建VueRouter对象
const routes = [
  {
    path: '',
    // redirect重定向
    redirect: '/login/'
  },
  {
    path: '/login/',
    component: logIn
  },
  {
    path: '/register/',
    component: registerPage
  },
  {
    path: '/home',
    component: mainHome
  },
  {
    path: '/managerHome',
    component: managerHome
  },
  {
    path: '/sysManagerHome',
    component: sysManagerHome
  },
  {
    path: '/user_page/',
    component: userPage
  },
  {
    path: '/createProject/',
    component: createProject
  },
  {
    path: '/createTeam',
    component: createTeam
  },
  {
    path: '/check_teams',
    component: checkTeams
  },
  {
    path: '/check_message/',
    component: myMessage
  },
  {
    path: '/project/:id',
    component: projectInfo
  },
  {
    path: '/joined_project/',
    component: joinedProject
  },
  {
    path: '/joined_team/',
    component: joinedTeam
  },
  {
    path: '/team_home/',
    component: teamHome
  },
  {
    path: '/team/:id',
    component: teamInfo
  },
  {
    path: '/check_apply',
    component: managerCheckApply
  },
  {
    path: '/check_apply_manager/',
    component: checkApplyManager
  },
  {
    path: '/check_apply_member/',
    component: checkApplyMember
  },
  {
    path: '/new_message/',
    component: newMessage
  }
]
const router = new VueRouter({
  // 配置路由和组件之间的应用关系
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})
 
// 3.将router对象传入到Vue实例
export default router
 