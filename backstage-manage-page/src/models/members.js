/**
 * 2018-04-20 Jifeng Cheng
 */

import { message } from 'antd';

import { getMembers, deleteMembers } from '../services/members';

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

    *deleteMember({ payload }, { call, put, select }) {
      const params = { id: payload };
      const res = yield call(deleteMembers, params)
      console.log('deleteRes>>>>', res);
      if(res === 'success') {
        message.success('删除成功!');
        const refreshData = yield call(getMembers);
        yield put({
          type: 'updateMembers',
          payload: refreshData
        })
      } else {
        message.error('删除失败!');
      }
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

    updateMembers(state, { payload }) {
      return {
        ...state,
        data: payload
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
