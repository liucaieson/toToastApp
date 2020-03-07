import { getPreMatchOdds } from '@/services/api';

export default {
  namespace: 'todayDouble',

  state: {
    cptIds: [],
    matchListObj: {}
  },

  effects: {
    *fetchMatchOdds({payload, callback}, { call, put, select }) {
      let data = yield call(getPreMatchOdds, payload);
      const cptIds=[];
      const matchListObj = {};
      data.forEach((item) => {
        if(cptIds.includes(item.cptId)){
          matchListObj[item.cptId].push(item)
        }else{
          cptIds.push(item.cptId);
          matchListObj[item.cptId] = [];
          matchListObj[item.cptId].push(item)
        }
      });
      yield put({
        type: 'saveData/saveData',
        payload: data,
      });
      yield put({
        type: 'save',
        payload: {
          cptIds,
          matchListObj
        },
      });
      if(callback) callback()
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        cptIds: payload.cptIds,
        matchListObj: payload.matchListObj
      };
    },
  },
};
