// 出去半场全场和最先进球的之外的玩法数据
import { getPreMatchOdds } from '@/services/api';

export default {
  namespace: 'asianGG',

  state: {
    cptIds: [],
    matchListObj: {},
    count: 1,
    current: 1
  },

  effects: {
    *fetchMatchOdds({ payload, callback }, { call, put }) {
      const result = yield call(getPreMatchOdds, { ...payload, size: 40 });
      const cptIds = [];
      const matchListObj = {};
      const { data, count, current } = result;
      data.forEach((item) => {
        if (cptIds.includes(item.cptId)) {
          matchListObj[item.cptId].push(item)
        } else {
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
          matchListObj,
          count,
          current
        },
      });
      if (callback) callback(result)
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        cptIds: payload.cptIds,
        matchListObj: payload.matchListObj,
        count: payload.count,
        current: payload.current
      };
    },
  },
};
