/* 公告栏信息 */
import { getMessage } from '@/services/api';

export default {
  namespace: 'announcement',

  state: {
    data: []
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const data = yield call(getMessage, payload);
      yield put({
        type: 'save',
        payload: data,
      });
      if (callback) callback(data)
    }
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: payload
      };
    },
  },
};
