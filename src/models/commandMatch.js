// 推荐玩法的数据
import { getPreCommandMatch } from '@/services/api';

export default {
  namespace: 'commandMatch',

  state: {
    cptIds: [],
    matchListObj: {},
    count: 1,
    current: 1,
  },

  effects: {
    *fetchMatchOdds({ payload, callback }, { call, put }) {
      const result = yield call(getPreCommandMatch, { ...payload, size: 40 });
      const { data, count, current } = result;
      const cptIds = [];
      const matchListObj = {};
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
      if (callback) callback()
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
