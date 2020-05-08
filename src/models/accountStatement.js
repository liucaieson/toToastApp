/* 这里保存用户账变记录 */
import { accountStatement } from '@/services/api';

export default {
  namespace: 'accountStatement',

  state: {
    data: []
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const data = yield call(accountStatement, payload);
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
