// 查询这场比赛的所有盘口
import { getPreMatchOdds } from '@/services/api';

export default {
  namespace: 'matchAllOdds',

  state: {
    matchAllOdds: []
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const result = yield call(getPreMatchOdds, payload);
      const { data } = result;
      yield put({
        type: 'saveData/saveData',
        payload: data,
      });
      yield put({
        type: 'save',
        payload: data,
      });
      if (callback) callback()
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        matchAllOdds: payload
      };
    },
  },
};
