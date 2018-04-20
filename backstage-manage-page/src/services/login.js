/**
 * 2018-04-20 Jifeng Cheng
 */

import request from '../utils/request';

export async function adminLogin(params) {
  return request({
    url: '/login',
    method: 'post',
    data: params,
  });
}
