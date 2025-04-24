/*
 * @Description:
 * @Author: huiLong.lan
 * @Date: 2024-05-07 10:50:54
 * @LastEditors: huiLong.lan
 * @LastEditTime: 2025-04-24 15:55:26
 */
import request from '@/utils/request'
import { buildUrl } from '@/utils/backendMap'

/**
 * buildUrl机器人
 * buildUrl2中间间11
 * buildUrl3 业务系统
 */
export function openChat(data: any) {
  return request.postUrlEncode(buildUrl('/api/cloud/csc/admin/open/chat'), data)
}
