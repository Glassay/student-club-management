/**
 * 2018-05-02 Jifeng Cheng
 */

import { message } from 'antd';

import { getActivities, deleteActivities } from '../services/activities';

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
        type: 'getActivity',
        payload: res
      })
    },

    *deleteActivities({ payload }, { call, put, select }) {
      const params = { id: payload };
      const res = yield call(deleteActivities, params)
      if(res === 'success') {
        message.success('删除成功！')
      } else {
        message.error('删除失败！');
      }
      const refresh = yield call(getActivities);
      yield put({
        type: 'getActivity',
        payload: refresh
      })
    }
  },

  reducers: {
    getActivity(state, { payload }) {
      return {
        ...state,
        data: payload
      }
    }
  }
}
