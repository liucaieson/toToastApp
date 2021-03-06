// pc端玩法gg6和gg=7 全场全场和最先进球的数据
import { getPreMatchOdds } from '@/services/api';

export default {
  namespace: 'asianTodayGG6And7',

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
          item.odds.map((val) => {
            const list = {};
            val.chs.forEach((chsItem) => {
              list[chsItem.name] = chsItem
            });
            val.chs.list = list
          });
          matchListObj[item.cptId].push(item)
        } else {
          cptIds.push(item.cptId);
          matchListObj[item.cptId] = [];
          item.odds.map((val) => {
            const list = {};
            val.chs.forEach((chsItem) => {
              list[chsItem.name] = chsItem
            });
            val.chs.list = list
          });
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
