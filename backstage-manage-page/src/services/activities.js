/**
 * 2018-05-02 Jifeng Cheng
 */

import request from '../utils/request';

export async function getActivities(params) {
  return request({
    url: '/getActivities',
    method: 'post',
    data: params
  })
}

export async function deleteActivities(params) {
  return request({
    url: 'deleteActivities',
    method: 'post',
    data: params
  })
}