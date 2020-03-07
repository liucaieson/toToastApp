/* 根据gg选择页面 */
export default {
  namespace: 'toggleMainLeftTabs',

  state: {
   mainLeftId: 1
  },

  effects: {
    *toggleMainLeftTabs({payload}, { call, put, select }) {
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
        mainLeftId: payload
      };
    },
  }

};
