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
