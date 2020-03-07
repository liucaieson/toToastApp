// 保存比赛信息
export default {
  namespace: 'chsDB',

  state: {
    chsDB: {
    },
  },

  effects: {
    *saveChsData({payload}, { call, put, select }) {
      yield put({
        type: 'save',
        payload: payload,
      });
    },

  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        chsDB: payload,
      };
    },
  },

};
