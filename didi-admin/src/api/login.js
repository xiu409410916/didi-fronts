import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/ex/userLogin',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function logout() {
  return request({
    url: '/ex/logout',
    method: 'post'
  })
}

export function getMenuByUserId(param) {
  return request({
    url: '/sysauthorities/findList',
    method: 'post',
    data: param
  })
}

// export function getLoginInfo() {
//   return request({
//     url: '/sysusers/getOneByLogin',
//     method: 'post'
//   })
// }
//
// export function changePartner(query) {
//   return request({
//     url: '/sysusers/changePartner',
//     method: 'post',
//     data: query,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
// }
