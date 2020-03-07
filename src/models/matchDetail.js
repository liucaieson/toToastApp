import { getPreMatchOdds } from '@/services/api';

export default {
  namespace: 'matchDetail',

  state: {
    match:{},
  },

  effects: {
    *fetchMatchOdds({payload, callback}, { call, put, select }) {
      let data = yield call(getPreMatchOdds, payload);
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
        competitionsMatchList: payload
      };
    },
  },
};
