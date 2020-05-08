// 根据id选择左侧的tab页面
export default {
  namespace: 'toggleMainLeftTabs',

  state: {
   mainLeftId: 1
  },

  effects: {
    *toggleMainLeftTabs({ payload }, { put }) {
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
        mainLeftId: payload
      };
    },
  }

};
