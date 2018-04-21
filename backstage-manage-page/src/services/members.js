/**
 * 2018-04-20 Jifeng Cheng
 */

import request from '../utils/request';

export async function getMembers(params) {
  return request({
    url: '/members',
    method: 'get',
    data: 'params',
  })
}
