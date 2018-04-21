/**
 * 2018-04-20 Jifeng Cheng
 */

import { getMembers } from '../services/members';

export default {
  namespace: 'members',

  state: {
    data: [],
  },

  effects: {
    *getMembers({ payload }, { call, put }) {
      const res = yield call(getMembers)
      console.log('res>>>>>', res);
      yield put({
        type: 'getMember',
        payload: res,
      })
    }
  },

  reducers: {
    getMember(state, action) {
      return {
        ...state,
        data: action.payload,
      }
    }
  }
}
