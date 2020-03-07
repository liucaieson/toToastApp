import {getInPLay } from '@/services/api';

export default {
  namespace: 'inPlay',

  state: {
    cptIds: [],
    matchListObj: {},
    inPlayAllOdds: [{}]
  },

  effects: {
    *fetchMatchOdds({payload, callback}, { call, put, select }) {
      let data = yield call(getInPLay, payload);
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
          data,
          cptIds,
          matchListObj
        },
      });
      if(callback) callback()
    },
    *fetchMatchAllOdds({payload, callback}, { call, put, select }) {
      let data = yield call(getInPLay, payload);
      yield put({
        type: 'saveData/saveData',
        payload: data,
      });
      yield put({
        type: 'saveAllOdds',
        payload: data,
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
    saveAllOdds(state, { payload }) {
      return {
        ...state,
        inPlayAllOdds: payload
      };
    },
  },
};
