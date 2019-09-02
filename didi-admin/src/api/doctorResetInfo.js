import request from '@/utils/request'

// 按条件分页查询
export function queryList(query) {
  return request({
    url: '/doctorresetinfo/queryPage',
    method: 'post',
    data: query
  })
}

// 重置密码
export function resetPassword(query) {
  return request({
    url: '/doctorresetinfo/resetPassword',
    method: 'post',
    data: query
  })
}
