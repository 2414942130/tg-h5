/*
 * @Description:
 * @Author: huiLong.lan
 * @Date: 2024-05-07 10:46:41
 * @LastEditors: huiLong.lan
 * @LastEditTime: 2025-04-24 15:56:05
 */

const backendMap = {
  0: '/api_test', // 机器ren
  1: '/api_middleware', // 中间件
  2: '/api_production', // 线上
  3: '/api_face' // 人脸
}
const isProductionEnv = process.env.NODE_ENV === 'production'

export const BASE_URL = isProductionEnv ? '' : backendMap[0]

export const buildUrl = (url: string, useBaseUrl = true) => (useBaseUrl ? `${BASE_URL}${url}` : url)
