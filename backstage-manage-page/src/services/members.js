/**
 * 2018-04-20 Jifeng Cheng
 */

import request from '../utils/request';

export async function getMembers(params) {
  return request({
    url: '/getMember',
    method: 'post',
    data: 'params',
  })
}

export async function deleteMembers(payload) {
  return request({
    url: '/deleteMembers',
    method: 'post',
    data: payload
  })
}
