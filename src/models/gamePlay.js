/* 为玩法，里面保存这早盘，和今日的比赛玩法 */
import { getGg } from '@/services/api';
import moment from 'moment'

export default {
  namespace: 'gamePlay',

  state: {
    asianDish: [],
    todayDish: []
  },

  effects: {
    *fetchAsianDish(_, { call, put, select }) {
      let data = yield call(getGg,{sport: '1'});
      yield put({
        type: 'saveAsianDish',
        payload: data,
      });
    },
    *fetchTodayDish(_, { call, put, select }) {
      let data = yield call(getGg,{sport: '1',date: moment().format('YYYYMMDD')});
      yield put({
        type: 'saveTodayDish',
        payload: data,
      });
    },

  },

  reducers: {
    saveAsianDish(state, { payload }) {
      return {
        ...state,
        asianDish: payload
      };
    },
    saveTodayDish(state, { payload }) {
      return {
        ...state,
        todayDish: payload
      };
    },
  },

};
