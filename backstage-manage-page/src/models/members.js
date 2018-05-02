/**
 * 2018-04-20 Jifeng Cheng
 */

import { message } from 'antd';

import { getMember, getMembers, deleteMembers } from '../services/members';

export default {
  namespace: 'members',

  state: {
    data: [],
    current: 1,
  },

  effects: {
    *getMembers({ payload }, { call, put, select }) {
      const current = yield select(state => state.members.current)
      const data = { 'current': current };
      console.log('payload>>>>>>', data);
      const res = yield call(getMember, data)
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
        const current = yield select(state => state.members.current);
        const data = { 'current': current };
        const refreshData = yield call(getMember, data);
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
      const current = yield select(state => state.members.current);
      const data = { 'current': current };
      const res = yield call(getMember, data);
      yield put({
        type: 'getMember',
        payload: res
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
