/* 查询历史比赛结果 */
import { queryHistory } from '@/services/api';

export default {
  namespace: 'historyBets',

  state: {
    data:[
    ],
    count:1,
    current:1,
    settlementData:[],
    unSettlementData:[],
  },

  effects: {
    *fetch({payload, callback}, { call, put, select }) {
      let data = yield call(queryHistory, payload);
      yield put({
        type: 'save',
        payload: data,
      });
      if(callback) callback(data)
    },
    *fetchSettlement({payload, callback}, { call, put, select }) {
      let data = yield call(queryHistory, payload);
      yield put({
        type: 'saveSettlement',
        payload: data,
      });
      if(callback) callback(data)
    },
    *fetchUnSettlement({payload, callback}, { call, put, select }) {
      let data = yield call(queryHistory, payload);
      yield put({
        type: 'saveUnSettlement',
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
    saveSettlement(state, { payload }) {
      return {
        ...state,
        settlementData: payload.data,
      };
    },
    saveUnSettlement(state, { payload }) {
      return {
        ...state,
        unSettlementData: payload.data,
      };
    },
  },
};
