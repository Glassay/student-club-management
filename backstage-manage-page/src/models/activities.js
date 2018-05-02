/**
 * 2018-05-02 Jifeng Cheng
 */

import { getActivities } from '../services/activities';

export default {
  namespace: 'activities',

  state: {
    data: [],
  },

  effects: {
    *getActivities({ payload }, { call, put, select}) {
      const res = yield call(getActivities);
      console.log('activities>>>>>', res);
      yield put({
        type: 'getActivitie',
        payload: res
      })
    }
  },

  reducers: {
    getActivitie(state, { payload }) {
      return {
        ...state,
        data: payload
      }
    }
  }
}
