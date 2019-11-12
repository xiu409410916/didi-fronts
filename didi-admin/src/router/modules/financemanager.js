import Layout from '@/views/layout/Layout'


const financeManageRouter = {
  path: '/financemanager',
  component: Layout,
  redirect: '/financemanager',
  name: 'financemanager',
  meta: {
    title: '财务管理',
    icon: 'list',
    noCache: true
  },
  children: [
    // {
    //   path: 'patientPayInfo',
    //   component: () => import('@/views/patientPayInfo/list'),
    //   name: 'patientPayInfo',
    //   meta: {  title: '患者交易列表', icon: 'list', noCache: true}
    // },
    {
      path: 'inquiryInfo',
      component: () => import('@/views/inquiryInfo/list'),
      name: 'inquiryInfo',
      meta: {  title: '患者问诊列表', icon: 'list', noCache: true}
    },
     {
      path: 'inquiryDetail',
      component: () => import('@/views/inquiryInfo/components/inquiryDetail'),
      name: 'inquiryDetail',
      meta: {  title: '问诊记录详情', icon: 'list', noCache: true},
      hidden: true
    },
    {
      path: 'doctorWithdrawInfo',
      component: () => import('@/views/doctorWithdrawInfo/list'),
      name: 'doctorWithdrawInfo',
      meta: {  title: '医生提现列表', icon: 'list', noCache: true}
    }
    // {
    //   path: 'agentWithdrawInfo',
    //   component: () => import('@/views/agentWithdrawInfo/list'),
    //   name: 'agentWithdrawInfo',
    //   meta: {  title: '代理商打款', icon: 'list', noCache: true}
    // }

  ]
}

export default financeManageRouter
