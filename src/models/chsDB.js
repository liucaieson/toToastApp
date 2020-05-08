// 保存比赛投注项信息，用来更新赔率
export default {
  namespace: 'chsDB',

  state: {
    chsDB: {
    },
  },

  effects: {
    *saveChsData({ payload }, { put }) {
      yield put({
        type: 'save',
        payload,
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
