/* 展示联赛modal是否显示 */
export default {
  namespace: 'showCompetitions',

  state: {
    isShow : false
  },

  effects: {
    *toggle({payload}, { call, put }) {
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
        isShow: payload,
      };
    },
  },
};
