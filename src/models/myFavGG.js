/* 用户自己喜欢的盘口 */

export default {
  namespace: 'myFavGG',

  state: {
    myFavGG: []
  },

  effects: {
    *add({payload, callback}, { call, put, select }) {
      let data = yield select( state => state.myFavGG.myFavGG);
      data.push(payload);
      yield put({
        type: 'save',
        payload: data,
      });
      if(callback) callback()
    },
    *del({payload, callback}, { call, put, select }) {
      let data = yield select( state => state.myFavGG.myFavGG);
      const index = data.indexOf(payload);
      if (index > -1) {
        data.splice(index, 1);
      }
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
        myFavGG: payload
      };
    },
  },
};
