/* 查询历史比赛结果 */
import { queryHistory } from '@/services/api';

export default {
  namespace: 'historyBets',

  state: {
    data:[
    ],
    count:1,
    current:1
  },

  effects: {
    *fetch({payload, callback}, { call, put, select }) {
      let data = yield call(queryHistory, payload);
      yield put({
        type: 'save',
        payload: data,
      });
      if(callback) callback(data)
    }
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: payload.data,
        count:payload.count,
        current:payload.current
      };
    },
  },
};
