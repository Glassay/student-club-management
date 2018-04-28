/**
 * 2018-04-20 Jifeng Cheng
 */

import { routerRedux } from 'dva/router';
import { message } from 'antd';

import { adminLogin } from '../services/login';

export default {
  namespace: 'login',

  state: {
  },

  effects: {
    * adminLogin({ payload }, { call, put, select }) {
      console.log('payload>>>>>', payload)
      const result = yield call(adminLogin, payload);
      console.log('result>>>>.', result);
      if(result === 'success') {
        yield put(routerRedux.push('/management'))
      } else {
        message.error('用户名或密码错误！');
      }
    }
  },

  reducers: {
  }
}