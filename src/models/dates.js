// 获取日期接口，用来给比赛赔率请求日期
import { getDates } from '@/services/api';

export default {
  namespace: 'dates',

  state: {
    dates: [

    ]
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const data = yield call(getDates, payload);
      yield put({
        type: 'save',
        payload: data,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        dates: payload
      };
    },
  },

};
