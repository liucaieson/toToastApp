/* 联赛接口，主要是联赛modal的数据 */
import { getCompetitions } from '@/services/api';

export default {
  namespace: 'competitions',

  state: {
    competitions:[],
    competitionsModalList:[],
    areaId:[],
    competitionsObj:{}
  },

  effects: {
    *fetch({payload, callback}, { call, put, select }) {
      let data = yield call(getCompetitions, payload);
      yield put({
        type: 'save',
        payload: data,
      });
      if(callback) callback(data)
    },
    *fetchModalList({payload, callback}, { call, put, select }) {
      let data = yield call(getCompetitions, payload);
      let  competitionsObj= {};
      let areaId = [];
      data.forEach((val) => {
        if(areaId.includes(val.areaId)){
          competitionsObj[val.areaId].push(val)
        }else{
          areaId.push(val.areaId);
          competitionsObj[val.areaId] = [];
          competitionsObj[val.areaId].push(val)
        }
      });
      yield put({
        type: 'saveModal',
        payload: {
          data,
          competitionsObj,
          areaId
        },
      });
      if(callback) callback(data)
    },
    *toggle({payload, callback}, { call, put, select }) {
      yield put({
        type: 'save',
        payload: payload,
      });
      if(callback) callback()
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
        competitionsModalList: payload.data,
        areaId: payload.areaId,
        competitionsObj: payload.competitionsObj
      };
    },
  },
};
