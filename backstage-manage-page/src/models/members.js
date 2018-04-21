/**
 * 2018-04-20 Jifeng Cheng
 */

import { getMembers } from '../services/members';

export default {
  namespace: 'members',

  state: {
    data: [],
    current: 1,
  },

  effects: {
    *getMembers({ payload }, { call, put, select }) {
      const res = yield call(getMembers)
      console.log('res>>>>>', res);
      yield put({
        type: 'getMember',
        payload: res,
      })
    },

    *changeCurrent({ payload }, { call, put, select }) {
      yield put({
        type: 'getCurrent',
        payload,
      })
    }
  },

  reducers: {
    getMember(state, { payload }) {
      return {
        ...state,
        data: payload,
      }
    },

    getCurrent(state, { payload }) {
      return {
        ...state,
        current: payload,
      }
    }
  }
}
