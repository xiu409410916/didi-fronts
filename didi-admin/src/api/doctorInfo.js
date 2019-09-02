import request from '@/utils/request'

// 按条件分页查询
export function queryList(query) {
  return request({
    url: '/doctorinfo/queryPage',
    method: 'post',
    data: query
  })
}

// 查询单个
export function getOneByEntity(query) {
  return request({
    url: '/doctorinfo/getOneByEntity',
    method: 'post',
    data: query
  })
}

//审核
export function auditDoctorInfo(query) {
  return request({
    url: '/doctorinfo/auditDoctorInfo',
    method: 'post',
    data: query
  })
}
