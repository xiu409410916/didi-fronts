import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  let seconds = 1 * 60 * 60;
  let expires = new Date(new Date() * 1 + seconds * 1000);
  return Cookies.set(TokenKey, token,{ expires: expires })
  // return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
