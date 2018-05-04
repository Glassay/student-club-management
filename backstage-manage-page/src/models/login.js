/**
 * 2018-04-20 Jifeng Cheng
 */

import { routerRedux } from 'dva/router';
import { message } from 'antd';

import { adminLogin } from '../services/login';

export default {
  namespace: 'login',

  state: {
    status: null
  },

  effects: {
    * adminLogin({ payload }, { call, put, select }) {
      console.log('payload>>>>>', payload)
      const result = yield call(adminLogin, payload);
      console.log('result>>>>.', result);
      if(result !== false) {
        if(result === 'manager') {
          yield put(routerRedux.push('/management'));
        } else {
          yield put({
            type: 'saveStatus',
            payload: result
          })
          yield put(routerRedux.push('/club'));
        }
      } else {
        message.error('用户名或密码错误！');
      }
    }
  },

  reducers: {
    saveStatus(state, { payload }) {
      return {
        ...state,
        status: payload,
      }
    }
  }
}
