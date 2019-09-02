import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

// download url
const downloadUrl = url => {
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['token'] = getToken()
    }

    store.dispatch('showloader')
    if (config.url.indexOf('login') > 0) return config;

    const contentType = config.headers['Content-Type']
    // application/json application/x-www-form-urlencoded
    config.headers['Content-Type'] = contentType ? contentType : 'application/x-www-form-urlencoded'
    //form提交
    if (config.headers['Content-Type'] == 'application/x-www-form-urlencoded') {
      let ret = ''
      for (let it in config.data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(config.data[it]) + '&'
      }
      config.data = ret;
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    store.dispatch('hideloader')
    // 处理excel文件
    // if (response.headers && (response.headers['content-type'] === 'application/vnd.ms-excel;charset=UTF-8' || response.headers['content-type'] === 'application/octet-stream;charset=UTF-8')) {
    //   downloadUrl(response.request.responseURL+"?"+response.config.data)//+"?year=2018&month=06"
    //   response.data='';
    //   response.headers['content-type'] = 'text/json'
    //   return response;
    // }
    if(response.status==200){
      //返回的数据处理
      const str = JSON.stringify(response);
      if (str.indexOf('errorCode') > -1) {
        const res = JSON.parse(str).data
        if (res.errorCode == "SUCCESS") {
          return Promise.resolve(res)
        } else if (res.errorCode == "E007") {
          store.dispatch('LogOut').then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
          return false
        } else {
          Message({
            message: res.message,
            type: 'error',
            duration: 5 * 1000
            })
          if(response.config.type=='error'){
              return Promise.resolve(response.data)
          }
          return Promise.reject(res.message)
        }
      } else {
        return Promise.resolve(JSON.parse(str))
      }
    }
  },
  error => {
    store.dispatch('hideloader')
    if(error.response.status==404){
      window.location.href = '/404'
    }else if(error.response.status==413){
        Message({
          message: "文件过大～",
          type: 'error',
          duration: 5 * 1000
        })
    }else{
      Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
