import { getPreCommandMatch } from '@/services/api';

export default {
  namespace: 'commandMatch',

  state: {
    matchList:[]
  },

  effects: {
    *fetchMatchOdds({payload, callback}, { call, put, select }) {
      let data = yield call(getPreCommandMatch, payload);
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
        matchList:payload
      };
    },
  },
};
