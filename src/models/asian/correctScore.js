/* correctScore为波胆，意思是正确比分 */
import { getPreMatchOdds } from '@/services/api';

export default {
  namespace: 'correctScore',

  state: {
    competitionsMatchList:[],
  },

  effects: {
    *fetchMatchOdds({payload, callback}, { call, put, select }) {
      let data = yield call(getPreMatchOdds, payload);

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
        competitionsMatchList: payload
      };
    },
  },
};
