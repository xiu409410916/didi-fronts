import request from '@/utils/request'

// 按条件分页查询
export function queryList(query) {
  return request({
    url: '/inquirygeneinfo/queryPage',
    method: 'post',
    data: query
  })
}

// 查询单个
export function getOneByEntity(query) {
  return request({
    url: '/inquirygeneinfo/getOneByEntity',
    method: 'post',
    data: query
  })
}
