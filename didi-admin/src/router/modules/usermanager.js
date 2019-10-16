import Layout from '@/views/layout/Layout'


const userManageRouter = {
  path: '/usermanager',
  component: Layout,
  redirect: '/usermanager',
  name: 'usermanager',
  meta: {
    title: '用户管理',
    icon: 'list',
    noCache: true
  },
  children: [
    {
      path: 'patientInfo',
      component: () => import('@/views/patientInfo/list'),
      name: 'patientInfo',
      meta: {  title: '患者列表', icon: 'list', noCache: true}
    },
    {
        path: 'addPatientTime',
        component: () => import('@/views/patientInfo/components/addTime'),
        name: 'addPatientTime',
        meta: {  title: '新增时长', icon: 'list', noCache: true },
        hidden: true
    },
    {
      path: 'doctorInfo',
      component: () => import('@/views/doctorInfo/list'),
      name: 'doctorInfoList',
      meta: {  title: '医生列表', icon: 'list', noCache: true}
    },
    {
      path: 'doctorDetail',
      component: () => import('@/views/doctorInfo/components/doctorDetail'),
      name: 'doctorDetail',
      meta: {  title: '医生详情', icon: 'list', noCache: true },
      hidden: true
    },
    {
      path: 'agentInfo',
      component: () => import('@/views/agentInfo/list'),
      name: 'agentInfo',
      meta: {  title: '供应商列表', icon: 'list', noCache: true}
    },
    {
      path: 'agentDetail',
      component: () => import('@/views/agentInfo/components/agentDetail'),
      name: 'agentDetail',
      meta: {  title: '供应商详情', icon: 'list', noCache: true },
      hidden: true
    },
    {
      path: 'doctorResetInfo',
      component: () => import('@/views/doctorResetInfo/list'),
      name: 'doctorResetInfo',
      meta: {  title: '医生重置密码', icon: 'list', noCache: true }
    },
    {
      path: 'doctorCommentInfo',
      component: () => import('@/views/doctorCommentInfo/list'),
      name: 'doctorCommentInfo',
      meta: {  title: '医生评价列表', icon: 'list', noCache: true }
    }
  ]
}

export default userManageRouter
