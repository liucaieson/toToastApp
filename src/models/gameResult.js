// 查询比赛结果
import { matchQuery, getAllCompetitions } from '@/services/api';

export default {
  namespace: 'gameResult',

  state: {
    data: [],
    competitions: []
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const data = yield call(matchQuery, payload);
      yield put({
        type: 'save',
        payload: data,
      });
      if (callback) callback(data)
    },
    // 赛果的中所有的联赛
    *fetchAllCompetitions({ payload, callback }, { call, put }) {
      const data = yield call(getAllCompetitions, payload);
      yield put({
        type: 'saveCompetitions',
        payload: data,
      });
      if (callback) callback(data)
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: payload
      };
    },
    saveCompetitions(state, { payload }) {
      return {
        ...state,
        competitions: payload
      };
    },
  },
};
