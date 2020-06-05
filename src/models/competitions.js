// 联赛接口，主要是联赛的数据
import { getCompetitions } from '@/services/api';

export default {
  namespace: 'competitions',

  state: {
    competitions: [],
    areaId: [],
    competitionsObj: {},
    competitionsList: []
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const data = yield call(getCompetitions, payload);
      yield put({
        type: 'save',
        payload: data,
      });
      if (callback) callback(data)
    },
    *fetchModalList({ payload, callback }, { call, put }) {
      const data = yield call(getCompetitions, payload);
      const competitionsObj = {};
      const areaId = [];
      data.forEach((val) => {
        if (areaId.includes(val.areaId)) {
          competitionsObj[val.areaId].push(val)
        } else {
          areaId.push(val.areaId);
          competitionsObj[val.areaId] = [];
          competitionsObj[val.areaId].push(val)
        }
      });
      yield put({
        type: 'saveModal',
        payload: {
          competitionsObj,
          areaId,
          competitionsList: data
        },
      });
      if (callback) callback(data)
    },
    *toggle({ payload, callback }, { put }) {
      yield put({
        type: 'save',
        payload,
      });
      if (callback) callback()
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        competitions: payload
      };
    },
    saveModal(state, { payload }) {
      return {
        ...state,
        areaId: payload.areaId,
        competitionsObj: payload.competitionsObj,
        competitionsList: payload.competitionsList
      };
    },
  },
};
