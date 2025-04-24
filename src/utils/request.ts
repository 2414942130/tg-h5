/*
 * @Description: request
 * @Author: huiLong.lan
 * @Date: 2024-05-07 10:40:58
 * @LastEditors: huiLong.lan
 * @LastEditTime: 2025-04-24 15:52:50
 */

import axios from 'axios'
import qs from 'qs'
import { showToast, showFailToast } from 'vant'
// import { userAppStore } from '@/stores/appStore'

// CancelToken能为一次请求‘打标识’
// isCancel用于判断请求是不是被CancelToken取消的
const { CancelToken, isCancel } = axios
// 请求队列，缓存发出的请求
const cacheRequest: Record<string, any> = {}

const service = axios.create({ timeout: 50000 })

service.interceptors.request.use(
  (config) => {
    const { url, method } = config
    // 请求地址和请求方式组成唯一标识，将这个标识作为取消函数的key，保存到请求队列中
    const reqKey = `${url}&${method}`
    // 如果存在重复请求，删除之前的请求
    removeCacheRequest(reqKey)
    // 将请求加入请求队列
    config.cancelToken = new CancelToken((c) => {
      cacheRequest[reqKey] = c
    })
    // const userStore = userAppStore()
    // const { libraryCode = null } = userStore?.userInfo || {}
    // config.headers = { ...config.headers }

    return config // 将配置完成的config对象返回出去 如果不返回 请求则不会进行
  },
  (err) => {
    showFailToast(err.msg)

    // 请求发生错误时的处理 抛出错误
    Promise.reject(err)
  }
)
service.interceptors.response.use(
  (res) => {
    // 我们一般在这里处理，请求成功后的错误状态码 例如状态码是500，404，403
    // res 是所有相应的信息
    // console.log('response', res)
    const { url, method } = res.config
    removeCacheRequest(`${url}&${method}`)
    const { code } = res.data
    const { msg } = res.data
    if (code === 0) {
      return res.data
    }
    if (code === 403) {
      showFailToast(msg)
      return Promise.reject(new Error(msg))
    }
    if (code === 401) {
      showFailToast(msg)
      return Promise.reject(new Error(msg))
    }
    showFailToast(msg)
    return Promise.reject(new Error(msg))
  },
  (err) => {
    // 服务器响应发生错误时的处理
    // 请求失败，使用isCancel来区分是被CancelToken取消，还是常规的请求失败
    if (isCancel(err)) {
      // 通过CancelToken取消的请求不做任何处理
      return Promise.reject({
        message: '重复请求，自动拦截并取消'
      })
    }
    // 正常请求发生错误,抛出异常等统一提示
    console.log('err', err)
    showFailToast(err.msg)

    return Promise.reject(err)
  }
)

/**
 * @desc 删除缓存队列中的请求
 * @param {String} reqKey 本次请求的唯一标识 url&method
 */
function removeCacheRequest(reqKey: string) {
  if (cacheRequest[reqKey]) {
    // 这里调用的就是上面的CancelToken生成的c函数，调用就会取消请求
    cacheRequest[reqKey]()
    delete cacheRequest[reqKey]
  }
}
/**
 *
 * @param url {string}
 * @param data {Record<string,any>}
 * @param config {import('axios').AxiosRequestConfig}
 * @returns {import('axios').AxiosPromise}
 */
service.postUrlEncode = function (url, data, config = {}) {
  return service.post(url, qs.stringify(data), config)
}
export default service
