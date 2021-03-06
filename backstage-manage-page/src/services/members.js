/**
 * 2018-04-20 Jifeng Cheng
 */

import request from '../utils/request';

export async function getAllMembers(params) {
  return request({
    url: '/getMembers',
    method: 'post',
    data: params,
  })
}

export async function getMember(params) {
  return request({
    url: '/getMember',
    method: 'post',
    data: params,
  })
}

export async function deleteMembers(payload) {
  return request({
    url: '/deleteMembers',
    method: 'post',
    data: payload
  })
}

export async function modifyMembers(payload) {
  return request({
    url: 'updateMembers',
    method: 'post',
    data: payload,
  })
}
