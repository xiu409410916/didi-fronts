import request from '@/utils/request'

// 按条件分页查询
export function queryList(query) {
  return request({
    url: '/patientpayinfo/queryPage',
    method: 'post',
    data: query
  })
}
