/**
 * axios 配置
 */
import axios from 'axios'
import { Message } from 'element-ui'

axios.defaults.timeout = 30 * 1000

export const baseURL = {
  local: 'http://127.0.0.1:10225',
  shuiku: 'http://192.168.8.142:10225',
  rk225: 'http://10.10.10.225:10225',
  bt226: 'http://10.10.10.226:10225',
  bt119: 'http://10.10.10.119:10225',
}.bt226
axios.defaults.baseURL = baseURL

export const ImageBaseURL = baseURL

export const WSBaseURL = {
  local: 'ws://' + window.location.host + '/api/v1/report/ws/start',
}.local

/**
 * POST请求
 */

export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

/**
 * get请求
 */
export function fetchGet(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then(res => resolve(res.data))
      .catch(err => reject(err.data))
  })
}
