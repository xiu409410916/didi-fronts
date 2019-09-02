import request from '@/utils/request'

// 按条件分页查询
export function queryList(query) {
  return request({
    url: '/patientinfo/queryPage',
    method: 'post',
    data: query
  })
}


//新增
export function addTime(query) {
  return request({
    url: '/patientinfo/addTime',
    method: 'post',
    data: query
  })
}
