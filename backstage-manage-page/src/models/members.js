/**
 * 2018-04-20 Jifeng Cheng
 */

import { message } from 'antd';

import { getMember, getAllMembers, deleteMembers, modifyMembers } from '../services/members';

export default {
  namespace: 'members',

  state: {
    data: [],
    current: 1,
    modifyInfo: null,
  },

  effects: {
    *getAllMember({ payload }, { call, put, select }) {
      const res = yield call(getAllMembers);
      console.log('dasdasd', res);
      yield put({
        type: 'getMember',
        payload: res,
      })
    },

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
    },

    *modifyMember({ payload }, { call, put, select }) {
      const res = yield call(modifyMembers, payload);
      if(res === 'success') {
        message.success('修改成功！');
        const current = yield select(state => state.members.current);
        const data = { 'current': current };
        const refreshInfos = yield call(getMember, data);
        yield put({
          type: 'updateMembers',
          payload: refreshInfos
        })
      } else {
        message.error('修改失败！');
      }
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
    },
  }
}
