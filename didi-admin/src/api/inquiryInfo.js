import request from '@/utils/request'

// 按条件分页查询
export function queryList(query) {
  return request({
    url: '/inquiryinfo/queryPage',
    method: 'post',
    data: query
  })
}

// 查询单个
export function getOneByEntity(query) {
  return request({
    url: '/inquiryinfo/getOneByEntity',
    method: 'post',
    data: query
  })
}
