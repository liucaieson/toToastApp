/* 查询这场比赛的所有盘口AllGG */
import { getPreMatchOddsAllGG } from '@/services/api';

export default {
  namespace: 'matchAllOdds',

  state: {
    matchAllOdds:[]
  },

  effects: {
    *fetch({payload, callback}, { call, put, select }) {
      let data = yield call(getPreMatchOddsAllGG, payload);
      yield put({
        type: 'saveData/saveData',
        payload: data,
      });
      yield put({
        type: 'save',
        payload: data,
      });
      if(callback) callback()
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
