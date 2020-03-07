/* doubleResult为同时选择全场和半场赛果为“全场/半场” */
import { getPreMatchOdds } from '@/services/api';
import { normalizeData } from '../../utils/util';

export default {
  namespace: 'doubleResult',

  state: {
    competitionsMatchList:[],
    matchList:{},
    oddsList:{}
  },

  effects: {
    *fetchMatchOdds({payload, callback}, { call, put, select }) {
      let data = yield call(getPreMatchOdds, payload);
     /* 半场全场玩法数据根据name改造成map，关键数据odds[0].chs.list*/
     /* let copyData = JSON.parse(JSON.stringify(data));
      copyData.forEach(item => {
        item.odds[0].chs.list = normalizeData(item.odds[0].chs, 'name');
      });*/
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
