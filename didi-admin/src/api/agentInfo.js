import request from '@/utils/request'

// 按条件分页查询
export function queryList(query) {
  return request({
    url: '/agentinfo/queryPage',
    method: 'post',
    data: query
  })
}


//按条件查询-返回列表
export function findList(query) {
  return request({
    url: '/agentinfo/findList',
    method: 'post',
    data: query
  })
}

//按条件查询-返回唯一值
export function getOneByEntity(query) {
  return request({
    url: '/agentinfo/getOneByEntity',
    method: 'post',
    data: query
  })
}


//新增
export function add(query) {
  return request({
    url: '/agentinfo/add',
    method: 'post',
    data: query
  })
}



// 编辑
export function edit(query) {
  return request({
    url: '/agentinfo/edit',
    method: 'post',
    data: query
  })
}


//审核供应商信息
export function auditAgentInfo(query) {
  return request({
    url: '/agentinfo/auditAgentInfo',
    method: 'post',
    data: query
  })
}


//升级为一级代理
export function updateAgentLevel(query) {
  return request({
    url: '/agentinfo/updateAgentLevel',
    method: 'post',
    data: query
  })
}
