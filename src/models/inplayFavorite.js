import {getFavorite } from '@/services/api';

export default {
  namespace: 'inPlayFavorite',

  state: {
    favMatchIds: [],
    favMatchObj: {},
    favCptIds: [],
    favMatchListObj: {},
  },

  effects: {
    *fetchFavorite({payload, callback}, { call, put, select }) {
      let data = yield call(getFavorite, payload);
      const matchIds=[];
      const matchObj = {};
      data.forEach((item) => {
        if(matchIds.includes(item.cptId)){
          matchObj[item.matchId].push(item)
        }else{
          matchIds.push(item.matchId);
          matchObj[item.matchId] = [];
          matchObj[item.matchId].push(item)
        }
      });
      yield put({
        type: 'saveData/saveData',
        payload: data,
      });
      yield put({
        type: 'save',
        payload: {
          matchIds,
          matchObj
        },
      });
      if(callback) callback()
    },
    *addFav({payload, callback}, { call, put, select }) {
      let matchIds = yield select( state => state.inPlayFavorite.favMatchIds);
      let matchObj = yield select( state => state.inPlayFavorite.favMatchObj);
      matchIds.push(payload.matchId);
      matchObj[payload.matchId]  = payload.matchData;

      yield put({
        type: 'save',
        payload: {
          matchIds,
          matchObj
        },
      });
      if(callback) callback()
    },
    *removeFav({payload, callback}, { call, put, select }) {
      let matchIds = yield select( state => state.inPlayFavorite.favMatchIds);
      let matchObj = yield select( state => state.inPlayFavorite.favMatchObj);
      const index = matchIds.indexOf(payload.matchId);
      if (index > -1) {
        delete matchObj[payload.matchId];
        matchIds.splice(index, 1);
      }
      yield put({
        type: 'save',
        payload: {
          matchIds,
          matchObj
        },
      });
      if(callback) callback()
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        favMatchIds: payload.matchIds,
        favMatchObj: payload.matchObj
      };
    },
  },
};
