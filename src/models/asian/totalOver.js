/* totalOver为全场进球 */
import { getPreMatchOdds } from '@/services/api';

export default {
  namespace: 'totalOver',

  state: {
    cptIds: [],
    matchListObj: {},
    count:1,
    current:1
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
